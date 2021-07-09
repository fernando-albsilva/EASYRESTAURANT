import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageRouterService {

  pageHome  = new EventEmitter<any>();
 

  constructor() { }

  chamaHomePage(){
   this.pageHome.emit("true");
   
  }
}
