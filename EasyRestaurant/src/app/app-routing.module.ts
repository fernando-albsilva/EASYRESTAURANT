import { PageProuctComponent } from './Product/page-product-component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './Home/page-home-component';

const routes: Routes = [
  { path: 'home', component: PageHomeComponent },
  { path: 'product', component: PageProuctComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
