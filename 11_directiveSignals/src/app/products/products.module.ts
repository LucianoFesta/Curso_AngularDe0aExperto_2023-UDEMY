import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomLabelDirective } from '../shared/directive/custom-label.directive';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductsModule { }
