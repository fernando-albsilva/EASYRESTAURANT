
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { HomeApi } from './../../api/Home.api';
import { TableModel, WaiterModel } from './../../models/TableModel';

@Component({
  selector: 'table-editing-dialog',
  templateUrl: './table-editing-dialog.component.html',
  styleUrls: ['./table-editing-dialog.component.scss']
})
export class TableEditingDialogComponent implements OnInit, OnDestroy {

  public table: TableModel = new TableModel();
  public waiters: Array<WaiterModel> = [] 
  public subscriptions: Array<Subscription> = [];
  public selectedWaiter: WaiterModel = new WaiterModel;

  constructor(
    public dialogRef: MatDialogRef<TableEditingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableModel,
    private homeApi: HomeApi
    ) {}
    
    
  ngOnInit(){
    this.table = this.data;
    this.subscriptions.push(this.homeApi.getWaiters().subscribe( (result)=>{
        this.waiters = result;
        console.log(this.waiters);
      }));
    
  }
  
  ngOnDestroy(){
    this.subscriptions.forEach(x=> x.unsubscribe());
  }

  public closeDialog = () => {
    this.dialogRef.close();
  }

  public changeType(){

  }


  //TODO pensar como vai ser o objeto devolvido para lista de mesas 
}
