import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login-component.html',
  styleUrls: ['login-component.scss']
})
export class LoginComponent {

  constructor (private router: Router) {}

  // navigateToHomePage()
  // {
  //   this.router.navigate(['page-home']);
  // }
}
