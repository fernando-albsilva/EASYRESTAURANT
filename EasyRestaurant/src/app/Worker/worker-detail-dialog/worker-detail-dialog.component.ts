import { WorkerFlatModel } from './../models/Worker.model';
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { Subject } from "rxjs";

import { IErSnackBar } from '../../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { WorkerModel } from "../models/Worker.model";


@Component({
  selector: 'worker-detail-dialog',
  templateUrl: 'worker-detail-dialog.component.html',
  styleUrls: ['worker-detail-dialog.component.scss']
})

export class WorkerDetailDialog implements OnInit{

  public worker : WorkerModel = new WorkerModel();

  constructor(
    public dialogRef: MatDialogRef<WorkerDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit(): void {
      this.populateWorker(this.data.workerFlat);
  }

  public populateWorker = (workerFlat : WorkerFlatModel) => {
      this.worker.id = workerFlat.id;
      this.worker.name = workerFlat.name;
      this.worker.cpf = workerFlat.cpf;
      this.worker.phoneNumber = workerFlat.phoneNumber;
      this.worker.address = workerFlat.address;
      this.worker.email = workerFlat.email;
      this.worker.function.type = workerFlat.type;
  }

  public onCancel = (): void => {
    this.dialogRef.close();
  }



}
