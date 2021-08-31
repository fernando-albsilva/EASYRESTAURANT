import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Subject } from "rxjs";

import { IErSnackBar } from '../../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { PageListMessages } from "src/app/Shared/Components/er-page-list/Enum/PageListMessages";
import { FunctionModel } from "../Model/FunctionModel";

@Component({
  selector: 'function-create-dialog',
  templateUrl: 'function-create-dialog.component.html',
  styleUrls: ['function-create-dialog.component.scss']
})

export class FunctionCreateDialog implements OnInit, IErSnackBar{

  public function : FunctionModel = new FunctionModel();
  public isNew: boolean = true;

  public messageSent:Subject<any> = new Subject();
  
  constructor(
    public dialogRef: MatDialogRef<FunctionCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FunctionModel) {}
  
  
  ngOnInit(): void {
    if(this.data){
      this.isNew = false;
      this.function = this.data;
    }
          
  }

  public onCancel = (): void => {
    this.dialogRef.close();
  }

  public onSave = (): void => {
    if(this.isNew)
    {
        if(this.function.type)
        {
          this.dialogRef.close({response:this.function,responseType:"save"});
        }else{
         this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
        }
    }
    else
    {
      if(this.function.type)
      {
        this.dialogRef.close({response:this.function,responseType:"update"});
      }
      else
      {
       this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
      }
    }
   
  }


}