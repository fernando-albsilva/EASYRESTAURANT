import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { ProductCreateDialog } from './product-create-dialog/product-create-dialog.component';
import { ProductApi } from './api/product-api';
import { ProductModel } from './models/Product.model';
import { PageListMessages } from '../Shared/Components/er-page-list/Enum/PageListMessages';

@Component({
  selector: 'product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss']
})
export class ProductComponent implements OnInit {
  
 
  public elementList : Array<ProductModel> = [];
  public selectedItemList : Array<string> = [];
  public clearListOfSelectedItems:Subject<any> = new Subject();
  public messageSent:Subject<any> = new Subject();
  // this.messageSent.next({type:"warning", messageSent : "mensagem valida"});

  constructor(
    private productApi:ProductApi,
    public dialog: MatDialog
    ){}

  ngOnInit(): void {
      this.getProducts();   
  }

  public getProducts = () => {
     //this.elementList = this.productApi.getProducts();
     //this.existListOfItems=true;
     this.productApi.getProducts().subscribe(response =>{
        this.elementList = response;
     });
  }

  // public selectItem(id:string){
  //   console.log(id);
  //   let test:boolean = false;
  //   this.classSelected.next(id);
  //   this.selectedItemList = this.selectedItemList.filter( (element )=>{
  //     if(element===id)
  //     {
  //       test=true;
  //       return false;
  //     }
  //     return true;
  //   });

  //   if(!test)
  //   {
  //     this.selectedItemList.push(id); 
  //   }
   
  //   this.itemIsSelected(id);
  //   console.log(this.selectedItemList);
  // }

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

  //TODO ajustar o metodo de varios items para remover para retornar um observable e corrigir a lista de items selecionados
  public removeElementEvent(){
    // console.log("chamou avo remove");
    if(this.selectedItemList.length > 0)
    {

      if(this.selectedItemList.length === 1)
      {
        let id:string=this.selectedItemList[0];
        this.productApi.deleteProduct(id).subscribe(() =>{
          this.getProducts();
          
          this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemRemoved}`});
          this.clearListOfSelectedItems.next();
       });;
      }else{
        this.productApi.deleteMultiplesProducts(this.selectedItemList);
        this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemsRemoved}`});
        this.clearListOfSelectedItems.next();
        
      }
    }
    // this.getProducts();
  }

  public selectedItemListEvent(listOfSelectedItems:any){
    this.selectedItemList=listOfSelectedItems;
  }



}

