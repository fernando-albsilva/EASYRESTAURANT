import { FunctionComponent } from './function.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../Shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
    ],
  exports:[
    FunctionComponent
   ],
  declarations: [
    FunctionComponent
  ],
})
export class FunctionModule { }
