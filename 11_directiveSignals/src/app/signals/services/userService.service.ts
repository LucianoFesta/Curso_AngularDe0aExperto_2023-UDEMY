import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../interfaces/user-interface.interface';
import { SingleUserResponse } from '../interfaces/user-interface.interface';

@Injectable({providedIn: 'root'})
export class UserServiceService {
     
    private http = inject( HttpClient );
    private baseUrl:string = 'https://reqres.in/api/users';

    getUserById( id:number ):Observable<User>{
        return this.http.get<SingleUserResponse>(`${this.baseUrl}/${id}`)
            .pipe(
                map( res => res.data ),
                tap( console.log )
            )
    }
    
}