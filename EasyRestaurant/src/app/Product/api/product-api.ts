import { DeleteProductListCommand } from './../commands/Product.comandl';
import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductModel } from "../models/Product.model";
import { Guid } from "guid-typescript";



@Injectable()
export class ProductApi {
    
    public apiUrl = `https://localhost:5101/Products`;

    constructor(private http:HttpClient){}
    
    public getProducts():Observable<Array<ProductModel>>{
        let productList : Array<ProductModel> = [];

        return this.http.get(this.apiUrl+"/GetAll").pipe(map ( (element) => element as Array<ProductModel>));
             
        // return productList;
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
