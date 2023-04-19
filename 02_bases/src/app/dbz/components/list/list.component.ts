import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Output()
  public onDeleteId: EventEmitter<string> = new EventEmitter();

  @Input() //Con este decorador puedo mandar info del padre al componente hijo. Con esto, vamos a recibir 
  //del mundo exterior(padre) elementos para el listado. Voy al html(padre) y coloco con [] lo que deseo 
  //enviar. El listado lo tengo en el ts del main-page.
  public characterList: Character[] = [];

  //onDeleteId = Index value:number

  deleteCharacterById(id?:string):void{
    if(!id) return;

    this.onDeleteId.emit(id); //Emite el indice del elemento.
  }

}
