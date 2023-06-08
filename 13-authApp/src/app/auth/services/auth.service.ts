import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CheckTokenResponse } from '../interfaces/check-token.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Aseguramos que nadie la ba a cambiar aun utilizando el service.
  private readonly baseUrl:string = environment.baseUrl;
  private http = inject( HttpClient ); //inyección del http para los pedidos.

  //Manejamos nuestros usuarios como SEÑALES
  private _currentUser = signal<User | null>(null); //Paréntesis es el valor por defecto.
  //Estado de la autenticación. Si estoy autenticado no puede entrar al login por ej, Utilizar LocalStorage, eyc.
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //No quiero que nadie modifique mis valores user y authstatus pero si quiero llevarlo fuera del service:
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  
  constructor() { 
    this.checkAuthStatus().subscribe(); 
  }

  private setAuthentication( user:User, token:string ):boolean{
    this._currentUser.set(user);
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }

  login(email:string, password:string):Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body ).pipe(
      map(({ user, token }) => this.setAuthentication( user,token ) ),
      catchError( error =>  throwError( () => error.error.message )),
    );
    
  };

  checkAuthStatus():Observable<boolean>{

    const url = `${this.baseUrl}/auth/ckeck-token`;
    const token = localStorage.getItem('token');
    console.log(token);
    

    if( !token ) return of(false);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(( { token, user } ) => this.setAuthentication( user, token )),
        tap( () => console.log('pasaste')
         ),
        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        } )
      );

  }

}
