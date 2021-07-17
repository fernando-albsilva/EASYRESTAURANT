import { LoginModule } from './Login/login.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductApi } from './Product/api/product-api';
import { ProductModule } from './Product/product.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    LoginModule
  
  ],
  providers: [
    ProductApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
