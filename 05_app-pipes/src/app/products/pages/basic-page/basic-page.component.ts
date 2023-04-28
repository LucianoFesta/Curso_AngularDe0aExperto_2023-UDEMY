import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrls: ['./basic-page.component.css']
})
export class BasicPageComponent {

  public nameLower: string = 'luciano';
  public nameUpper: string =  'LUCIANO';
  public fullName: string = 'lUcIaNo FeStA';

  public customDate: Date = new Date();

}
