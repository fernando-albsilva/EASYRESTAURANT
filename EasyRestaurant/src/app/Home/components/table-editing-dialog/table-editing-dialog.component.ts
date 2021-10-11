
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';

import { HomeApi } from './../../api/Home.api';
import { TableModel, WaiterModel, ProductForTableList } from './../../models/TableModel';
import { IErSnackBar } from './../../../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { ErMessages } from 'src/app/services/er-messages';
import { ProductModel } from 'src/app/Product/models/Product.model';
import { ConfirmDialogData, ErConfirmDialog } from './../../../Shared/Components/er-confirm-dialog/er-confirm-dialog.component';


@Component({
  selector: 'table-editing-dialog',
  templateUrl: './table-editing-dialog.component.html',
  styleUrls: ['./table-editing-dialog.component.scss']
})
export class TableEditingDialogComponent implements OnInit, OnDestroy, IErSnackBar {


  @ViewChild(MatTable) tableView: MatTable<ProductForTableList> | undefined;

  public table: TableModel = new TableModel();
  public waiters: Array<WaiterModel> = []
  public products: Array<ProductModel> = []
  public productToAdd:ProductForTableList = new ProductForTableList();
  public selectedWaiter: WaiterModel = new WaiterModel;
  public startTimeHtmlBinder: string = "";
  public durationTimeHtmlBinder: string = "";
  public productSelectedValue: any;
  public subscriptions: Array<Subscription> = [];
  public messageSent: Subject<any> = new Subject<any>();
  public displayedColumns: string[] = ['name', 'unitValue', 'quantity', 'totalColumn'];
  public dataSource: Array<ProductForTableList> = [];
  private timeCounterReference: any;

  constructor(
    private erMessages: ErMessages,
    public dialogRef: MatDialogRef<TableEditingDialogComponent>,
    public erConfirmDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: TableModel,
    private homeApi: HomeApi)
    {
      this.dialogRef.disableClose = true;
    }


  ngOnInit(){
    this.table = this.data;
    this.subscriptions.push(this.homeApi.getWaiters().subscribe( (result)=>{
        this.waiters = result;
      }, err =>{
        console.log(err);
      }));

      this.subscriptions.push(this.homeApi.getProducts().subscribe( (result)=>{
        this.products = result;
      }, err =>{
        console.log(err);
      }));

      if(this.table.isOccupy)
      {
        this.startCountingTime();
        this.bindStartTimeToHtml();
        this.populateAccountTable();
      }
  }

  ngOnDestroy(){
    this.subscriptions.forEach(x=> x.unsubscribe());
    clearInterval(this.timeCounterReference);
  }

  public closeDialog = (closeType:string) => {
      this.dialogRef.close({table:this.table,closeType});
  }

  public waiterHasBeenChanged = (waiterId: string) => {

    this.waiters.forEach( (waiter)=>{
      if(waiterId === waiter.workerId)
      {
        this.table.waiter.name = waiter.name;
      }
    });
  }

  public startTable = () => {
    if(!this.table.isOccupy)
    {
      if(this.canNotStartTable()){
        this.messageSent.next({type:"warning", messageSent : `${this.erMessages.haveToFillWaiterAndClientName}`});
      }
      else{
        this.fillStartTime();
        this.bindStartTimeToHtml();
        this.table.isOccupy = true;
        this.startCountingTime();
      }
    }
    else
    {
      this.messageSent.next({type:"warning", messageSent : `${this.erMessages.thisTableAlredyIsStarted}`});
    }

  }

  public canNotStartTable = () =>{
    if(this.table.clientName === "" || this.table.waiter.workerId === ""){
      return true;
    }
    else{
      return false;
    }
  }

  public productHasBeenChanged = (productId: string) =>{

    this.products.findIndex((product) => {
      if(product.id === productId)
      {
        this.productToAdd.set(product.id,product.name,product.unitValue,product.cost);
        return true;
      }
      return false;
    });

  }

