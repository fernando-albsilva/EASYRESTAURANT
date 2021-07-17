import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home-component';

import { HomeRoutingModule } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports:[
    HomeComponent,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    
  ]
})
export class HomeModule { }
