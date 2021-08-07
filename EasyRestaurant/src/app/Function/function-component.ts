import { Component, Input, OnInit } from '@angular/core';
import {MatDialog,} from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { FunctionApi } from './api/function-api';
import { FunctionModel } from './Model/FunctionModel';
// import { ProductCreateDialog } from './product-crreate-dialog/product-create-dialog-component';



@Component({
  selector: 'function',
  templateUrl: 'function-component.html',
  styleUrls: ['function-component.scss']
})
export class FunctionComponent implements OnInit {

    public elementList : Array<FunctionModel> = [];
    public selectedItemList : Array<string> = [];
    @Input() public itemSelected : boolean = false;
    classSelected:Subject<string> = new Subject();


    constructor(
      private functionApi:FunctionApi,
      public dialog: MatDialog
      ){}

    ngOnInit(): void {
        this.getFunctions();
        
    }

    public getFunctions = () =>{
       this.elementList = this.functionApi.getFunctions();
       console.log("nova lista");
       console.log(this.elementList);
    }

    public selectItem(id:string){
      console.log(id);
      let test:boolean = false;
      this.classSelected.next(id);
      this.selectedItemList = this.selectedItemList.filter( (element )=>{
        if(element===id)
        {
          test=true;
          return false;
        }
        return true;
      });

      if(!test)
      {
        this.selectedItemList.push(id);
        
      }
     
      this.itemIsSelected(id);
      console.log(this.selectedItemList);
    }

    public itemIsSelected(id:string):boolean{
      let test:boolean = false;
      this.selectedItemList.filter( (element )=>{
        if(element===id)
        {
          test=true; 
        }
      });
      return true;
    }
  

    public addElement(){
      // const dialogRef = this.dialog.open(ProductCreateDialog, {
      //   height: '460px',
      //   width: '600px'
      // });
    }

    public editElement(){
      alert("chamou pai edit");
    }

    public searchElement(){
      alert("chamou pai search");
    }

    public removeElement(){
      alert("chamou pai remove");
      let id:string=this.elementList[0].id;
      this.functionApi.deleteFunction(id);
    }


}

