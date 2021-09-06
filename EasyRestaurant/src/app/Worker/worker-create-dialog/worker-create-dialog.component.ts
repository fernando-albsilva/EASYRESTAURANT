import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Subject } from "rxjs";

import { IErSnackBar } from '../../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { PageListMessages } from "src/app/Shared/Components/er-page-list/Enum/PageListMessages";
import { Functions, WorkerModel } from "../models/Worker.model";


@Component({
  selector: 'worker-create-dialog',
  templateUrl: 'worker-create-dialog.component.html',
  styleUrls: ['worker-create-dialog.component.scss']
})

export class WorkerCreateDialog implements OnInit, IErSnackBar{

  public worker : WorkerModel = new WorkerModel();
  public functions : Functions = new Functions([]);
  public isNew: boolean = true;

  public messageSent:Subject<any> = new Subject();
  

  constructor(
    public dialogRef: MatDialogRef<WorkerCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  
  ngOnInit(): void {
    if(this.data.typeOfDialog !== 'create'){
      this.isNew = false;
      this.worker = this.data;
    }
    this.functions = this.data.functionList;
    console.log( this.functions.functionList);

  }
  public changeType(){

    this.functions.functionList.forEach(element => {
      if(element.id === this.worker.function.id)
        {
          this.worker.function.type = element.type
        }
    });  
  
  }

  public onCancel = (): void => {
    this.dialogRef.close();
  }

  public onSave = (): void => {
    if(this.isNew)
    {
        if(this.worker.name &&
           this.worker.cpf &&
           this.worker.phone_Number &&
           this.worker.address &&
           this.worker.email &&
           this.worker.function.type &&
           this.worker.function.id)
        {
          this.dialogRef.close({response:this.worker,responseType:"save"});
        }else{
         this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
        }
    }
    else
    {
      if(this.worker.name &&
        this.worker.cpf &&
        this.worker.phone_Number &&
        this.worker.address &&
        this.worker.email &&
        this.worker.function.type &&
        this.worker.function.id)
      {
        this.dialogRef.close({response:this.worker,responseType:"update"});
      }
      else
      {
       this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
      }
    }
   
  }


}