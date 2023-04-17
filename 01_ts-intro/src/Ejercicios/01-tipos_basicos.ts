/*
    ===== Código de TypeScript =====
*/

let nombre: string = 'Lucho';  //De esta manera hacemos de mi variable con un tipificado fuerte. Solamente puede ser string.
const apellido = 'Festa'; //Al ser const no puede cambiar el dato, por que al posicionar el cursor me dice que solo va a ser tipo Festa.
let numero: number | string = 95; //De esta manera indico que puede ser de ambos tipos.
let vivo: boolean = true;

console.log( nombre, numero );