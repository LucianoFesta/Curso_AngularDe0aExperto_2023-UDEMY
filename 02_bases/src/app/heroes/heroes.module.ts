import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from './hero/hero.component';
import { ListComponent } from './list/list.component';



@NgModule({
    declarations:[ //Componentes que utiliza el módulo
        HeroComponent,
        ListComponent,
    ],
    exports:[ //Componentes que vamos a exponer fuera de este modulo, para que lo podamos usar en toda la app.
        HeroComponent,
        ListComponent,
    ],
    imports:[
        CommonModule //Importar este modulo para que funcionen las directivas ng.
    ]
})
export class HeroesModule { }
