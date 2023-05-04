import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero; //cuando el componente se monta en un determinado momento del tiempo no tenemos ningun heroe, por eso esta como opcional.

  constructor( 
    private heroService: HeroesService ,
    private activatedRoute: ActivatedRoute, //necesito ver la url, y de esta manero tengo la ruta activa.
    private router: Router //
    ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params    //Accedo a los parametros de la url activa.
      .pipe(
        delay(2000),
        switchMap( ( {id} ) => this.heroService.getHeroById(id) )  //Con el switchMap desestructuro mis parametros tomando el id.
      )
      .subscribe( hero => {  //Al suscribirme a la peticion, si no me devuelve un heroe, saco al usuario de la pagina.
        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);

        //Si pasa el if, existe un heroe y hago:
        this.hero = hero;
        return;
      })
     
  }

  goBack():void {

    this.router.navigateByUrl('heroes/list');

  }

}
