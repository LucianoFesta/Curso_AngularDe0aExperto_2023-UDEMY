import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-personaje',
  templateUrl: './add-personaje.component.html',
  styleUrls: ['./add-personaje.component.css']
})
export class AddPersonajeComponent {

  //Si nosotros cambiamos algun caracter de aca, se deberia modificar en el html y si lo modificamos en el html se cambiaria aca.
  //Para ellos tenemos que usar la directiva ngModel en el form. Para ello importamos en el modulo en donde estamos utilizando el formsModule.

  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter(); //Objeto que emite, crear un producto del hijo al padre.

  public character: Character = {
    name: '',
    power: 0
  };


  emitCharacter(){
    console.log(this.character);

    if( this.character.name.length === 0 ) return; //Si no viene nombre no acepto.

    this.onNewCharacter.emit(this.character); //En caso que tenga nombre, el onNewCharacter emite al Character. Hecho esto voy al padre(main-page.html).
    
    this.character = { name: '', power: 0 };
  }

}
