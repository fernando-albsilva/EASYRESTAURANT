import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../Shared/shared.module';
import { FunctionComponent } from './function.component';
import { FunctionCreateDialog } from './function-create-dialog/function-create-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
    ],
  exports:[
    FunctionComponent,
    FunctionCreateDialog
   ],
  declarations: [
    FunctionComponent,
    FunctionCreateDialog

  ],
})
export class FunctionModule { }
