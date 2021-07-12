import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-home',
  templateUrl: 'page-home-component.html',
  styleUrls: ['page-home-component.scss']
})
export class PageHomeComponent {

  constructor(private router: Router) {}

  navigateToLoginPage()
  {
    this.router.navigate(['']);
  }

}
