import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '13-authApp';

  private authService = inject( AuthService );
  private router = inject( Router );

  //Verifica si ya esta autenticado o no. En caso de no estarlo retorna un false
  public finishedAuthCheck = computed( () => {
    if( this.authService.authStatus() === AuthStatus.checking ){
      return false;
    }
    return true;
  });

  //se dispara cuando alguna señal en el efecto cambia. Esto se va a cargar por primera vez al montar el service indicando checking hasta que detecte un cambio y saca el cambio -> llamado en el constructor del service, si no esta autenticado cambia el valor y lo vuelve a mostrar actualziado.
  public authStatusChangeEffect = effect( () => {

    switch( this.authService.authStatus() ){

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }

  })

}
