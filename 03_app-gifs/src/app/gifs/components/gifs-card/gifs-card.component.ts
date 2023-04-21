import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})

//OnInit es un método de Angular, se ejecuta cuando el componente se esta inicializando.
export class GifsCardComponent implements OnInit{

  @Input()
  public gif!: Gif; //Signo de admiracion: siempre lo vas a recibir, no te va a dar vacio.

  ngOnInit(): void {
    if( !this.gif ) throw new Error('La propiedad Gif es requerida.');
  }

}
