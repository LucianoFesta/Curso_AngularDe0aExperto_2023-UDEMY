import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favouriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavourite: FormControl = new FormControl('', Validators.required); //Formulario para agregar al input (componente reactivo);

  constructor( 
    private fb:FormBuilder,
    private validatorsService: ValidatorsService
  ){}


  get favouriteGames() {
    return this.myForm.get('favouriteGames') as FormArray;
  }


  isValidField( field:string ):boolean | null {

    return this.validatorsService.isValidField(this.myForm,field); //Devuelve true si existen errores y el campo ha sido tocado.
  }


  getFieldError( field:string ):string | null{

    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {}; //Si o si va a devolver un objeto (que necesito recorrer) ya sea con contenido o vacio.

    for (const key of Object.keys(errors)) {  
      
      switch ( key ) {
        case 'required':
          return 'El campo nombre es requerido.';
        
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;
      }
    }
    return null;
  }


  isValidFieldArray( formArray:FormArray, i:number ):boolean | null {  //al ser un array verifico de dicha manera.

    return formArray.controls[i].errors && formArray.controls[i].touched;
  }


  onDeleteFavourite( i: number ):void {

    this.favouriteGames.removeAt(i);
  }


  onAddToFavourite():void {
    if( this.newFavourite.invalid ) return;

    const newGame = this.newFavourite.value;

    //this.favouriteGames.push( new FormControl( newGame, Validators.required ) ); //Esto es si no trabajamos con el builder.
    
    this.favouriteGames.push(
      this.fb.control( newGame, Validators.required )
    );
    this.newFavourite.reset();

  }


  onSubmit():void {
    
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favouriteGames'] as FormArray) = this.fb.array([]); //Creo un array vacio luego de hacer un submit
    this.myForm.reset();
  }

  
}
