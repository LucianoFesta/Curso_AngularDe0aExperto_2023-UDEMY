import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html'
})
export class ByRegionPageComponent implements OnInit{

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.term;
  }

  public countries: Country[] = [];
  public initialValue = '';
  public regions:string[] = ['Americas','Africa','Asia','Europe','Oceania'];
  public selectedRegion?:string;
  
  public isLoading = false;

  searchByRegion( term:string ): void{

    this.selectedRegion = term; //Tengo la region seleccionada para mostrar en la vista en cual estoy posicionado.

    this.isLoading = true;

    this.countriesService.searchRegion(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }

}
