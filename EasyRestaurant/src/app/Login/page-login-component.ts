import { PageRouterService } from './../Service/page-router-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'page-login',
  templateUrl: 'page-login-component.html',
  styleUrls: ['page-login-component.scss']
})
export class PageLoginComponent {

  constructor (private pageRouterService:PageRouterService) {}

  chamaQuandoClica()
  {
    this.pageRouterService.chamaHomePage()
  }
}
