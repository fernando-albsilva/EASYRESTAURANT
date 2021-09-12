import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Home/home.component';
import { FunctionComponent } from './Function/function.component';
import { LoginComponent } from './Login/login.component';
import { ProductComponent } from './Product/product.component';
import { WorkerComponent } from './Worker/worker.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'product', component: ProductComponent},
  { path: 'function', component: FunctionComponent},
  { path: 'worker', component: WorkerComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
