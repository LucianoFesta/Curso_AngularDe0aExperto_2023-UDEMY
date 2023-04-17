/*
    ===== Código de TypeScript =====
*/

class PersonaNormal {
    
    constructor(
        public nombre: string,
        public direccion: string
    ){}
}

class Heroe extends PersonaNormal{

    constructor(                    //Con typescript puedo definir los atributos directamente en el constructor.
        public alterEgo: string, 
        public edad: number, 
        public nombreReal: string
    ) {
        super(nombreReal, 'Marconi 843 - Morteros(Cba)');
    }

}

const ironman = new Heroe('Ironman', 30, 'LuchoFesta'); //Una instancia de una clase lo que hace es llamar a la funcion contructor de dicha clase.

console.log(ironman);

