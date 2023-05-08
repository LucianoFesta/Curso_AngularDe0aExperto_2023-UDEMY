import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard {

    constructor( 
        private authService: AuthService,
        private router: Router 
    ) { }

    private checkAuthStatus():boolean | Observable<boolean> {

        return this.authService.checkAutentication()
            .pipe(
                tap( isAuthenticated => {
                    if ( isAuthenticated ){
                        this.router.navigate(['/'])
                    }
                } ),
                map( isAuthenticated => !isAuthenticated )
            )

    }

    //Activa la ruta que hizo match
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{
        // console.log('Can Activdate');
        // console.log({route, state})
        return this.checkAuthStatus(); 
    }
    //POdemos entrar a una ruta que haga match con la url
    canMatch(route: Route, segments: UrlSegment[]): boolean| Observable<boolean> {
        // console.log('Can Match');
        // console.log({route, segments})
        return this.checkAuthStatus(); //El true hace que deje ingresar a la ruta, el false no(protege la ruta).
    }
    
}