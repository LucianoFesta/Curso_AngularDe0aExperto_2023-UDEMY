import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';



@NgModule({
  declarations: [
    Error404PageComponent
  ],
  exports: [
    Error404PageComponent //Lo exportamos porque quiero que sea una ruta por defecto.
  ]
})
export class SharedModule { }
