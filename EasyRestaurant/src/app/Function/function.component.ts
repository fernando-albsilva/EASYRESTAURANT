import { Component, Input, OnInit } from '@angular/core';
import {MatDialog,} from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { FunctionApi } from './api/function-api';
import { FunctionModel } from './Model/FunctionModel';




@Component({
  selector: 'function',
  templateUrl: 'function.component.html',
  styleUrls: ['function.component.scss']
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
     
    }

    public selectItem(id:string){
    
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
      
    }

    public editElement(){
     
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

