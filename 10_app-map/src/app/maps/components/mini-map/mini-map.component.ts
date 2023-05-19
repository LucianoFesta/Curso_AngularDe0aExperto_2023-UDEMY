import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?:[number,number];
  @ViewChild('map') divMap?: ElementRef; //Me va a permitir hacer referencia y tomar un elemento html. Es de tipo ElementRef y al momento de inicializar la app no existe, por eso se le pone el ?.


  //Despues de que la vista se inicializa, es decir, estan las referencias html ejecuta:
  ngAfterViewInit(): void {

    if( !this.divMap?.nativeElement ) throw 'Map Div noy found'; //En caso que no tengamos el divMap, arroja el throw.
    if( !this.lngLat ) throw "LngLat can't be null";

    //sacado de mapbox
    const map = new Map({
      container: this.divMap?.nativeElement, //El map lo va a ingresar en el elemento html que hacemos referencia con el viewchild.
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false  
    });

      new Marker()
        .setLngLat(this.lngLat)
        .addTo( map )
  }

}
