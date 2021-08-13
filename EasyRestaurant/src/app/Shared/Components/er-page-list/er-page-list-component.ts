import {MatDialog,} from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';


@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list-component.html',
  styleUrls: ['er-page-list-component.scss']
})
export class ErPageList implements OnInit {

    
    @Output() addElementEvent = new EventEmitter<any>();
    @Output() editElementEvent = new EventEmitter<any>();
    @Output() removeElementEvent = new EventEmitter<any>();
    @Output() selectedItemListEvent = new EventEmitter<any>();

    @Input() public context: string="";
    @Input() public itemSelected: boolean = false;

    @Input() public elementList: Array<any> = [];
    
    public elementFiltredList: Array<any> = [];
    public selectedItemList : Array<string> = [];
    classSelected:Subject<string> = new Subject();


    constructor(
      public dialog: MatDialog
      ){}

    ngOnInit(): void {
        this.elementFiltredList = this.elementList;
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

    public searchElement(event:any){
      
      let textFilter = event.target.value;
      this.elementFiltredList = this.elementList.filter((element)=>{
          if(element.name.indexOf(textFilter) >= 0 )
          {
            return true;
          }else{
            return false;
          }
      })
    }

    public removeElement(){
      this.removeElementEvent.emit();
    }


}

