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

    public createProduct = (cmd: ProductModel) => {
       
           cmd.id=Guid.create()+"";
           this.http.post(`${ this.apiUrl }/Create`, cmd)
           .subscribe(
             resultado => {
               console.log(resultado)
             },
             erro => {
                 console.log(erro);
             }
           );  
            
    }

    public updateProduct = (cmd: ProductModel) => {
       
      // cmd.id=Guid.create()+"";
      this.http.put(`${ this.apiUrl }/Update`, cmd)
      .subscribe(
        resultado => {
          console.log(resultado)
        },
        erro => {
            console.log(erro); 
        }
      );    
}

     public deleteProduct = (id:string):Observable<any> => {
      
        let params = new HttpParams();
        params = params.append('Id',id);

       return this.http.delete(`${ this.apiUrl }/Delete`, { params : params});
        // .subscribe(
        //   resultado => {
        //     console.log(resultado)
        //     return true;
        //   },
        //   erro => {
        //       console.log(erro);
        //       return false;
        //   }
        // );     
        
        
    }


    //TODO retornar um observable igual ao metodo deleteProduct
    public deleteMultiplesProducts = (idList:Array<string>) => {
      
      this.http.post(`${ this.apiUrl }/DeleteByList`, idList)
      .subscribe(
        resultado => {
          console.log(resultado)
        },
        erro => {
            console.log(erro);
        }
      );     
  }
   


}
