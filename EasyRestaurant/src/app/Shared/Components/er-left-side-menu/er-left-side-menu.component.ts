import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'er-left-side-menu',
  templateUrl: 'er-left-side-menu.component.html',
  styleUrls: ['er-left-side-menu.component.scss']
})
export class ErLeftSideMenu {

  @Output() addElement = new EventEmitter<any>();
  @Output() editElement = new EventEmitter<any>();
  // @Output() searchElement = new EventEmitter<any>();
  @Output() removeElement = new EventEmitter<any>();

  constructor () {}

  public callFatherAddElement(){
    this.addElement.emit();
  }

  public callFatherEditElement(){
    this.editElement.emit();
  }

  // public callFatherSearchElement(){
  //   this.searchElement.emit();
  // }

  public callFatherRemoveElement(){
    this.removeElement.emit();
  }
}
