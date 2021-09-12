import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';


@Component({
  selector: 'er-left-side-menu',
  templateUrl: 'er-left-side-menu.component.html',
  styleUrls: ['er-left-side-menu.component.scss']
})
export class ErLeftSideMenu implements OnInit {

  @Input() buttonsList: Array<string> = [];

  @Output() addElement = new EventEmitter<any>();
  @Output() editElement = new EventEmitter<any>();
  @Output() removeElement = new EventEmitter<any>();
  @Output() detailElement = new EventEmitter<any>();

  public buttonAdd:boolean = false;
  public buttonEdit:boolean = false;
  public buttonRemove:boolean = false;
  public buttonDetail:boolean = false;

  constructor () {}

  ngOnInit(): void {
    this.buttonsList.map( (element) =>{
      this.buttonExibition(element);
    })
  }

  public callFatherAddElement = () => {
    this.addElement.emit();
  }

  public callFatherEditElement = () => {
    this.editElement.emit();
  }

  public callFatherRemoveElement = () => {
    this.removeElement.emit();
  }
  
  public callFatherDetailElement = () => {
    this.detailElement.emit();
  }

  public buttonExibition = (element:string) => {
    
    switch (element) {
      
      case "add":
        this.buttonAdd = true;        
        break;
    
      case "edit":
        this.buttonEdit = true;        
        break;
    
      case "remove":
        this.buttonRemove = true;        
        break;

      case "detail":
        this.buttonDetail = true;        
        break;
      
      default:
        break;
    }
  }
}
