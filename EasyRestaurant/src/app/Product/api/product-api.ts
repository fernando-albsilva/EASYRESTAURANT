import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class ProductApi{
    
public apiUrl = `https://localhost:5101/Products/GetAll`;

constructor(private http:HttpClient){
    
}

getProducts(){
    
    this.http.get(this.apiUrl)
    .subscribe(resultado => console.log(resultado));

}


}