import { Component, Output, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent implements OnInit{

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }

  public countries: Country[] = [];
  public initialValue:string = '';

  public isLoading = false;

  searchByCountry( term:string ): void{

    this.isLoading = true;

    this.countriesService.searchCountry(term)
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }

}
