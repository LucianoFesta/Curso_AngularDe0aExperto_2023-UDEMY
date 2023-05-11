
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator{

    //Pone el status del form en estado pending hasta que la validacion asincrona devuelva la rta.
    // validate(control: AbstractControl): Observable<ValidationErrors | null> {
       
    //     const email = control.value;
    //     console.log({email})

    //     return of( {
    //         emailToken: true
    //     } ).pipe(delay(2000))  
    // }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
       
        const email = control.value;
        
        const httpCallObservable = new Observable<ValidationErrors|null>( subscriber => {

            console.log({ email });

            if( email === 'fernandoherrera@gmail.com' ) {
                subscriber.next({ emailTaken: true });
                subscriber.complete(); // Finaliza la suscripcion. Como un return.
                //return;
            }

            subscriber.next(null);
            subscriber.complete();
        } ).pipe(delay(3000)); //Deja el estado del form pendiente por 3 segundo y luego ve si es valido o no el form.

        return httpCallObservable;
    }

}