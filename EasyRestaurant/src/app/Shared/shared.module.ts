import { ErTopMenu } from './Components/er-menu/er-top-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    ErTopMenu
  ],
  declarations: [
    ErTopMenu
  ],
})
export class SharedModule { }
