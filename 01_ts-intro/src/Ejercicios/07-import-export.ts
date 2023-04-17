/*
    ===== Código de TypeScript =====
*/

import { Producto, calculaISV } from "./06-desestructuracion-funcion"; //Importamos la interfase Producto.

const carritoCompras: Producto[] = [
    {
        desc: "Motorola G20",
        precio: 80000
    },
    {
        desc: "Samsung Galaxy",
        precio: 100000
    }
];

const [ total, isv ] = calculaISV( carritoCompras );

console.log('Total:', total);
console.log('ISV:', isv);