import { Injectable,  } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Guid } from "guid-typescript";

import { ProductModel } from "../models/Product.model";



@Injectable()
export class ProductApi {
    
  public apiUrl = `https://localhost:5101/Products`;

  constructor(private http:HttpClient){}
  
  public getProducts():Observable<Array<ProductModel>>{
 
    return this.http.get(this.apiUrl+"/GetAll").pipe(map ( (element) => element as Array<ProductModel>));
 
  }

  public createProduct = (cmd: ProductModel):Observable<any> => {
     
    // cmd.id=Guid.create()+"";
    // return  this.http.post<any>(`${ this.apiUrl }/Create`, cmd);
        //  .subscribe(
        //    resultado => {
        //      console.log(resultado)
        //    },
        //    erro => {
        //        console.log(erro);
        //    }
        //  );  
        // for (let index = 0; index < 5; index++) {
        //   cmd.id=Guid.create()+"";
        //   cmd.name = index+"";
        //   this.http.post<any>(`${ this.apiUrl }/Create`, cmd);
        // }
        cmd.id=Guid.create()+"";
        return  this.http.post(`${ this.apiUrl }/Create`, cmd);
       
          
  }

  public updateProduct = (cmd: ProductModel):Observable<any> => {
     
    return this.http.put<any>(`${ this.apiUrl }/Update`, cmd);
  }

  public deleteProduct = (id:string):Observable<any> => {
    
    let params = new HttpParams();
    params = params.append('Id',id);

    return this.http.delete<any>(`${ this.apiUrl }/Delete`, { params : params});         
  }

  public deleteMultiplesProducts = (idList:Array<string>):Observable<any> => {
    
    return this.http.post<any>(`${ this.apiUrl }/DeleteByList`, idList);
  
  }
   


}
