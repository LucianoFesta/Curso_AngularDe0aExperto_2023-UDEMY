import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //Directivas de Angular (ngIf, ngFor, etc.)
import { FormsModule } from '@angular/forms';

import { MainPageComponent } from './pages/main-page.component';
import { ListComponent } from './components/list/list.component';
import { AddPersonajeComponent } from './components/add-personaje/add-personaje.component';




@NgModule({
  declarations: [
    MainPageComponent,
    ListComponent,
    AddPersonajeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class DbzModule { }
