/*
    ===== Código de TypeScript =====
*/

export interface Producto {
    desc: string;
    precio: number;
}

const telefono: Producto = {
    desc: 'Nokia 1110',
    precio: 50000
}

const telefono2: Producto = {
    desc: 'Iphone 14Pro',
    precio: 150000
}

export function calculaISV( productos: Producto[] ): [number,number] {

    let total = 0;

    productos.forEach( ( { precio } ) => {  //Aplicando desestructuracion
        total += precio;
    } )

    return [total, total * 0.15];
}

const productos = [ telefono, telefono2 ];

const [total, isv] = calculaISV(productos); //Desestructurando el return de la funcion.

console.log('Total:', total);
console.log('ISV:', isv);