//una página no es mas que un componente que se usara para el Router(ruteo de paginas o componentes)

import { Component } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { DbzService } from '../services/dbz.service';

@Component({
    selector: 'app-dbz-main-page',
    templateUrl: './main-page.component.html'
})

export class MainPageComponent {
    
    //Con este constructor puedo traerme toda la info del servicio. INYECCION DE SERVICIO.
    constructor(private dbzService: DbzService){};

    get characters():Character[]{
        return [...this.dbzService.characters]; //Al tener un service privado, necesito un get para poder consultar los datos. Ademas llamar a los metodos que utilizamos.
    }

    onDeleteCharacter( id:string ):void {
        this.dbzService.deleteCharacterById( id );
    }

    onNewCharacter( character:Character ):void {
        this.dbzService.onNewCharacter( character );
    }

}
