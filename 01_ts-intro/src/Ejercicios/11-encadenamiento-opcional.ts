
export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Lucho'
}

const passenger2: Passenger = {
    name: 'Lucho',
    children: ['Tony', 'Poroto', 'Pedro']
}

const printChildren = ( passanger: Passenger ) => {

    const howManyChildren = passanger.children?.length || 0; //El ? (optional chaining) expresa que SI tiene el atributo childre, me devuelve la longitud sino me devuelve 0. 
    //const howManyChildrens = passanger.children!.length; //Con el !(nonNullAssertionOperator) le inico que siempre recibira un valor children.

    console.log(passanger.name, howManyChildren);
    
}

printChildren(passenger1);