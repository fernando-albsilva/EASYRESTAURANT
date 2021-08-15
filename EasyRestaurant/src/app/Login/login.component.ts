import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  public formlogin:FormGroup;
  public userNameInput:string="";
  public passwordInput:string="";
  

  constructor (public fb:FormBuilder,
               private router: Router) {
                this.formlogin = this.fb.group({
                  userName:["",Validators.required],
                  password:["",Validators.required]
               }) 
               }

  ngOnInit(): void {
    
  }

  public executeLogin = () => {
    
   
    if(this.userNameInput === 'fernando' && this.passwordInput === '200790')
    {
      this.router.navigate(['/home']);
    }
  }

  public print = () => {
   
  }

}
