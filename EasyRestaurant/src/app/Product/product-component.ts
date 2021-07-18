import { ProductApi } from './api/product-api';

import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from './models/Product.model';
@Component({
  selector: 'product',
  templateUrl: 'product-component.html',
  styleUrls: ['product-component.scss']
})
export class ProductComponent implements OnInit {

    public productList : Array<ProductModel> = [];
    public selectedItemList : Array<string> = [];
    @Input() public itemSelected : boolean = false;
    // public classSelected : string = "";
    @Input() public classSelected : string = "";


    constructor(private productApi:ProductApi){}

    ngOnInit(): void {
        this.getProducts();
    }
    getProducts(){
       this.productList = this.productApi.getProducts();
       console.log("nova lista");
       console.log(this.productList);
    }

    public selectItem(id:string){
      console.log(id);
      let test:boolean = false;
      
      this.selectedItemList = this.selectedItemList.filter( (element )=>{
        if(element===id)
        {
          test=true;
          return false;
        }
        return true;
      });

      if(!test)
      {
        this.classSelected=id+"true";
        this.selectedItemList.push(id);
        
      }else{
        this.classSelected=id+"false";
      }
     
      this.itemIsSelected(id);
      console.log(this.selectedItemList);
    }

    public itemIsSelected(id:string):boolean{
      let test:boolean = false;
      this.selectedItemList.filter( (element )=>{
        if(element===id)
        {
          test=true;
          
        }
      });
      return true;
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