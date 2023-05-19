import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {
  
  @ViewChild('map') divMap?: ElementRef; //Me va a permitir hacer referencia y tomar un elemento html. Es de tipo ElementRef y al momento de inicializar la app no existe, por eso se le pone el ?.


  //Despues de que la vista se inicializa, es decir, estan las referencias html ejecuta:
  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento HTML no fue encontrado'; //En caso que no tengamos el divMap, arroja el throw.
    
    //sacado de mapbox
    const map = new Map({
      container: this.divMap?.nativeElement, //El map lo va a ingresar en el elemento html que hacemos referencia con el viewchild.
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      });

  }

}
