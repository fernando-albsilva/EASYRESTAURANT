import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Subject } from "rxjs";

import { ProductModel } from 'src/app/Product/models/Product.model';
import { IErSnackBar } from './../../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { PageListMessages } from "src/app/Shared/Components/er-page-list/Enum/PageListMessages";

@Component({
  selector: 'product-create-dialog',
  templateUrl: 'product-create-dialog.component.html',
  styleUrls: ['product-create-dialog.component.scss']
})

export class ProductCreateDialog implements OnInit, IErSnackBar{

  public product : ProductModel = new ProductModel();
  public isNew: boolean = true;

  public messageSent:Subject<any> = new Subject();
  
  constructor(
    public dialogRef: MatDialogRef<ProductCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel) {}
  
  
  ngOnInit(): void {
    if(this.data){
      this.isNew = false;
      this.product = this.data;
    }
  }

  public onCancel = (): void => {
    this.dialogRef.close();
  }

  public onSave = (): void => {
    if(this.isNew)
    {
        if(this.product.name && this.product.unitValue && this.product.cost)
        {
          this.dialogRef.close({response:this.product,responseType:"save"});
        }else{
         this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
        }
    }
    else
    {
      if(this.product.name && this.product.unitValue && this.product.cost)
      {
        this.dialogRef.close({response:this.product,responseType:"update"});
      }
      else
      {
       this.messageSent.next({type:"error", messageSent : `${PageListMessages.allFieldsMustBeFill}`});
      }
    }
   
  }


}