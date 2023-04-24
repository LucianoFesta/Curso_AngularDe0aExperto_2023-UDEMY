import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img {
      width: 25px
    }`
  ]
})
export class CountryTableComponent {

  @Input() //Recibo del padre la lista de países de la consulta a la api.
  public countries: Country[] = [];

}
