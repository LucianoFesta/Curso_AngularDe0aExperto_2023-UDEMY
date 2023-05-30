import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserServiceService } from '../../services/userService.service';
import { User } from '../../interfaces/user-interface.interface';

@Component({
  templateUrl: './userinfo-page.component.html',
  styleUrls: ['./userinfo-page.component.css']
})
export class UserinfoPageComponent implements OnInit{
  
  private userServices = inject( UserServiceService );
  public userId = signal(1);
  
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);

  //Propiedad computada, solo lectura.
  public fullName = computed<string>( () => {
    if( !this.currentUser ) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`; 
  } )
  
  //Cuando inicia el componente cargo el usuario con el método y le paso el valor de la señal (id);
  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  //El método se conecta con los botones del HTML, al darle siguiente o anterior llama al método cambiando el id y actualizando la señal que va a modificar en todos lados donde la estemos usando.
  loadUser( id:number ){
    if( id <= 0 ) return;

    this.userId.set(id); //Cuando no interesa el valor anterior del signal --> usamos SET.
    this.currentUser.set(undefined); //Una vez que avanzo o retrocedo de usuario se quita y no hace un efecto raro cuando pasamos de uno a otro.

    this.userServices.getUserById( id )  
      .subscribe({
        next: user => { //Next se utiliza para pasar a la siguiente emision al finalizar el suscribe.
          this.currentUser.set( user ); //Si todo sale bien, setea las señales.
          this.userWasFound.set( true );
        },
        error: () => {
          this.currentUser.set( undefined );
          this.userWasFound.set( false ); //Si sale mal, setea y pone false a la señal.
        }
      });
  }

}
