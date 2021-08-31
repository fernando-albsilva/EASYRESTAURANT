import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { PageListMessages } from '../Shared/Components/er-page-list/Enum/PageListMessages';
import { FunctionApi } from './api/function-api';
import { FunctionCreateDialog } from './function-create-dialog/function-create-dialog.component';
import { FunctionModel } from './Model/FunctionModel';




@Component({
  selector: 'function',
  templateUrl: 'function.component.html',
  styleUrls: ['function.component.scss']
})
export class FunctionComponent implements OnInit {

  public elementList : Array<FunctionModel> = [];
  public selectedItemList : Array<string> = [];
  public clearListOfSelectedItems:Subject<any> = new Subject();
  public messageSent:Subject<any> = new Subject();


    constructor(
      private functionApi:FunctionApi,
      public dialog: MatDialog
      ){}

      

  ngOnInit(): void {
      this.getFunctions();   
  }

  public getFunctions = () => {
        this.functionApi.getFunctions().subscribe((response:Array<FunctionModel>) =>{
        this.elementList = this.sortListByName(response);
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
    const dialogRef = this.dialog.open(FunctionCreateDialog, {
      height: '460px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe( (element:any) => {
      if(element)
      {
        if(element.responseType === 'save')
        {
          this.functionApi.createFunction(element.response).subscribe(
            result => {
              console.log(result)
              this.getFunctions();
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

      let newData : FunctionModel =  this.elementList.filter( (element )=>{
        if(element.id.toString() === this.selectedItemList[0])
        {
          element.type = element.type.trim();
        }
        return element.id.toString() === this.selectedItemList[0];
      })[0];

      const dialogRef = this.dialog.open(FunctionCreateDialog, {
        height: '460px',
        width: '600px',
        data: { 
          id: newData.id,
          type: newData.type
        }
      });
      
      dialogRef.afterClosed().subscribe( (element:any) => {
        if(element)
        {
          if(element.responseType === 'update')
          {
            this.functionApi.updateFunction(element.response).subscribe(
              result => {
                console.log(result)
                this.getFunctions();
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

  public removeElementEvent = () => {
  
    if(this.selectedItemList.length > 0)
    {
      if(this.selectedItemList.length === 1)
      {
        let id:string=this.selectedItemList[0];
        this.functionApi.deleteFunction(id)
          .subscribe(
            result => {
              console.log(result)
              this.getFunctions();
              this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemRemoved}`});
              this.clearListOfSelectedItems.next();
            },
            erro => {
                console.log(erro);
            }
          );     
      }else{
        this.functionApi.deleteMultiplesFunctions(this.selectedItemList)
        .subscribe(
          result => {
            console.log(result)
            this.getFunctions();
            this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemsRemoved}`});
            this.clearListOfSelectedItems.next();
          },
          erro => {
              console.log(erro);
          }
        );       
      }
    }
    else{
      this.messageSent.next({type:"warning", messageSent : `${PageListMessages.selectAtLeastOneItem}`});
    }
  }

  public selectedItemListEvent = (listOfSelectedItems:any) => {
    this.selectedItemList=listOfSelectedItems;
  }

  private sortListByName = (list:Array<FunctionModel>):Array<FunctionModel> =>{

    return list.sort((a,b)=>{
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }

}
