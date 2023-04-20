import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root' //Hace que todos los componentes tengan inyectado el service y puedan acceder a el.
})
export class GifsService {

  public gifList: Gif[] = []; //lista de los gif traidos por la api.
  
  //Si privado ya que si alguien hace una modificacion en algún componente en ese _tagsHistory modifica el array y Angular puede no detectarlo correctamente, entonces no quiero que alguien mofifique de manera directa este array fuera del service.
  private _tagsHistory:string[] = [];
  private apiKey = 'nhYvWqmCfelkv27sXP2H6SZ38pBBWksf';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
      this.getLocalStorage();
   } //Importamos el http para utiñizar apis

  //Esto es para exponer el contenido de dicho array. Solo quiero que muestre pero no se edite fuera del servicio con el private.
  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    //si un tag que pasan ya existe, filtra la lista devolviendo los distintos solamente y despues lo agrego para que quede primero en el historial de búsqueda.
    tag = tag.toLowerCase();
    
    if( this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag); //Agrego el elementonuevamente.
    this._tagsHistory = this.tagsHistory.splice(0,10); //Limito a que solo guarde 10;
    this.saveLocalStorage(); //Guardo el history en mi localstorage, para no borrar las cosas al recargar pagina.
  }

  //Guardo en localstorage
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory)); //Siempre en localstorage se guardan string.
  }

  //Cargo el localstorage
  private getLocalStorage():void{
    if( !localStorage.getItem('history') ) return; //si esta vacio no hago nada
    
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!); //Lo agrego en el constructor para que se lea siempre.

    this.searchTag(this._tagsHistory[0]);

  }


  //Método para agregar tags al listado
  searchTag( tag:string ) : void {
    if( tag.length === 0 ) return;

    this.organizeHistory(tag); //Método privado.

    // fetch('http://api.giphy.com/v1/gifs/search?api_key=nhYvWqmCfelkv27sXP2H6SZ38pBBWksf&q=valorant&limit=10')
    //   .then( res => res.json())
    //   .then(data => console.log(data));


    //Parametros que tiene nuestra url a la api. el new HttpParamas viene en js no hay que importarlo.
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);
    
    //aqui hacemos la consulta a la api a travez del modulo http importado arriba. Hacemos un get a la api (esto en promesas seria un then, pero aqui es un OBSERVABLE(objeto que emitir valores a lo largo del tiempo). Lo que hacemos con ese observable es suscribirnos, es decir escuchar los valores que emite y dicha respuesta la manejo.
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`,{ params })
      .subscribe(resp => {
          this.gifList = resp.data;
          console.log({gif: this.gifList});
      });
      //SeacrhResponse es de las iterfaces que creamos con la respuesta de postamn en quicktype.io. De esta manera podremos acceder a toda la info de la respuesta de la api.


  }

}
