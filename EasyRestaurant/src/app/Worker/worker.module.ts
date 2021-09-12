import { WorkerDetailDialog } from './worker-detail-dialog/worker-detail-dialog.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../Shared/shared.module';
import { WorkerRoutingModule } from './worker.routing.module';
import { WorkerComponent } from './worker.component';
import { WorkerCreateDialog } from './worker-create-dialog/worker-create-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    WorkerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule

    ],
  exports:[
   ],
  declarations: [
    WorkerComponent,
    WorkerCreateDialog,
    WorkerDetailDialog
  ],
})
export class WorkerModule { }
