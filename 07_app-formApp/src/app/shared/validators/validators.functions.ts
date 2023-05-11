//Centralizamos todas las validaciones de los diferentes forms.

import { FormControl, ValidationErrors } from "@angular/forms";

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)'; //Expresion reg para nombre y apellido en 2 palabras
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"; //Expression regular para email.


export const cantBeStrider = ( control: FormControl ):ValidationErrors | null => {  //Vamos a validar que el username no este ya ingresado por otro usuario. En caso de no estarlo, retorna true sino null.

    const value:string = control.value.trim().toLowerCase(); //Obtengo el valor del imput, trim limpia espacioas adelante y atras.

    if( value === 'strider' ){
        return {
            noStrider: true
        }
    }
    return null;
}