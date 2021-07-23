import { SharedModule } from './../Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductRoutingModule } from './product.routing.module';
import { ProductCardComponent } from './product-card/product-card-component';
import { ProductComponent } from './product-component';
import { ProductCreateDialog } from './product-crreate-dialog/product-create-dialog-component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
    ],
  exports:[ ],
  declarations: [
    ProductComponent,
    ProductCardComponent,
    ProductCreateDialog

  ],
})
export class ProductModule { }
