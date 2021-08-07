import {MatDialog,} from '@angular/material/dialog';
import { Component, Input, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { ProductApi } from 'src/app/Product/api/product-api';
import { ProductCreateDialog } from 'src/app/Product/product-crreate-dialog/product-create-dialog-component';
import { FunctionApi } from 'src/app/Function/api/function-api';

@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list-component.html',
  styleUrls: ['er-page-list-component.scss']
})
export class ErPageList implements OnInit {

    public contextList = {

    };

    @Input() public context : string="";
    @Input() public itemSelected : boolean = false;

    public elementList : Array<any> = [];
    public selectedItemList : Array<string> = [];
    classSelected:Subject<string> = new Subject();


    constructor(
      private productApi:ProductApi,
      private functionApi:FunctionApi,
      public dialog: MatDialog
      ){}

    ngOnInit(): void {
        this.geElements();
        
    }

    public geElements = () =>{

      if(this.context === "Product"){
        this.elementList = this.productApi.getProducts();
      }
      if(this.context === "Function"){
        this.elementList = this.functionApi.getFunctions();
      }
        console.log("nova lista");
        console.log(this.elementList);
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
        this.selectedItemList.push(id);
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
      let id:string=this.elementList[0].id;
      this.productApi.deleteProduct(id);
    }


}

