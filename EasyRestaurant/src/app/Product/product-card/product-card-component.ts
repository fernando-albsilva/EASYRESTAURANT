import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProductModel } from 'src/app/Product/models/Product.model';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card-component.html',
  styleUrls: ['product-card-component.scss']
})
export class ProductCardComponent implements OnInit {

    @Input() public product: ProductModel = new ProductModel();
    @Output() public itemSelected = new EventEmitter();

    @Input() public classSelected:string="";
    
    public productId:string="";
    public productName:string="";
    public unitValue:number=0.0;
    public unitCost:number=0.0;
    // public product: ProductModel = new ProductModel();

    constructor (){
      
    }

    ngOnInit(): void {
      if(this.product.name !== "")
      {
        this.productId = this.product.id;
        this.productName = this.product.name;
        this.unitValue = this.product.unitValue;
        this.unitCost = this.product.cost;
      }

    }

    public sendItemId(id:string){
      this.itemSelected.emit(id);
    }

    public isClassSelected(classSelected:string)
    {

    }

}