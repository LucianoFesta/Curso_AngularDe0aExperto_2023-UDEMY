import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" class="form-control" placeholder="Buscar Gifs..." #textTagInput
      (keyup.enter)="searchTag()"
    >
  `
})
export class SearchBoxComponent {

  constructor( private gifsService: GifsService ){} //Inyecto el service para agregar el tag al array hisorial. 

  @ViewChild('textTagInput') //Decorador que necesita referencia del elemento html al que escucha.
  public tagInput!: ElementRef<HTMLInputElement>; //Indicamos con ElementRef el elemento html al que tiene que escuchar, es un input(HTMLInputElement).


  //searchTag( newTag:string ){ console.log({newTag}); }
    //(keyup.enter)="searchTag( textTagInput.value ) --> atributo en el input del evento.
    //Si vemos, en el html agregamos una referencia (txtTagInput) y capturamos el evento ketup.enter(solo cuando presiona enter) para que ejecute nuestra funcion. SE PUEDE HACER ASI O CON decorador @ViewChild.

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag); //Cuando alguien busca en el navegador, lo almaceno en el servicio.

    this.tagInput.nativeElement.value = ''; //Una vez que lo almaceno, quiero limpiar el newTag.

  }
    
  

}
