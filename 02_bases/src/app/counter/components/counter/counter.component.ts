//Con el snippet Angular Snippets (Version 13) puedo crear un template de componente con a-component.

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-counter',
    template: `<p>BIenvenidos a Angular. {{ numero }}</p>

    <button (click)="increaseBy(1)" >+1</button>
    <button (click)="reset()" >Reset</button>
    <button (click)="decreaseBy(1)" >-1</button>`
})


//Definido el componente, lo debemos agregar en un Módulo, lo agregamos en app.module.ts
export class CounterComponent implements OnInit {
    constructor() { }

    public numero: number = 10;

    increaseBy( value: number ): void{
      this.numero += value;
    }
  
    decreaseBy( value: number): void{
      this.numero -= value;
    }
  
    reset(): void{
      this.numero = 10;
    }

    ngOnInit() { }
}