  public addProductToTable = () => {
    if(this.productToAdd.quantity <= 0)
    {
      this.messageSent.next({type:"error", messageSent : `${this.erMessages.quantityOfProductCanNotBeZero}`});
    }
    else
    {
      if(!!this.productSelectedValue)
      {
        this.table.products.push(this.productToAdd)
        this.updateTableData();
        this.productToAdd = new ProductForTableList();
        this.clearProductInfoAndSelectBox();
      }
    }
  }

  public includeProductIsDisabled = () => {
    if(this.productToAdd.id === "" && this.productToAdd.quantity == 0)
    {
      return true;
    }
    else{
      return false;
    }
  }

  public isTableStarted = () => {
    return this.table.isOccupy;
  }

  public calcTenPerCentOfAccount = () => {
    let total = parseFloat(this.calcTotalAccountWithoutTenPerCent());
    return (total*0.1).toFixed(2);
  }

  public calcTotalAccountWithoutTenPerCent  = () => {
    let total = 0;
    this.table.products.forEach( product => {
      total += (product.unitValue * product.quantity);
    });
    return total.toFixed(2);
  }

  public calcTotalAccountWithTenPerCent = () => {
    let total = (parseFloat(this.calcTotalAccountWithoutTenPerCent())*1.1).toFixed(2);
    return total;
  }

  public deleteProductFromAccountList = (id:string) => {

    let dataToSend =  new ConfirmDialogData();
    dataToSend.set(
      'Aviso!',
      'Você realmente deseja remover esse produto?',
      'orange'
    )

    const confirmdialogRef = this.erConfirmDialog.open(ErConfirmDialog, {
      height: '250px',
      width:'400px',
      data: dataToSend
    });

    confirmdialogRef.afterClosed().subscribe( (optionSelected:string) => {
        if(optionSelected === 'confirm')
        {
          this.table.products = this.table.products.filter( product => {
            if( product.id === id)
            {
              return false;
            }
            else
            {
              return true;
            }
          });

          this.updateTableData();
        }
    });


  }

  private clearProductInfoAndSelectBox = () =>{
    this.productSelectedValue = undefined;
  }

  private populateAccountTable(){
    this.updateTableData();
  }

  private fillStartTime = () => {
    let today = new Date();
    this.table.startTime.hour =  today.getHours();
    this.table.startTime.min =  today.getMinutes();
    this.table.startTime.sec =  today.getSeconds();
  }

  private startCountingTime = () => {
      this.timeCounterReference = setInterval(()=>{
        this.findDurationOfTable();
       }, 1000);
  }

  private findDurationOfTable = () => {
      let inicialTimeInSeconds =
        (this.table.startTime.hour * 3600) +
        (this.table.startTime.min * 60) +
        (this.table.startTime.sec);

      this.durationTimeHtmlBinder = this.calcDuration(inicialTimeInSeconds);
  };

  private calcDuration = (inicialTimeInSeconds:number): string => {
    let today = new Date();
    let currentTimeInSeconds =
      (today.getHours() * 3600) +
      (today.getMinutes() * 60) +
      (today.getSeconds());

    let difference = currentTimeInSeconds - inicialTimeInSeconds;

    let rest = 0;
    let hour:number = Math.trunc(difference / 3600);
    rest = Math.trunc(difference % 3600);
    let min:number = Math.trunc(rest / 60);
    rest = Math.trunc(rest % 60);
    let sec:number = Math.trunc(rest);


    return `${this.needZeroBeforeNumber(hour)} : ${this.needZeroBeforeNumber(min)} : ${this.needZeroBeforeNumber(sec)}`
  }

  private needZeroBeforeNumber = (number:number) => {
    if(number<10){
      return `0${number}`
    }
    else{
      return number.toString();
    }
  }

  private bindStartTimeToHtml = () => {
    this.startTimeHtmlBinder =
         `${this.needZeroBeforeNumber(this.table.startTime.hour)} :
          ${this.needZeroBeforeNumber(this.table.startTime.min)} :
          ${this.needZeroBeforeNumber(this.table.startTime.sec)}`;
  }

  private updateTableData = () => {
    this.dataSource = this.table.products;
    this.tableView?.renderRows();
  }


  //TODO pensar como vai ser o objeto devolvido para lista de mesas
}
