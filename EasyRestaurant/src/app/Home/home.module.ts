import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './components/table.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule

    ],
  exports:[
   ],
  declarations: [
    HomeComponent,
    TableComponent
  ],
})
export class HomeModule { }
