import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html'
})
export class ByCapitalPagesComponent {

  constructor( private countriesService: CountriesService ){} //Inyectamos el service en el componente a utilizarlo.

  public countries:Country[] = [];

  searchByCapital( term:string ):void {
    this.countriesService.searchCapital(term) //Llamaos al metodo del service que hace la consulta a la api.
      .subscribe( countries => {
        this.countries = countries;
      } )
  }

}
