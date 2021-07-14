import { Component, OnInit } from '@angular/core';
import { PageRouterService } from './Service/page-router-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EasyRestaurant';

  public pageLogin : boolean = true ;
  public pageHome : boolean = false;
  

  constructor (private pageRouterService : PageRouterService) {}

  ngOnInit(): void {
    this.pageRouterService.pageHome.subscribe((teste : string)=>{
      this.trocaPageHome(teste);
    });
    this.pageRouterService.pageLogin.subscribe((teste : string) => {
      this.trocaPageLogin(teste);
    })
  }

  trocaPageHome(teste:string){
    if(teste === "true"){
      this.pageHome=true;
      this.pageLogin=false;
    }
  }

  trocaPageLogin(teste: string) {

    if(teste === "true") {

      this.pageHome=false;
      this.pageLogin=true;
    }

  }

//TODO salvar comando -> ng serve --proxy-config proxy.config.js -o

}
