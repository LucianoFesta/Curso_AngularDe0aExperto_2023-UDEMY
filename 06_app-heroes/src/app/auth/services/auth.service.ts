import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, tap, map, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseURL;
    private user?: User;  //Usuario que se encuentra logueado. Como cuando se carga la app no ahy logueados, en algun momento es nulo.

    constructor( private http: HttpClient ) { }

    get currentUser():User | undefined { //Creo un get para exponer este usuario y los componentes los puedan usar(ya que esta definido como private para que las modificiaciones se puedan hacer solo desde el service)
        if( !this.user ) return undefined;
        return structuredClone(this.user); //Equivale a poner {...this.user} -> como es un objeto que no tiene ni propiedades ni metodos lo retornamos como una copia del objeto de dicha manera. StructuredClone crea una copia profunda desde la version 17 de node.
    }

    login( email:string, password:string ):Observable<User> {

        return this.http.get<User>(`${this.baseUrl}/users/1`)
                .pipe(
                    tap( user => this.user = user ),
                    tap( user => localStorage.setItem('token', 'jusbcibwdicwec.wecbewcbwncw.wcewc') )
                );
    }

    checkAutentication(): Observable<boolean> {

        if( !localStorage.getItem('token') ) return of(false);

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user),
                map(user => !!user), //negacion de negacion => devuelve true.
                catchError(err => of(false)) //Devuelvo un observable de un booleano.
            );

    }


    logout():void {

        this.user = undefined;
        localStorage.clear();

    }
}