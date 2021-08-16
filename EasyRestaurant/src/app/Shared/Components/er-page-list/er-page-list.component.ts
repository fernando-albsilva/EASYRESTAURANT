import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { PageListMessages } from './Enum/PageListMessages';
import { IErSnackBar } from '../er-snack-bar/Interface/IErSnackBar';



@Component({
  selector: 'er-page-list',
  templateUrl: 'er-page-list.component.html',
  styleUrls: ['er-page-list.component.scss']
})
export class ErPageList implements OnInit, OnChanges, IErSnackBar {

    @ViewChild('searchInputField') searchInputElement: ElementRef<HTMLInputElement> | undefined;  

    @Output() addElementEvent = new EventEmitter<any>();
    @Output() editElementEvent = new EventEmitter<any>();
    @Output() removeElementEvent = new EventEmitter<any>();
    @Output() selectedItemListEvent = new EventEmitter<any>();

    @Input() public context: string="";
    @Input() public itemSelected: boolean = false;

    @Input() public elementList: Array<any> = [];
    @Input() clearSelectList : Subject<any>= new Subject();
    
    public elementFiltredList: Array<any> = [];
    public selectedItemList : Array<string> = [];
    public classSelected:Subject<string> = new Subject();
    public messageSent: Subject<any> = new Subject();
   


    constructor(
      public dialog: MatDialog,
      private cd: ChangeDetectorRef
      ){}
  
 

    ngOnInit(): void {
        this.elementFiltredList = this.elementList;
        this.clearSelectList.subscribe( () =>{
            this.clearListOfSelectedItems();
        });
    }
    

    ngOnChanges(changes: SimpleChanges): void {
     
        this.elementFiltredList = changes.elementList.currentValue;
          
    }

    public selectItem = (id:string) => {  
     
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
      this.selectedItemListEvent.emit(this.selectedItemList);

    }

    public itemIsSelected = (id:string):boolean =>{
      let test:boolean = false;
      this.selectedItemList.filter( (element )=>{
        if(element===id)
        {
          test=true; 
        }
      });
      return true;
    }

    public clearListOfSelectedItems = () => {
      this.selectedItemList = [];
    }


    public addElement = () => { 
      this.addElementEvent.emit();
    }

    public editElement = () => {
     this.verifySelectedItems('edit');
    }

    public removeElement = () => {
      this.verifySelectedItems('remove');
    }

    public searchElement = (event:any) => {
      
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

    public clearSearch = () => {
           
      if(this.searchInputElement){
        this.searchInputElement.nativeElement.value = "";
        this.searchInputElement.nativeElement.blur();
        this.elementFiltredList = this.elementList;
      }
             
    }

    private verifySelectedItems = (type:string) => {
      
      if(!this.selectedItemList.length)
      {
        this.messageSent.next({type:"warning", messageSent : `${PageListMessages.selectAtLeastOneItem}`});
      }
      else
      {
        switch(type) 
        { 
          
          case 'edit': 
          { 
            if(this.selectedItemList.length > 1)
            {
              this.messageSent.next({type:"warning", messageSent : `${PageListMessages.onlyOneItemUpdatePermited}`});
              break;
            }
            else
            {
              this.editElementEvent.emit(); break;
            }
          }
          
          case 'remove': { this.removeElementEvent.emit(); break; } 
          
          default: { break; } 
        } 
        
      }

    }


}

