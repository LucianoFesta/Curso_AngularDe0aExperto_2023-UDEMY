/*
    ===== Código de TypeScript =====
*/

//Decoradores, es una caracteristicas propias de ts.
//sirven para cambiar las clases en el momento de definirlas.

function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        newProperty = 'new property';
        hello = 'override';
    };
}

@classDecorator //Sirven para añadir funcionalidades.
class MiSuperClase{
    public miPropiedad: string = 'asas342';

    imprimir(){
        console.log('Hola Mundo');
    }
}

console.log(MiSuperClase);

const miClase = new MiSuperClase();
console.log(miClase.miPropiedad);




