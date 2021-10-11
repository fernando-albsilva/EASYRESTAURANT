import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class ConfirmDialogData {
  public title:string = "";
  public titleColor:string = "green";
  public message:string = "";
  public messageColor:string = "green";

  //colors available
  // green
  // read
  // purple
  // orange
  // blue

  constructor () {}

  set (title:string,message:string,titleColor?:string,messageColor?:string)
  {
    this.title = title;
    this.message = message;
    if(!!titleColor ) {this.titleColor = titleColor;}
    if(!!messageColor) {this.messageColor = messageColor};
  }

}


@Component({
  selector: 'er-confirm-dialog',
  templateUrl: 'er-confirm-dialog.component.html',
  styleUrls: ['er-confirm-dialog.component.scss']
})
export class ErConfirmDialog implements AfterViewInit {

    public confirmDialogData: ConfirmDialogData = new ConfirmDialogData();
    public title:string = "";
    public titleColor:string = "";
    public message:string = "";
    public messageColor:string = "";

    constructor (
      public confirmDialofRef: MatDialogRef<ErConfirmDialog>,
      @Inject(MAT_DIALOG_DATA) public dataReceived: ConfirmDialogData)
    {
      this.confirmDialofRef.disableClose = true;
    }

    ngAfterViewInit(){
      this.title = this.dataReceived.title;
      this.titleColor = this.dataReceived.titleColor;
      this.message = this.dataReceived.message;
      this.messageColor = this.dataReceived.messageColor;
    }


    public cancelAction = () => {
        this.confirmDialofRef.close('cancel');
    }
    public confirmAction = () => {
        this.confirmDialofRef.close('confirm');
    }

}
