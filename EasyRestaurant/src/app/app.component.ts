import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EasyRestaurant';

  

  constructor (private matIconRegistry: MatIconRegistry,
               private domSanitizer: DomSanitizer) {
                this.matIconRegistry.addSvgIcon(
                  "simple-table-icon",
                  this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/simple-table-icon.svg")
                );
               }

  ngOnInit(): void {
  
  }



//TODO salvar comando -> ng serve --proxy-config proxy.config.js -o

}
