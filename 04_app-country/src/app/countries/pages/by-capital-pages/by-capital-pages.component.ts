import { Component, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html'
})
export class ByCapitalPagesComponent implements OnInit{

  constructor( private countriesService: CountriesService ){} //Inyectamos el service en el componente a utilizarlo.
  
  ngOnInit(): void { //Para persistir datos guardados de la consulta api los hago con ciclo de vida de componente.
    this.countries = this.countriesService.cacheStore.byCapital.countries; //Al reiniciar la web desaparece ya que vuelve a renderizarse el componente.
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  public countries:Country[] = [];

  public initialValue:string = '';

  public isLoading: boolean = false;//Spinner que aparece solo cuando esta buscando.

  searchByCapital( term:string ):void {

    this.isLoading = true;

    this.countriesService.searchCapital(term) //Llamaos al metodo del service que hace la consulta a la api.
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      } )
  }

}
