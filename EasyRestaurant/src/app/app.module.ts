import { HomeApi } from './Home/api/Home.api';
import { WorkerModule } from './Worker/worker.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { SharedModule } from './Shared/shared.module';
import { HomeModule } from './Home/home.module';
import { ProductModule } from './Product/product.module';
import { LoginModule } from './Login/login.module';
import { FunctionModule } from './Function/function.module';

import { ProductApi } from './Product/api/product-api';
import { FunctionApi } from './Function/api/function-api';
import { WorkerApi } from './Worker/api/worker-api';




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
    FunctionModule,
    WorkerModule,
    HomeModule
  
  ],
  providers: [
    ProductApi,
    FunctionApi,
    WorkerApi,
    HomeApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
