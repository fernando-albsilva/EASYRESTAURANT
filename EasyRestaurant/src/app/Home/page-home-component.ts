import { Component } from '@angular/core';
import { PageRouterService } from '../Service/page-router-service.service';

@Component({
  selector: 'page-home',
  templateUrl: 'page-home-component.html',
  styleUrls: ['page-home-component.scss']
})
export class PageHomeComponent {

  constructor(private pageRouterService: PageRouterService){}

  chamaLoginPage() {
    this.pageRouterService.chamaLoginPage();
    
  }
}
