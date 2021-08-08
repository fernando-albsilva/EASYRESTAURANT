import { Subject } from "rxjs";

export interface IerLeftSideMenu {

      selectedItemList : Array<string>;
      classSelected:Subject<string>;
      
      addElementEvent():any;
        
      editElementEvent():any;
        
      removeElementEvent():any;
      
      selectedItemListEvent(listOfSelectedItems:any):any;
}