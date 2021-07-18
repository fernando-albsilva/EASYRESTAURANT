import { ErLeftSideMenu } from './Components/er-left-side-menu/er-left-side-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErTopMenu } from './Components/er-menu/er-top-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ErTopMenu,
    ErLeftSideMenu
  ],
  declarations: [
    ErTopMenu,
    ErLeftSideMenu
  ],
})
export class SharedModule { }
