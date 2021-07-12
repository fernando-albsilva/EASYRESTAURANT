import { ProductApi } from './api/product-api';
import { PageRouterService } from './../Service/page-router-service.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from './models/Product.model';
@Component({
  selector: 'page-product',
  templateUrl: 'page-product-component.html',
  styleUrls: ['page-product-component.scss']
})
export class PageProuctComponent implements OnInit {

    public productList : Array<ProductModel> = []
    constructor(private productApi:ProductApi){}

    ngOnInit(): void {
        this.getProducts();
    }
    getProducts(){
       this.productList = this.productApi.getProducts();
       console.log("nova lista");
       console.log(this.productList);
    }
}