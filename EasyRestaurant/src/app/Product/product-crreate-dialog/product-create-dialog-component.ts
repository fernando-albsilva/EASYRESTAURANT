import { Component, Inject, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'product-create-dialog',
  templateUrl: 'product-create-dialog-component.html',
  styleUrls: ['product-create-dialog-component.scss']
})

export class ProductCreateDialog {


  constructor(
    public dialogRef: MatDialogRef<ProductCreateDialog>
    ) {}

  onCancel(): void {
    alert("entrou");
    this.dialogRef.close();
  }

  onSave(): void {
    
    this.dialogRef.close("salvou o objeto");
  }

}