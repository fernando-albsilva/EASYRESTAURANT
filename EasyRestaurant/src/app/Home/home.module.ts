import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

import { SharedModule } from '../Shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './components/table/table.component';
import { TableEditingDialogComponent } from './components/table-editing-dialog/table-editing-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
    ],
  exports:[
   ],
  declarations: [
    HomeComponent,
    TableComponent,
    TableEditingDialogComponent
  ],
})
export class HomeModule { }
