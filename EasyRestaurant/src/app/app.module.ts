import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeModule } from './Home/home.module';
import { LoginModule } from './Login/login.module';
import { AppComponent } from './app.component';
import { ProductApi } from './Product/api/product-api';
import { SharedModule } from './Shared/shared.module';
import { ProductModule } from './Product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FunctionApi } from './Function/api/function-api';
import { FunctionModule } from './Function/function.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    SharedModule,
    ProductModule,
    HomeModule,
    FunctionModule
  
  ],
  providers: [
    ProductApi,
    FunctionApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
