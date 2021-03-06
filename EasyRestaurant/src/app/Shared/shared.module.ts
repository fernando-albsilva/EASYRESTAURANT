import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { FunctionCardListComponent } from './Components/er-card-page-list/cards/function-card/function-card-list.component';
import { ErLeftSideMenu } from './Components/er-left-side-menu/er-left-side-menu.component';
import { ErTopMenu } from './Components/er-menu/er-top-menu.component';
import { ErPageList } from './Components/er-page-list/er-page-list.component';
import { ProductCardListComponent } from './Components/er-card-page-list/cards/product-card/product-card-list.component';
import { ErSnackBar } from './Components/er-snack-bar/er-snack-bar.component';
import { WorkerCardListComponent } from './Components/er-card-page-list/cards/worker-card/worker-card-list.component';
import { ErConfirmDialog } from './Components/er-confirm-dialog/er-confirm-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule

  ],
  exports:[
    ErTopMenu,
    ErLeftSideMenu,
    ErPageList,
    ProductCardListComponent,
    FunctionCardListComponent,
    WorkerCardListComponent,
    ErSnackBar,
    ErConfirmDialog
  ],
  declarations: [
    ErTopMenu,
    ErLeftSideMenu,
    ErPageList,
    ProductCardListComponent,
    FunctionCardListComponent,
    WorkerCardListComponent,
    ErSnackBar,
    ErConfirmDialog
  ],
})
export class SharedModule { }
