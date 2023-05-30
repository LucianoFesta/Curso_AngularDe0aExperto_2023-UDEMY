import { Component, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-interface.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    email:"george.bluth@reqres.in",
    first_name:"George",
    last_name: "Bluth"
  });

  //El efecto hace que se ejecute esto cuando la señal interna cambie.
  public userChangedEffect = effect( () => {

    console.log( `${this.user().first_name} - ${this.counter()}` ); 
  } )

  increaseBy( value:number ){
    this.counter.update( current => current + 1 );
  }

  onFieldUpdated( field:string, value:string ){

    // this.user.update( current => {
    //   return {
    //     ...current,
    //     [field] : value
    //   };
    // } )

    this.user.mutate( current => {

      switch( field ){
        case 'email':
          current.email = value;
          break;
        
        case 'firstName':
          current.first_name = value;
          break;

        case 'lastName':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number(value);
      }

    });
    
  }

}
