/*
    ===== Código de TypeScript =====
*/

function sumar(a: number, b: number) : number {  //Tamb puedo configurar el tipo de retorno
  return a + b;
}

const sumarFlecha = (a:number, b:number): number => {
    return a + b;
}


function multiplicar(numero: number, otroNumero?: number, base: number = 2): number{
    return numero * base;
}

//const resultado = multiplicar(5, 10);
//console.log(resultado);

interface PersonajeLOR{
    nombre: string;
    pv: number;
    mostrarHp: () => void; //va a tener una funcion que devuelve void(nada)
}


function curar(personaje: PersonajeLOR, curarX: number): void{
    
    personaje.pv += curarX;
}

const nuevoPersonaje: PersonajeLOR = {
    nombre: 'Luchito',
    pv: 150,
    mostrarHp(){
        console.log('Los puntos de vida son:', this.pv)
    }
}

curar(nuevoPersonaje, 100);
nuevoPersonaje.mostrarHp();
