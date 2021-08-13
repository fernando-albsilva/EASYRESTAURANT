import {  Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProductCreateDialog } from './product-create-dialog/product-create-dialog-component';

import { ProductApi } from './api/product-api';
import { ProductModel } from './models/Product.model';
import { Subject } from 'rxjs';
import { IerLeftSideMenu } from '../Shared/Components/er-left-side-menu/interface/er-left-side.interface';

@Component({
  selector: 'product',
  templateUrl: 'product-component.html',
  styleUrls: ['product-component.scss']
})
export class ProductComponent implements OnInit, IerLeftSideMenu {
  
  @Input() public itemSelected : boolean = false;

  public elementList : Array<ProductModel> = [];
  public selectedItemList : Array<string> = [];
  public classSelected:Subject<string> = new Subject();


  constructor(
    private productApi:ProductApi,
    public dialog: MatDialog
    ){}

  ngOnInit(): void {
      this.getProducts();
      
  }

  public getProducts = () =>{
     this.elementList = this.productApi.getProducts();
     console.log("nova lista");
     setTimeout(() => {
       console.log(this.elementList[2]);
       console.log(this.elementList[2].name.length);
       
     }, 300);
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


  public addElementEvent(){
    const dialogRef = this.dialog.open(ProductCreateDialog, {
      height: '460px',
      width: '600px'
    });
  }

  public editElementEvent(){
    console.log("chamou avo edit");
    console.log(this.selectedItemList);

    if(this.selectedItemList.length === 1)
    {
      console.log("entrou");
      let newData : ProductModel =  this.elementList.filter( (element )=>{
        return element.id===this.selectedItemList[0];
      })[0];

     
      const dialogRef = this.dialog.open(ProductCreateDialog, {
        height: '460px',
        width: '600px',
        data: { 
          id: newData.id,
          name: newData.name,
          unitValue: newData.unitValue,
          cost: newData.cost
        }
      });
    }
  }

  // public searchElementEvent(textFilter:string){
  //   if(textFilter)
  //   alert("chamou pai search:"+textFilter);
  // }

  public removeElementEvent(){
    alert("chamou avo remove");
    if(this.selectedItemList.length === 1)
    {
      let id:string=this.selectedItemList[0];
      this.productApi.deleteProduct(id);
    }else{
      this.productApi.deleteMultiplesProducts(this.selectedItemList);
    }
  }

  public selectedItemListEvent(listOfSelectedItems:any){
    this.selectedItemList=listOfSelectedItems;
  }

}

