import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './Home/home.module';
import { LoginModule } from './Login/login.module';
import { AppComponent } from './app.component';
import { ProductApi } from './Product/api/product-api';
import { SharedModule } from './Shared/shared.module';
import { ProductModule } from './Product/product.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    SharedModule,
    ProductModule,
    HomeModule
  
  ],
  providers: [
    ProductApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
