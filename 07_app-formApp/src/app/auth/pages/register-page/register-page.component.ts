import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators.functions';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.mailPattern) ], [ this.emailValidators ]],
    username: ['', [ Validators.required, this.validatorsService.cantBeStrider ]], //pasamos la referencia de la funcion de validators personales para que angular sea quien la llame.
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  }, {
    validators: [ //al agregar validators como segundo objeto fuera del formGroup, tengo acceso a todos los formcontrol. Si lo haria en cada campo, solo tengo acceso a uno solo (como esta echo el de email por ej.).
      this.validatorsService.isFieldOneEqualsFielTwo('password','password2')
    ]
  });

  constructor( 
    private fb:FormBuilder,
    private validatorsService:ValidatorsService,
    private emailValidators: EmailValidatorService 
  ){}

  isValidField( field:string ){
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
