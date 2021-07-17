import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductRoutingModule } from './product.routing.module';
import { ProductCardComponent } from './product-card/product-card-component';
import { ProductComponent } from './product-component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule
    ],
  exports:[
    ProductComponent,
    ProductCardComponent
  ],
  declarations: [
    ProductComponent,
    ProductCardComponent
  ],
})
export class ProductModule { }
