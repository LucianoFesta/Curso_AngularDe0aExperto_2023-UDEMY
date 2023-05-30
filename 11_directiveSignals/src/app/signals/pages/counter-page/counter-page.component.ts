import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {

  public counter = signal(10); //Inicializamos la señal --> es igual que igualarlo a 10;

  public squareCounter = computed( () => this.counter() * this.counter() );
  //Siempre esta pendiente de la señal counter. Si cambia el counter computa y actualiza la misma.

  increaseBy( value:number ){
    this.counter.update( current => current + value ); //Current es el valor actual.
  }

}
