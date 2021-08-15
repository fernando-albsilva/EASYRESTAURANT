import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ProductApi } from '../api/product-api';
import { ProductModel } from 'src/app/Product/models/Product.model';




@Component({
  selector: 'product-create-dialog',
  templateUrl: 'product-create-dialog.component.html',
  styleUrls: ['product-create-dialog.component.scss']
})

export class ProductCreateDialog implements OnInit{

  public product : ProductModel = new ProductModel();
  public isNew: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ProductCreateDialog>,
    private api : ProductApi,
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
      this.api.createProduct(this.product);
    }else{
      this.api.updateProduct(this.product);
    }
   
    this.dialogRef.close();

  }

  public print() {
    console.log(this.product.name);
  }

}