import { PageRouterService } from './../Service/page-router-service.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-login',
  templateUrl: 'page-login-component.html',
  styleUrls: ['page-login-component.scss']
})
export class PageLoginComponent {

  constructor (private pageRouterService:PageRouterService,
    private router: Router) {}

  navigateToHomePage()
  {
    this.router.navigate(['page-home']);
  }
}
