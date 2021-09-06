import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkerComponent } from './worker.component';



const routes: Routes = [
  { path: 'worker', component: WorkerComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkerRoutingModule { }
