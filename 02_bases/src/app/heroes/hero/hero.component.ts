import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  public name:string = 'ironman';
  public age:number = 45;
  
  get capitalizedName():string {
    return this.name.toUpperCase();
  } //Cuando queremos utilizar una propiedad existente, en este caso solo ponerlo en mayus, el get funciona como una propiedad.

  getHeroDescription():string{
    return `${this.name} - ${this.age} años.`;
  }

  changeHero():void{
    this.name = 'batman';
  }

  changeAge():void{
    this.age = 50;
  }

  reset():void{
    this.name = 'ironman';
    this.age = 45;
  }

}
