import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { FunctionModel } from './../Model/FunctionModel';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Guid } from "guid-typescript";



@Injectable()
export class FunctionApi {
    
    public apiUrl = `https://localhost:5101/Functions`;

    constructor(private http:HttpClient){}
    
    public getFunctions():Array<FunctionModel>{
        let functionList : Array<FunctionModel> = [];

        this.http.get(this.apiUrl+"/GetAll")
        .subscribe((items:any) => {

            let functionModel = new FunctionModel();
            items.map( (item:any)=>{
              functionModel.id = item.id;
              functionModel.type = item.type;
              functionList.push(functionModel);
              functionModel = new FunctionModel();
            });
        });
        return functionList;
    }

    public createFunction(cmd: FunctionModel){
       
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

     public deleteFunction(id:string):Observable<any>{
        
        //TODO resolver problema do endPoint e fazer a requisicao delete
        // return this.http.delete(this.apiUrl+"Delete");
        return this.http.post(this.apiUrl+"Delete",id);

    
    }


}