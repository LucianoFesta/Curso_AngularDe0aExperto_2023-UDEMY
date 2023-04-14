/*
    ===== Código de TypeScript =====
*/

interface Reproductor{
    volumen: number;
    segundo: number;
    cancion: string;
    detalles: Detalles;
}

interface Detalles{
    autor: string;
    anio: number;
}

const reproductor: Reproductor = {
    volumen: 90,
    segundo: 36,
    cancion: 'Corazón Espinado',
    detalles: {
        anio: 1995,
        autor: 'Maná'
    }
}

const autor = 'felipe'; //Si tengo una variable ya con el nombre autor, al desestructurar el autor del detalle lo podemos hacer como abajo, renombrando ese atributo.

const { volumen, segundo, cancion, detalles:{autor:autorDetalle} } = reproductor;
//const { autor } = detalles;

// console.log('El volúmen actual es: ', volumen);
// console.log('El segundo actual es: ', segundo);
// console.log('La canción actual es: ', cancion);
// console.log('El autor es: ', autorDetalle); video 19


const dbz: string[] = ['Goku','Vegeta','Trunks'];

//const [ per1, per2, per3 ] = dbz;  //Se realiza por posicion y no por nombres cuando se trata de un array

const [ , , per3 ] = dbz; //Si quiero solo 1, dejo espacios en blanco en los demás.

//console.log('Personaje 1:', per1);
//console.log('Personaje 2:', per2);
console.log('Personaje 3:', per3);

