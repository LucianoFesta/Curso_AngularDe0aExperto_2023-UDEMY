import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseURL:string = environments.baseURL;

    constructor(private http: HttpClient) { }

    getHeroes():Observable<Hero[]> {

        return this.http.get<Hero[]>(`${this.baseURL}/heroes`);

    }

    getHeroById( id:string ): Observable<Hero | undefined> {

        return this.http.get<Hero>(`${ this.baseURL }/heroes/${ id }`)
            .pipe(
                catchError( error => of(undefined) ) //El of es una forma de crear un observable en base al valor que especifico entre los parentesis. En este caso, no devuelve un heroe va a devolver el undefined. Ahora vamos al page(home-page) donde necesito utilizarlo.
            )

    }

    getSuggestions( query:string ): Observable<Hero[]> {

        return this.http.get<Hero[]>(`${this.baseURL}/heroes?q=${query}&_limit=6`); //Retornar heroes que tengan en su id la query que ingreso en la url. Se utiliza en search-page,

    }

    //CRUD

    addHero( hero:Hero ): Observable<Hero> {

        return this.http.post<Hero>(`${this.baseURL}/heroes`, hero);  //Endpoint al que quiere llegar y que datos (hero) agrego en la db.

    }

    updateHero( hero:Hero ): Observable<Hero> {

        if( !hero.id ) throw Error('Hero id is required');
        return this.http.patch<Hero>(`${this.baseURL}/heroes/${hero.id}`, hero);

    }

    deleteHeroById( id:string ): Observable<boolean> {

        return this.http.delete(`${ this.baseURL }/heroes/${ id }`)    
            .pipe(
                map( resp => true ), //Si no lo atrapa el catch, quiere decir que habia algo por lo que retorna un true.
                catchError( err => of(false) ) //Con pipe personalizo la rta y si me devuelve un 404 retorna un false.
            );
    }
    
}
