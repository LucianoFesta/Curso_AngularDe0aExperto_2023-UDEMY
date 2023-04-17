import { Component } from '@angular/core';

// De este componente se desprenden todos los demás
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = 'Hola Mundo';

}
