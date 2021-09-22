
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/Product/models/Product.model';

import { HomeApi } from './../../api/Home.api';
import { TableModel, WaiterModel, ProductForTableList, TableStartTime } from './../../models/TableModel';
import { IErSnackBar } from './../../../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { HomeMessages } from '../../homeMessages/HomeMessages';

@Component({
  selector: 'table-editing-dialog',
  templateUrl: './table-editing-dialog.component.html',
  styleUrls: ['./table-editing-dialog.component.scss']
})
export class TableEditingDialogComponent implements OnInit, OnDestroy, IErSnackBar {

  public table: TableModel = new TableModel();
  public waiters: Array<WaiterModel> = []
  public products: Array<ProductModel> = []
  public productToAdd:ProductForTableList = new ProductForTableList();
  public selectedWaiter: WaiterModel = new WaiterModel;
  public startTimeHtmlBinder: string = "";
  public durationTimeHtmlBinder: string = "";
  public subscriptions: Array<Subscription> = [];
  public messageSent: Subject<any> = new Subject<any>();
  private timeCounterReference: any;

  constructor(
    public dialogRef: MatDialogRef<TableEditingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableModel,
    private homeApi: HomeApi
    ) {}


  ngOnInit(){
    this.table = this.data;
    this.subscriptions.push(this.homeApi.getWaiters().subscribe( (result)=>{
        this.waiters = result;
        // console.log(this.waiters);
      }, err =>{
        console.log(err);
      }));

      this.subscriptions.push(this.homeApi.getProducts().subscribe( (result)=>{
        this.products = result;
        // console.log(this.products);
      }, err =>{
        console.log(err);
      }));

      if(this.table.isOccupy)
      {
        this.startCountingTime();
        this.bindStartTimeToHtml();
      }
      // console.log(this.table);

  }

  ngOnDestroy(){
    this.subscriptions.forEach(x=> x.unsubscribe());
    clearInterval(this.timeCounterReference);
  }

  public closeDialog = () => {
      this.dialogRef.close(this.table);
  }

  public waiterHasBeenChanged = (waiterId: string) => {

    this.waiters.forEach( (waiter)=>{
      if(waiterId === waiter.workerId)
      {
        this.table.waiter.name = waiter.name;
      }
    });
    // console.log(this.table);
  }

  public startTable = () => {
    if(this.canNotStartTable()){
      this.messageSent.next({type:"warning", messageSent : `${HomeMessages.haveToFillWaiterAndClientName}`});
    }
    else{
      this.fillStartTime();
      this.bindStartTimeToHtml();
      this.table.isOccupy = true;
      this.startCountingTime();
    }
  }

  public canNotStartTable = () =>{
    // console.log(this.table)
    if(this.table.clientName === "" || this.table.waiter.workerId === ""){
      return true;
    }
    else{
      return false;
    }
  }

  public productHasBeenChanged = (productId: string) =>{

    this.products.forEach((product) => {
      if(product.id === productId)
      {
        this.productToAdd.set(product.id,product.name,product.unitValue,product.cost);
      }
    });

  }

  public addProductToTable = () => {
    this.table.products.push(this.productToAdd)
    console.log(`Produto : ${this.productToAdd.name} adicionado na lista.`)
    this.productToAdd = new ProductForTableList();

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
      // console.log(inicialTimeInSeconds);
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


  //TODO pensar como vai ser o objeto devolvido para lista de mesas
}
