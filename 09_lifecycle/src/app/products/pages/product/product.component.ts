import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'products-product-page',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  
  public isProductVisible:boolean = false;
  public currentPrice:number = 10;

  constructor(){
    console.log('constructor');
    
  }
  
  ngOnInit(): void {
    console.log('ngOnInit');
    
  }

  //Se presenta cuando hay algún cambio en alguna propiedad de un componente hijo (@Input - comunicacion entre padre e hijo).
  //Si necesitamos estar pendientes de cambios los utilizamos. Lanzar errores, ciertas acciones si en un input hay un valor puntual, etc.
  ngOnChanges(changes: SimpleChanges): void {
    console.log({changes});
    
    console.log('ngOnChanges');
    
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
    
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
    
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
    
  }
  
  //Despues de hacer algo, limpiamos cuando en el oninit implementamos algun listener, observable, timer o proceso que se ejecuta a lo largo de todo el timepo qu eun componente este en pantalla.
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    
  }

  increasePrice() {
    this.currentPrice++;
  }

}
