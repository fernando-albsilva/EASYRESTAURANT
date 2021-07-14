import { ProductApi } from './Product/api/product-api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './Home/page-home-component';
import { PageLoginComponent } from './Login/page-login-component';
import { PageProuctComponent } from './Product/page-product-component';
import { ProductCardComponent } from './Product/product-card/er-product-card-component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageHomeComponent,
    PageProuctComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
