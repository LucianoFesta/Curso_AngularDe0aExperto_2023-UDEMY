import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable:true }), //Por defecto admite un string | null. Entonces si necesito numero inicializo con 0 en lugar de ''.
    publisher: new FormControl<Publisher>(Publisher.DCComics || Publisher.MarvelComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  }); //Formulario REACTIVO. POdemos validar cada capo, y si todos son correctos el formulario esta correcto.

  public publishers = [
    {
      id: 'DC Comics', desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics', desc: 'Marvel - Comics'
    }
  ]

  constructor( 
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){}
  
  ngOnInit(): void {
    
    if( !this.router.url.includes('edit') ) return; //Al cargar la página, si en el url no esta la palabra edit, que no haga nada.

    //si esta la palabra edit, debo cargar la data en el formulario.
    this.activatedRoute.params.pipe( 
      switchMap( ({ id }) => this.heroesService.getHeroById(id) )
    ).subscribe( hero => {

      if( !hero ) return this.router.navigateByUrl('/'); //Si el heroe no existe, redirijo a '/'.

      this.heroForm.reset(hero); //Toma el hero de la db y los valores que coinciden con el name del form, los coloca.
      return;
    } )

  }

  //con este getter obtenemos los valores del form y lo pasamos a la vista para mostrar la img por ejemplo. Ademas lo utilizaremos en el update, ya que tomamos con Hero al form.
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  onSubmit():void {

    if( this.heroForm.invalid ) return;

    if( this.currentHero.id ) {                        //Si ya tengo un id, solo quiero editar.
      this.heroesService.updateHero(this.currentHero)
        .subscribe( hero => {
          this.showSnackbar( `${hero.superhero} updated!` );
        } );
        return;
    }

    this.heroesService.addHero(this.currentHero)       //Si no tengo un id, quiero crear uno nuevo.
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar( `${hero.superhero} created!` );
      } )
  }

  onDeleteHero() {

    if( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result:boolean) => result ),  //Filtra el resultado, si se cumple la condicion(true) sigue sino no.
        switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id) ), //Si pasa, elimino y sigo.
        filter( (wasDeleted:boolean) => wasDeleted ) //Nos aseguramos que se haya eliminado y ahi me suscribo para redirigir al usuario.
      )
      .subscribe( () => {
        this.router.navigateByUrl('/');
    })
  }

  
  showSnackbar(message:string):void {                       //Mesaje de confirmacion.
    this.snackBar.open(message, 'done', { duration: 2500 })
  }
}
