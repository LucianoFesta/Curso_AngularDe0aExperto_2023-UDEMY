//Un pipe personalizado lo utilizamos para hacer un amodificacion visual que querramos.
//En este caso (toggleCase es para pasar de mayus a min o de min a mayus segun como lo enien)

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toggleCase' //El nombre que vamos a utilizar para llamarlo: {{ nombre | toggleCase }}
})

export class ToggleCasePipe implements PipeTransform {

    transform(value: string, toUpper: boolean=false):string {    //transform(value: string, ...args:any[]):string. El value es el tipo de dato que vamos a recibir. El ...args indica que recibe los argumentos que le estoy mandando (toggleCase:true).

        return (toUpper) ? value.toUpperCase() : value.toLowerCase(); //Por defecto esta en false, pero si es verdadero lo pone en mayus si esta en falso en minus.
    }

}

//Una vez definido, tengo que declararlo en un modulo. En este caso productModule.