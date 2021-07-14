import { Component } from '@angular/core';
import { ProductModel } from 'src/app/Product/models/Product.model';

@Component({
  selector: 'er-product-card',
  templateUrl: 'er-product-card-component.html',
  styleUrls: ['er-product-card-conponent.scss']
})
export class ProductCardComponent {

    public product: ProductModel = new ProductModel();

    constructor (){
        this.product.id = "11111";
        this.product.name = "coca-cola";
        this.product.unitValue = 5.55;
        this.product.cost = 3.50;
    }

}