import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductModel } from "../models/Product.model";
import { Guid } from "guid-typescript";



@Injectable()
export class ProductApi {
    
    public apiUrl = `https://localhost:5101/Product`;

    constructor(private http:HttpClient){}
    
    public getProducts():Array<ProductModel>{
        let productList : Array<ProductModel> = [];

        this.http.get(this.apiUrl+"/GetAll")
        .subscribe((items:any) => {

            let productModel = new ProductModel();
            items.map( (item:any)=>{
                productModel.id = item.id;
                productModel.name = item.name;
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
               if(erro.status == 400) {
                 console.log(erro);
               }
             }
           );    
    }

     public deleteProduct(id:string):Observable<any>{
        
        //TODO resolver problema do endPoint e fazer a requisicao delete
        // return this.http.delete(this.apiUrl+"Delete");
        return this.http.post(this.apiUrl+"Delete",id);

    
    }


}