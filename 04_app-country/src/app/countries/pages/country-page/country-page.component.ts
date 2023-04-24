import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit{

  public country?: Country; //Como puede ser null, y cuando la pag se renderiza al inico y esta vacío, le pornemos el ?.

  //capturamos el el id de la url.
  constructor(private activatedRoute: ActivatedRoute, 
              private countryServices: CountriesService,
              private router:Router){}


  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.countryServices.searchCountryByAlphaCode(id))) //desestructuro el objeto params, saco el id.
        .subscribe( country => { 
          
          if( !country ){ return this.router.navigateByUrl('');} //En caso de que country sea nulo, redirigimos a una página.

          return this.country = country;
        
      })
  }

}
