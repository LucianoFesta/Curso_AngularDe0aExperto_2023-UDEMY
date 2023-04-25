import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>; //debouncer es: caundo el usuario deja de escribir, espera un tiempo y ejecuta la buscqueda. Subject es un tipo de observable (como crear un observable manualmente y aprovechar el poder utilizar sus metodos).

  private debouncerSuscription?: Subscription; //Creo como opcional porque en un punto del tiempo no tengo una suscripcion (cuando se monta el componente). Para igualar cuando me suscribo con un oninit.

  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue:string = '';

  @Output() //Genero una clase que emite un evento personalizado.
  public onValue = new EventEmitter<string>();

  @Output() //Genero una clase que emite un evento personalizado.
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000) //Con esto recibo un valor en la busqueda, espera 1 segundo! si no se ingresan mas valores, sigue y hace el console.log. si alguien ingresa algo antes se reinicia el conteo.
    )
    .subscribe(value => this.onDebounce.emit( value ) );
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
    //console.log('Destruido'); //Parte de ciclo de vida de los componentes. Destruye y limpia las suscripciones. Cuando salgo de la pagina en donde esta el suscribe, rompe esa suscripcion y corta el ciclo de vida del componente. Siempre que tengamos un SUSCRIPCION EN UN ONINIT se hace esto.

    //En los métodos HTTP que consulta a apis, no es necesario ya que lo hace automaticamente cuando ya recibimos un valor.
  }

  emitValue( value:string ):void { //El evento personalizado emite el valor que ingreso en el input.
    this.onValue.emit( value );
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm); 
  }

}
