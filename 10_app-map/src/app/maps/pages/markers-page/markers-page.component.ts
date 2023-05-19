import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkersAndColor {
  color:string;
  marker: Marker
}

interface PlainMarker {
  color:string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef; //Me va a permitir hacer referencia y tomar un elemento html. Es de tipo ElementRef y al momento de inicializar la app no existe, por eso se le pone el ?.
  
  public markers:MarkersAndColor[] = [];

  public zoom:number = 14;
  public map?:Map;
  public currentCenter:LngLat = new LngLat(-62.00003658920575, -30.718504023167426);
  
  ngAfterViewInit(): void {
    
    if( !this.divMap ) throw 'El elemento HTML no fue encontrado'; //En caso que no tengamos el divMap, arroja el throw.
    
    //sacado de mapbox
    this.map = new Map({
      container: this.divMap?.nativeElement, //El map lo va a ingresar en el elemento html que hacemos referencia con el viewchild.
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    // //Podemos crear elementos HTML para nuestro marker o pin.
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Lucho Festa';

    // //Creacion de un marker.
    // const marker = new Marker({
    //   color: 'red'
    //   // element: markerHtml -> utilizacion de nuestro elemento creado personalizado.
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);  

    this.readFromLocalStorage();
  }

  createMarket(){

    if( !this.map ) return;

    const color  = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16)); //Color aleatorio
    const lgnlat = this.map?.getCenter();

    this.addMarker(lgnlat,color);
  }
  
  addMarker( lnglat:LngLat, color:string ){
    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true //Se puede mover el marcador.
    })
      .setLngLat( lnglat )
      .addTo( this.map );

      this.markers.push({
        color: color,
        marker: marker
      });

      this.saveToLocalStorage();

      marker.on('dragend', () => {  //con 'dragend' sabemos las coordenadas nuevas del marcador cuando lo movemos, lo utilizamos para actualizar el localstorage.
        this.saveToLocalStorage()
      })
  }

  deleteMarker(i:number){

    this.markers[i].marker.remove(); //Elimino el marker del mapa.
    this.markers.splice(i,1); //elimino el marker del array.
  }

  flyTo( marker:Marker ){

    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    //De cada elemento de marker(map) reotrno el color y el lngLat como un array.
    const plainMarkers: PlainMarker[] = this.markers.map(({color,marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'; //Si no hay nada en el localstorage, devuelve un array vacio.

    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat)

      this.addMarker(coords, color); //creamos los markers con los datos del localstorage.

    } )
  }

}
