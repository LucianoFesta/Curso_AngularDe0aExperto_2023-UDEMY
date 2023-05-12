import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'products-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy{
  
  @Input()
  public price:number = 0;
  public interval$?: Subscription; //Cuando manejamos observables se utiliza como estandar el $ al dinal del nombre de la prop.


  ngOnInit(): void {
    console.log('PriceComponent: ngOnInit');

    this.interval$ = interval(1000).subscribe( value => console.log(`Tick: ${value}`)); //Es un observable que emite valores de manera secuencial en un periodo de tiempo.
    
  }

  //El OnChanges se ejecuta antes el OnInit para que podamos utilizar los cambios de los componentes en el OnInit. SIEMPRE implementando @Imput, sino no se ve.
  //Es util porque el change me muestra el valor anterior al cambio, el valor actual y si es el primer valor que toma dicha variable o componente.
  ngOnChanges(changes: SimpleChanges): void {
    console.log('PriceComponent: ngOnChanges');
    console.log({changes});
    
    
  }
  ngOnDestroy(): void {
    console.log('PriceComponent: ngOnDestroy');
    this.interval$?.unsubscribe(); //Cuando el componente se destruye, destruye la suscripcion del mismo, de otra manera seguiria suscripto.
    
  }

}
