import { WaiterModel } from './../models/TableModel';
import { Injectable,  } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Guid } from "guid-typescript";





@Injectable()
export class HomeApi {
    
  public apiUrl = `https://localhost:5101/Home`;

  constructor(private http:HttpClient){}
  

  public getWaiters():Observable<Array<WaiterModel>>{
 
    return this.http.get(this.apiUrl+"/GetAllWaiters").pipe(map ( (element) => element as Array<WaiterModel>));
 
  }

  
   


}
