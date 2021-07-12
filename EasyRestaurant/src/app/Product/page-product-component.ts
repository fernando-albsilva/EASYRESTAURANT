import { ProductApi } from './api/product-api';
import { PageRouterService } from './../Service/page-router-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'page-product',
  templateUrl: 'page-product-component.html',
  styleUrls: ['page-product-component.scss']
})
export class PageProuctComponent {

    constructor(private productApi:ProductApi){}

    getProducts(){
        this.productApi.getProducts();
    }
}