import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { FunctionModel } from 'src/app/Function/Model/FunctionModel';

@Component({
  selector: 'function-card-list',
  templateUrl: 'function-card-list-component.html',
  styleUrls: ['function-card-list-component.scss']
})
export class FunctionCardListComponent implements OnInit {

    @Input() public function: FunctionModel = new FunctionModel();
    @Output() public itemSelected = new EventEmitter();
    @Input() changeClass : Subject<string>= new Subject();
   
    
    public functionId:string = "";
    public functionType:string = "";

    public isSelected:boolean=false;


    constructor (){
      
    }

    ngOnInit(): void {
      if(this.function.type !== "")
      {
        this.functionId = this.function.id;
        this.functionType = this.function.type;
      }

      this.changeClass.subscribe( element =>{
        this.changeClassSelected(element);
      });
    }

    public sendItemId(id:string){
      this.itemSelected.emit(id);
    }

   
    public changeClassSelected(id:string){
      if(this.functionId === id && this.isSelected === true)
      {
        this.isSelected = false;
      }else{

        if(this.functionId === id && this.isSelected === false)
        {
          this.isSelected=true;
        }
      }
    }

}