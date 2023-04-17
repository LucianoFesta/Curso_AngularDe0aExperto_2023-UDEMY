/*
    ===== Código de TypeScript =====
*/

let habilidades = ['Programación', 'Liquidación de Impuestos', 100]; //Si nos posicionamos con el cursor, veremos que ts infiere que el array puede tener string o numeros.
habilidades.push(1);
//habilidades.push(true);
habilidades.push('Mago');


//Con objetos podemos trabajar con interfaces, para indicar como queremos que un objeto luce.
interface Personaje {
    nombre: string;
    hp: number;
    habilidades: string[];
    puebloNatal?: string;  //Con el ? digo que dicho atributo es opcional.
}

const personaje: Personaje = {
    nombre: 'Lucho',
    hp: 100,
    habilidades: ['Programación', 'Liquidación de Impuestos']
};

personaje.puebloNatal = 'Pueblo Paleta';

console.table( personaje );
