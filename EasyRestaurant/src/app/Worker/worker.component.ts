import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';

import { PageListMessages } from '../Shared/Components/er-page-list/Enum/PageListMessages';
import { IErSnackBar } from '../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { IErLeftSideMenu } from '../Shared/Components/er-left-side-menu/interface/er-left-side.interface';
import { Functions, WorkerFlatModel, WorkerModel } from './models/Worker.model';
import { WorkerApi } from './api/worker-api';
import { WorkerCreateDialog } from './worker-create-dialog/worker-create-dialog.component';
import { FunctionModel } from '../Function/Model/FunctionModel';
import { WorkerDetailDialog } from './worker-detail-dialog/worker-detail-dialog.component';

@Component({
  selector: 'worker',
  templateUrl: 'worker.component.html',
  styleUrls: ['worker.component.scss']
})
export class WorkerComponent implements OnInit, IErSnackBar, IErLeftSideMenu {


  public elementList : Array<WorkerFlatModel> = [];
  public selectedItemList : Array<string> = [];
  public clearListOfSelectedItems:Subject<any> = new Subject();
  public messageSent:Subject<any> = new Subject();



  constructor(
    private workerApi:WorkerApi,
    public dialog: MatDialog
    ){}

  ngOnInit(): void {
      this.getWorkers();
  }

  public getWorkers = () => {
        this.workerApi.getWorkers().subscribe((response:Array<WorkerFlatModel>) =>{
        this.elementList = this.sortListByName(response);
     });
  }

  public addElementEvent = () =>{

    this.workerApi.getFunctions().subscribe((result:Array<FunctionModel>)=>{

      let newDatafunctionlist = new Functions(result) ;

      const dialogRef = this.dialog.open(WorkerCreateDialog, {
        height: '700px',
        width: '900px',
        data: {
          functionList: newDatafunctionlist,
          typeOfDialog: 'create'
        }
      });

      dialogRef.afterClosed().subscribe( (element:any) => {
        if(element)
        {
          if(element.responseType === 'save')
          {
            this.workerApi.createWorker(element.response).subscribe(
              result => {
                console.log(result)
                this.getWorkers();
                this.messageSent.next({type:"valid", messageSent : `${PageListMessages.workerCreatedSucessfull}`});
                this.clearListOfSelectedItems.next();
              },
              erro => {
                  console.log(erro);
              }
            );
          }
        }

      });

    });
  }

  public editElementEvent = () => {


    let workerFlatData : WorkerFlatModel =  this.elementList.filter( (element )=>{
      if(element.id===this.selectedItemList[0])
      {
        element.name = element.name.trim();
      }
      return element.id===this.selectedItemList[0];
    })[0];

    this.workerApi.getFunctions().subscribe((result:Array<FunctionModel>)=>{

          let newDatafunctionlist = new Functions(result) ;

          const dialogRef = this.dialog.open(WorkerCreateDialog, {
            height: '700px',
            width: '900px',
            data: {
              functionList: newDatafunctionlist,
              typeOfDialog: 'edit',
              workerFlat: workerFlatData
            }
          });

          dialogRef.afterClosed().subscribe( (element:any) => {
            if(element)
            {
              if(element.responseType === 'update')
              {
                this.workerApi.updateWorker(element.response).subscribe(
                  result => {
                    console.log(result)
                    this.getWorkers();
                    this.messageSent.next({type:"valid", messageSent : `${PageListMessages.workerUpdatedSucessfull}`});
                    this.clearListOfSelectedItems.next();
                  },
                  erro => {
                      console.log(erro);
                  }
                );
              }
            }
          });
      });
  }

  public removeElementEvent = () => {

    if(this.selectedItemList.length > 0)
    {
      if(this.selectedItemList.length === 1)
      {
        let id:string=this.selectedItemList[0];
        this.workerApi.deleteWorker(id)
          .subscribe(
            result => {
              console.log(result)
              this.getWorkers();
              this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemRemoved}`});
              this.clearListOfSelectedItems.next();
            },
            erro => {
                console.log(erro);
            }
          );
      }else{
        this.workerApi.deleteMultiplesWorkers(this.selectedItemList)
        .subscribe(
          result => {
            console.log(result)
            this.getWorkers();
            this.messageSent.next({type:"valid", messageSent : `${this.selectedItemList.length}${PageListMessages.itemsRemoved}`});
            this.clearListOfSelectedItems.next();
          },
          erro => {
              console.log(erro);
          }
        );
      }
    }
    else{
      this.messageSent.next({type:"warning", messageSent : `${PageListMessages.selectAtLeastOneItem}`});
    }
  }

  public detailElementEvent = () => {
    let workerFlatData : WorkerFlatModel =  this.elementList.filter( (element )=>{
      if(element.id===this.selectedItemList[0])
      {
        element.name = element.name.trim();
      }
      return element.id===this.selectedItemList[0];
    })[0];
    console.log(workerFlatData);

    const dialogRef = this.dialog.open(WorkerDetailDialog, {
      height: '700px',
      width: '900px',
      data: {
        typeOfDialog: 'detail',
        workerFlat: workerFlatData
      }
    });
  }

  public selectedItemListEvent = (listOfSelectedItems:any) => {
    this.selectedItemList=listOfSelectedItems;
  }

  private sortListByName = (list:Array<WorkerFlatModel>):Array<WorkerFlatModel> =>{

    return list.sort((a,b)=>{
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

}

