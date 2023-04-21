import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded:boolean = false;

  ngOnInit(): void {
    if( !this.url ) throw new Error('La URL de la imagen es necesaria.');
  }

  onLoad():void{
    setTimeout(() => { //Tiempo de demora para ejecutar la funcion, asi queda el loader 0.5seg antes de cargar la img.
      this.hasLoaded = true;
    }, 500);
  }

}
