import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { ProductCreateDialog } from './product-create-dialog/product-create-dialog.component';
import { ProductApi } from './api/product-api';
import { ProductModel } from './models/Product.model';
import { PageListMessages } from '../Shared/Components/er-page-list/Enum/PageListMessages';
import { IErSnackBar } from '../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { IErLeftSideMenu } from '../Shared/Components/er-left-side-menu/interface/er-left-side.interface';

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss']
})
export class ProductComponent implements OnInit, IErSnackBar, IErLeftSideMenu {
  
 
  public elementList : Array<ProductModel> = [];
  public selectedItemList : Array<string> = [];
  public clearListOfSelectedItems:Subject<any> = new Subject();
  public messageSent:Subject<any> = new Subject();
  

  constructor(
    private productApi:ProductApi,
    public dialog: MatDialog
    ){}

  ngOnInit(): void {
      this.getProducts();   
  }

  public getProducts = () => {
        this.productApi.getProducts().subscribe(response =>{
        this.elementList = response;
     });
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


  public addElementEvent = () =>{
    const dialogRef = this.dialog.open(ProductCreateDialog, {
      height: '460px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe( (element:any) => {
      if(element)
      {
        if(element.responseType === 'save')
        {
          this.productApi.createProduct(element.response).subscribe(
            result => {
              console.log(result)
              this.getProducts();
              this.messageSent.next({type:"valid", messageSent : `${PageListMessages.productCreatedSucessfull}`});
              this.clearListOfSelectedItems.next();
            },
            erro => {
                console.log(erro);
            }
          );     
        }
      }
      
    });
  }

  public editElementEvent = () => {

    if(this.selectedItemList.length === 1)
    {
      let newData : ProductModel =  this.elementList.filter( (element )=>{
        if(element.id===this.selectedItemList[0])
        {
          element.name = element.name.trim();
        }
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
      
      dialogRef.afterClosed().subscribe( (element:any) => {
        if(element)
        {
          if(element.responseType === 'update')
          {
            this.productApi.updateProduct(element.response).subscribe(
              result => {
                console.log(result)
                this.getProducts();
                this.messageSent.next({type:"valid", messageSent : `${PageListMessages.productUpdatedSucessfull}`});
                this.clearListOfSelectedItems.next();
              },
              erro => {
                  console.log(erro);
              }
            );     
          }
        }
      });
      
      
    }
    else{
      this.messageSent.next({type:"warning", messageSent : `${PageListMessages.onlyOneItemUpdatePermited}`});
    }
    
  }

  public removeElementEvent = () => {
  
    if(this.selectedItemList.length > 0)
    {
      if(this.selectedItemList.length === 1)
      {
        let id:string=this.selectedItemList[0];
        this.productApi.deleteProduct(id)
          .subscribe(
            result => {
              console.log(result)
              this.getProducts();
              this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemRemoved}`});
              this.clearListOfSelectedItems.next();
            },
            erro => {
                console.log(erro);
            }
          );     
      }else{
        this.productApi.deleteMultiplesProducts(this.selectedItemList)
        .subscribe(
          result => {
            console.log(result)
            this.getProducts();
            this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemsRemoved}`});
            this.clearListOfSelectedItems.next();
          },
          erro => {
              console.log(erro);
          }
        );       
      }
    }
  }

  public selectedItemListEvent = (listOfSelectedItems:any) => {
    this.selectedItemList=listOfSelectedItems;
  }



}

