import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { WorkerFlatModel } from './../../../../../Worker/models/Worker.model';


@Component({
  selector: 'worker-card-list',
  templateUrl: 'worker-card-list.component.html',
  styleUrls: ['worker-card-list.component.scss']
})
export class WorkerCardListComponent implements OnInit {

    @Output() public itemSelected = new EventEmitter();
    
    @Input() public worker: WorkerFlatModel = new WorkerFlatModel();
    @Input() changeClass : Subject<string>= new Subject();
   
    public isSelected:boolean=false;

    public worker_id : string = "";
    public name : string = "";
    public cpf : string = "";
    public phone_number : string = "";
    public adress : string = "";
    public email : string = "";
    public type : string = "";


    constructor (){
      
     
    }

    ngOnInit(): void {
      
     this.worker_id = this.worker.worker_Id.toString();
     this.name = this.worker.name;
     this.cpf = this.worker.cpf;
     this.phone_number = this.worker.phone_Number;
     this.adress = this.worker.address;
     this.email = this.worker.email;
     this.type = this.worker.type;
    

      this.changeClass.subscribe( element =>{
        this.changeClassSelected(element);
      });
    }

    public sendItemId(id:string){
      this.itemSelected.emit(id);
    }

   
    public changeClassSelected = (id:string) => {
      if(this.worker_id === id && this.isSelected === true)
      {
        this.isSelected = false;
      }else{

        if(this.worker_id === id && this.isSelected === false)
        {
          this.isSelected=true;
        }
      }
    }

}