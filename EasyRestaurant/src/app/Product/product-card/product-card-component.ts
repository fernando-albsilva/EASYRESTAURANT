import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { ProductModel } from 'src/app/Product/models/Product.model';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card-component.html',
  styleUrls: ['product-card-component.scss']
})
export class ProductCardComponent implements OnInit {

    @Input() public product: ProductModel = new ProductModel();
    @Output() public itemSelected = new EventEmitter();
    @Input() changeClass : Subject<string>= new Subject();
   
    
    public productId:string="";
    public productName:string="";
    public unitValue:number=0.0;
    public unitCost:number=0.0;
    public isSelected:boolean=false;
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

      this.changeClass.subscribe( element =>{
        this.changeClassSelected(element);
      });
    }

    public sendItemId(id:string){
      this.itemSelected.emit(id);
    }

   
    public changeClassSelected(id:string){
      if(this.productId === id && this.isSelected === true)
      {
        this.isSelected = false;
      }else{

        if(this.productId === id && this.isSelected === false)
        {
          this.isSelected=true;
        }
      }
    }

}