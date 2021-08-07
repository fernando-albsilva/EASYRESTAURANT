import {MatDialog,} from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { ProductApi } from 'src/app/Product/api/product-api';
import { FunctionApi } from 'src/app/Function/api/function-api';

@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list-component.html',
  styleUrls: ['er-page-list-component.scss']
})
export class ErPageList implements OnInit {

    
    @Output() addElementEvent = new EventEmitter<any>();
    @Output() editElementEvent = new EventEmitter<any>();
    @Output() searchElementEvent = new EventEmitter<any>();
    @Output() removeElementEvent = new EventEmitter<any>();
    @Output() selectedItemListEvent = new EventEmitter<any>();

    @Input() public context : string="";
    @Input() public itemSelected : boolean = false;

    public elementList : Array<any> = [];
    public selectedItemList : Array<string> = [];
    classSelected:Subject<string> = new Subject();


    constructor(
      private productApi:ProductApi,
      private functionApi:FunctionApi,
      public dialog: MatDialog
      ){}

    ngOnInit(): void {
        this.geElements();
        
    }

    public geElements = () =>{

      if(this.context === "Product"){
        this.elementList = this.productApi.getProducts();
      }
      if(this.context === "Function"){
        this.elementList = this.functionApi.getFunctions();
      }
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
      this.selectedItemListEvent.emit(this.selectedItemList);

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
      this.addElementEvent.emit();
    }

    public editElement(){
      this.editElementEvent.emit();
    }

    public searchElement(){
      this.searchElementEvent.emit();
    }

    public removeElement(){
      this.removeElementEvent.emit();
    }


}

