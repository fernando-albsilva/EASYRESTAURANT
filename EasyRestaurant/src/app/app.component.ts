import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EasyRestaurant';

  

  constructor () {}

  ngOnInit(): void {
   
  }



//TODO salvar comando -> ng serve --proxy-config proxy.config.js -o

}
