import { ProductCreateDialog } from './product-crreate-dialog/product-create-dialog-component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ProductApi } from './api/product-api';
import { ProductModel } from './models/Product.model';
import { Subject } from 'rxjs';
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
    classSelected:Subject<string> = new Subject();


    constructor(
      private productApi:ProductApi,
      public dialog: MatDialog
      ){}

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
      this.classSelected.next(id);
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
        // this.classSelected=id+"true";
        this.selectedItemList.push(id);
        
      }else{
        // this.classSelected=id+"false";
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
      const dialogRef = this.dialog.open(ProductCreateDialog, {
        height: '460px',
        width: '600px'
      });

     
    }

    public editElement(){
      alert("chamou pai edit");
    }

    public searchElement(){
      alert("chamou pai search");
    }

    public removeElement(){
      alert("chamou pai remove");
      let id:string=this.productList[0].id;
      this.productApi.deleteProduct(id);
    }


}

