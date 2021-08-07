import { FunctionCardListComponent } from './Components/er-card-page-list/cards/function-card/function-card-list-component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErLeftSideMenu } from './Components/er-left-side-menu/er-left-side-menu.component';
import { ErTopMenu } from './Components/er-menu/er-top-menu.component';
import { ErPageList } from './Components/er-page-list/er-page-list-component';
import { ProductCardListComponent } from './Components/er-card-page-list/cards/product-card/product-card-list-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ErTopMenu,
    ErLeftSideMenu,
    ErPageList,
    ProductCardListComponent,
    FunctionCardListComponent
  ],
  declarations: [
    ErTopMenu,
    ErLeftSideMenu,
    ErPageList,
    ProductCardListComponent,
    FunctionCardListComponent
  ],
})
export class SharedModule { }
