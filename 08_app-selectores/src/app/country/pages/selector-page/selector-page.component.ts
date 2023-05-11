import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry, Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public countriesByRegion:SmallCountry[] = [];

  public borders:SmallCountry[] = [];

  public myForm:FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })

  constructor( 
    private fb: FormBuilder,
    private countriesService: CountriesService 
  ){}


  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChange();
  }

  get regions():Region[] {
    return this.countriesService.regions; //Como el servicio es privado, para pasar las regiones a la page, hago un metodo get.
  }

  //Lo que debemos hacer es escuchar que la region cambie, para enviar ese nombre de region y traer los paises.

  onRegionChanged():void {
    this.myForm.get('region')!.valueChanges   //Obtengo un observable (valueChanges) que emite cada vez que el valor cambia.
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ), //Agrego un efecto secundario, que es setear el valor de country para que el input de country quede con seleccione un pais.
        tap( () => this.borders = [] ),
        switchMap( region => this.countriesService.getCountriesByRegion(region) ) //Recibe el valor de un observable y me suscribe a otro observable.
      )
      .subscribe( countries => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChange():void {
    this.myForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('borders')!.setValue('')),
        filter( (value:string) =>  value.length > 0), //Si retorna un valor positivo continua (eso hace el filter) sino no hace mas nada.
        switchMap( alphacode => this.countriesService.getCountryByAlphaCode(alphacode) ), //Busco el pais
        switchMap( country => this.countriesService.getCountryBordersByCodes(country.borders) ) //del pais busco los limitrofes.
      )
      .subscribe( countries => {
        this.borders = countries;
      } )
  }


}
