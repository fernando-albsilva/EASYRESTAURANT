import { ProductApi } from './api/product-api';

import { Component, OnInit } from '@angular/core';
import { ProductModel } from './models/Product.model';
@Component({
  selector: 'product',
  templateUrl: 'product-component.html',
  styleUrls: ['product-component.scss']
})
export class ProductComponent implements OnInit {

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

    public addElement(){
      alert("chamou pai add");
    }

    public editElement(){
      alert("chamou pai edit");
    }

    public searchElement(){
      alert("chamou pai search");
    }

    public removeElement(){
      alert("chamou pai remove");
    }
}