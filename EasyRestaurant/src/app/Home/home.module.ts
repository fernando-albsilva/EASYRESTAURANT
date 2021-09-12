import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule

    ],
  exports:[
   ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
