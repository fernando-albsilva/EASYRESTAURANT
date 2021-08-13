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
    
    public getProducts():Array<ProductModel>{
        let productList : Array<ProductModel> = [];

        this.http.get(this.apiUrl+"/GetAll")
        .subscribe((items:any) => {

            let productModel = new ProductModel();
            items.map( (item:any)=>{
                productModel.id = item.id;
                productModel.name = item.name.trim();
                productModel.unitValue = item.unitValue;
                productModel.cost = item.cost;
                productList.push(productModel);
                productModel = new ProductModel();
            });
        });
        return productList;
    }

    public createProduct(cmd: ProductModel){
       
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

    public updateProduct(cmd: ProductModel){
       
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

     public deleteProduct(id:string){
      
        let params = new HttpParams();
        params = params.append('Id',id);

        this.http.delete(`${ this.apiUrl }/Delete`, { params : params})
        .subscribe(
          resultado => {
            console.log(resultado)
          },
          erro => {
              console.log(erro);
          }
        );        
    }

    public deleteMultiplesProducts(idList:Array<string>){
      
      
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
