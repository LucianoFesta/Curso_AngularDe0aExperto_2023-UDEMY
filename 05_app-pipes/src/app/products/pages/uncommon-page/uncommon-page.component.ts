import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.css']
})
export class UncommonPageComponent {

  //i18n Select
  public name:string = 'Luciano';
  public gender: 'male'|'female' = 'male';
  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  }

  changeClient():void {
    this.name = 'Sofia';
    this.gender = 'female';
  }

  //i18n Plural
  public clients:string[] = ['Hugo','Lucas','Marcela','Luciano','Sofia','Shraon'];
  public clientsMap = {
    '=0': 'No tenemos ningún cliente esperando.',
    '=1': 'Tenemos 1 cliente esperando.',
    '=2': 'Tenemos 2 esperando.',
    'other': 'tenemos # clientes esperando'
  }

  deleteClient():void {
    this.clients.shift();
  }

  //keyValue Pipe
  public person = {
    name: 'Hugo',
    lastname: 'Festa',
    nationality: 'Argentino',
    age: 50
  }

  //Async Pipe
  //Observable
  public myObservableTimer: Observable<number> = interval(2000).pipe( //Es una manera de crear Observable que empiezan a emitir valores desde 0,1,2,3 basado en el tiempo a definir.
    tap( value => console.log('tap', value) ) //Con pipe, tap hasta que nadie se suscriba, podemos ver el valor. Con async nos suscribimos y podemos ver que va sumando. cuando salgo de la pag se destruye automaticamente y al volver inicia nuevamente.
  );
}
