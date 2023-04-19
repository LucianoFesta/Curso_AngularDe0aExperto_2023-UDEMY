import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid'; //uuid para crear id unicos

import { Character } from '../interfaces/character.interface';

@Injectable({ //Decorador para decirle a Angular que es un servicio.
    providedIn: 'root' 
}) 

export class DbzService {

    //Aquí va toda la data que queremos manejar.
    public characters: Character[] = [
        {
            id: uuid(),
            name: 'Krillin',
            power: 1000
        },
        {
            id: uuid(),
            name: 'Goku',
            power: 9500
        },
        {
            id: uuid(),
            name: 'Vegeta',
            power: 7000
        }
];

onNewCharacter(character:Character):void{

    const newCharacter: Character = {id:uuid(), ...character};

    this.characters.push(newCharacter);
}

deleteCharacterById(id:string){
    this.characters = this.characters.filter(character => character.id !== id);
}

    constructor() { }
    
}
