import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor( private http:HttpClient ) { } //Recordar importar el HttpClientModule en el app.module para utilizarlo en toda la app.


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

  searchCapital( term:string ): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/capital/${ term }`)
      .pipe(
        catchError( error => {
          console.log(error)
          return of([]) //Si no se arrojan resultados en la busqueda, manda un array vacio para que muetsre mensaje de que no hay resultados.
        } )
      ) //El pipe es un método poderoso y se ultiliza para utilizar map, tap, of, etc de RxJS.
  }

  searchCountry( term:string ): Observable<Country[]>{
    return this.http.get<Country[]>(`${ this.apiUrl }/name/${ term }`)
      .pipe(
        catchError( error => {
          console.log(error)
          return of([]);
        })
      )
  }

  searchRegion( term:string ): Observable<Country[]>{
    return this.http.get<Country[]>(`${ this.apiUrl }/region/${ term }`)
      .pipe(
        catchError( error => {
          console.log(error)
          return of([]);
        })
      )
  }
}
