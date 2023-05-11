import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required], //valor por defecto, validaciones.
    termsAndConditions: [false, Validators.requiredTrue] //Se requiere que sea siempre true.
  });

  public person = {
    gender: 'M',
    wantNotifications: false
  }

  constructor( 
    private fb: FormBuilder,
    private validatorsService: ValidatorsService 
  ){}

  isValidField( field:string ):boolean | null {
    return this.validatorsService.isValidField(this.myForm,field); //Devuelve true si existen errores y el campo ha sido tocado.
  }

  onSubmit():void {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    const { termsAndConditions, ...newPerson } = this.myForm.value;  //Desestructuro para obtener las propiedades menos el termAndConditions
    this.person = newPerson;
    console.log(this.person);

    this.myForm.reset({ gender: 'M', wantNotifications: true, termsAndConditions: false });
  }

}
