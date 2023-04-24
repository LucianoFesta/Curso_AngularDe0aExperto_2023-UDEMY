import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  @Input()
  public placeholder:string = '';

  @Output() //Genero una clase que emite un evento personalizado.
  public onValue = new EventEmitter<string>();

  emitValue( value:string ):void { //El evento personalizado emite el valor que ingreso en el input.
    this.onValue.emit( value );
  }

}
