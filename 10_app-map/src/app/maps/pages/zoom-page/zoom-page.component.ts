import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {
  
  @ViewChild('map') divMap?: ElementRef; //Me va a permitir hacer referencia y tomar un elemento html. Es de tipo ElementRef y al momento de inicializar la app no existe, por eso se le pone el ?.
  
  public zoom:number = 10;
  public map?:Map;
  public currentCenter:LngLat = new LngLat(-62.105093144668785, -30.765126423482556);
  
  ngAfterViewInit(): void {
    
    if( !this.divMap ) throw 'El elemento HTML no fue encontrado'; //En caso que no tengamos el divMap, arroja el throw.
    
    //sacado de mapbox
    this.map = new Map({
      container: this.divMap?.nativeElement, //El map lo va a ingresar en el elemento html que hacemos referencia con el viewchild.
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();

  }

  ngOnDestroy(): void {
    
    this.map?.remove(); //No vamos a ver beneficios directos, pero esto hace que se borren/limpien todos los listener una vez que ya los utilizamos mejorando la performance.

  }

  //Para modificar el valor de zoom, creo unos listeners que van a estar escuchando (.on).
  //Estos los tenemosq ue destruir cuando el componente ya no va a funcionar.
  mapListeners(){
    if( !this.map ) throw 'Mapa no inicializado.';

    this.map.on('zoom', (event) => {  //Del map, vamos a estar escuchando la propiedad zoom. cuandop cambia genera un evento.
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (event) => {  //Del map, vamos a estar escuchando la propiedad zoomed.
      if( this.map!.getZoom() < 18 ) return; //si el valor del zoom es menor a 18 no hacemos nada.

      this.map!.zoomTo(18); //Cuando pasamos el zoo, automaticamente el zoom vuelve a 18.
    });

    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();  //Este listener, cuando se mueve el mapa obtiene la longitud y latitud central.
      const { lng, lat } = this.currentCenter;
      
    })
  }
  

  zoomIn():void {
    this.map?.zoomIn()
  }

  zoomOut():void {
    this.map?.zoomOut()
  }

  //metodo para que la barra funcione.
  zoomChanged( value:string ){
    this.zoom = Number(value);

    this.map?.zoomTo(this.zoom);
  }


}
