import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public myForm:FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  //Tambien podemos crear un formulario con FORMBUILDER
  constructor( private fb:FormBuilder ){}

  ngOnInit(): void {
    //this.myForm.reset({ name: 'Camiseta Umbro', price: 25000, inStorage: 10 })
  }
  
  public myForm:FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    price:[0, [Validators.required, Validators.min(0)]],
    inStorage:[0, [Validators.required, Validators.min(0)]]
  }); //Una vez realizado, enlazo con el form del html.

  
  isValidField( field:string ):boolean | null {

    return this.myForm.controls[field].errors && this.myForm.controls[field].touched; //Devuelve true si existen errores y el campo ha sido tocado.
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

  onSave():void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched(); //Marco todos los campos como tocados para que me salten las validaciones.
      return; //Si no cumple con las validaciones no hace el submit.
    } 

    console.log(this.myForm.value);

    this.myForm.reset({ price: 0, inStorage: 0 }); //Una vez que envia el form, se resetea.
  }

}
