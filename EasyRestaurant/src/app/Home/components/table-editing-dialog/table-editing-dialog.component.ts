import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TableModel } from './../../models/TableModel';

@Component({
  selector: 'table-editing-dialog',
  templateUrl: './table-editing-dialog.component.html',
  styleUrls: ['./table-editing-dialog.component.scss']
})
export class TableEditingDialogComponent implements OnInit {

  public table: TableModel = new TableModel(); 

  constructor(
    public dialogRef: MatDialogRef<TableEditingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableModel) {}
  

  ngOnInit(): void {
    this.table = this.data;
    console.log(this.table);
  }

  public closeDialog = () => {
    this.dialogRef.close();
  }

}
