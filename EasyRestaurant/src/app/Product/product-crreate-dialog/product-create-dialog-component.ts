import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { ProductApi } from './../api/product-api';
import { ProductModel } from 'src/app/Product/models/Product.model';



@Component({
  selector: 'product-create-dialog',
  templateUrl: 'product-create-dialog-component.html',
  styleUrls: ['product-create-dialog-component.scss']
})

export class ProductCreateDialog {

  public product : ProductModel = new ProductModel();

  constructor(
    public dialogRef: MatDialogRef<ProductCreateDialog>,
    private api : ProductApi
    ) {}

  public onCancel = (): void => {
    alert("entrou");
    this.dialogRef.close();
  }

  public onSave = (): void => {
    this.api.createProduct(this.product);

  }

  public print() {
    console.log(this.product.name);
  }

}