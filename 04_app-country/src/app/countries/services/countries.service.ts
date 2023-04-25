import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  //Persistir los datos de busqueda al pasar de pagina en pagina. Defino y almaceno los datos a travez de una interface.
  //para ello, en la consulta api, completo esta data.
  public cacheStore: CacheStore = {        
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {term: '', countries: []}
  }

  constructor( private http:HttpClient ) { 
    this.loadFromToLocalStorage(); //Cuando me inicializa el servicio, utilizo el localStorage. Al no ser un componente lo puedo hacer directamente en el constructor en lugar de OnInit.
  } //Recordar importar el HttpClientModule en el app.module para utilizarlo en toda la app.

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ))
  }

  private loadFromToLocalStorage(){
    if( !localStorage.getItem( 'cacheStore' ) ) return;
    
    this.cacheStore = JSON.parse(localStorage.getItem( 'cacheStore' )!)
    
  }


  searchCountryByAlphaCode( code:string ):Observable<Country | null>{
    return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${ code }`)
      .pipe(
        map( countries => countries.length > 0 ? countries[0]:null), //Como quiero que solo me devuelva un country y no un array, con el map hago que devuelva el countries[0].
        catchError( error => {
          console.log(error)
          return of(null); //lo que quiero que me devuelva si me da algun error.
        })
      )
  }

  private getCountriesReq(url:string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([])), //Si no se arrojan resultados en la busqueda, manda un array vacio para que muetsre mensaje de que no hay resultados.
        delay( 1000 ), //Hacemos que la carga demore 2 seg.
        ) //El pipe es un método poderoso y se ultiliza para utilizar map, tap, of, etc de RxJS.
  }

  searchCapital( term:string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesReq(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term: term, countries: countries} ),//Almaceno mi rta de la consulta a la api en mi atributo cacheStore.
        tap( () => this.saveToLocalStorage() ) //Una vez que hago la consulta, almaceno en el localstorage.
      )
  }

  searchCountry( term:string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesReq(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term,countries }),
        tap( () => this.saveToLocalStorage() )
      )
  }

  searchRegion( term:string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ term }`;
    return this.getCountriesReq(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { term, countries }),
        tap( () => this.saveToLocalStorage() )
      )
  }
}
