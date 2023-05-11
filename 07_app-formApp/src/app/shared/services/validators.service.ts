//La idea es centralizar toda la funcinalidad de las validaciones personalizadas.
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
    
    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'; //Expresion reg para nombre y apellido en 2 palabras
    public mailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; //Expression regular para email.
    
    public cantBeStrider = ( control: FormControl ):ValidationErrors | null => {  //Vamos a validar que el username no este ya ingresado por otro usuario. En caso de no estarlo, retorna true sino null.

        const value:string = control.value.trim().toLowerCase(); //Obtengo el valor del imput, trim limpia espacioas adelante y atras.
    
        if( value === 'strider' ){
            return {
                noStrider: true
            }
        }
        return null;
    }

    public isValidField( form:FormGroup, field:string ):boolean | null {
        
        return form.controls[field].errors && form.controls[field].touched; //Devuelve true si existen errores y el campo ha sido tocado.
    }

    
    //validar que las constraseñas sean iguales. Es una funcionq ue retorna una funcion que me permite tener el control del form.
    public isFieldOneEqualsFielTwo(field1:string, field2:string){

        return ( formGroup:AbstractControl ):ValidationErrors|null => {

            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if( fieldValue1 !== fieldValue2 ) {
                formGroup.get(field2)?.setErrors({ notEquals: true });
                return { notEquals: true }
            }

            formGroup.get(field2)?.setErrors(null);
            return null;

        }

    }
}