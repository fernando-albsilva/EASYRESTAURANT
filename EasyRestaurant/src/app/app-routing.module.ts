import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './Home/page-home-component';
import { PageLoginComponent } from './Login/page-login-component';

const routes: Routes = [
  { path: "", component: PageLoginComponent },
  { path: 'page-home', component: PageHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
