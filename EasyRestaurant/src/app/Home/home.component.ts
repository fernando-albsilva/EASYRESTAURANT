import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableEditingDialogComponent } from './components/table-editing-dialog/table-editing-dialog.component';
import { Subject } from 'rxjs';
import { IErSnackBar } from '../Shared/Components/er-snack-bar/Interface/IErSnackBar';
import { TableModel } from './models/TableModel';
import { MatDialog } from '@angular/material/dialog';
import { ErMessages } from '../services/er-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, IErSnackBar {

  //TableRelated
  @ViewChild('searchTableByNumberInputField') searchTableByNumberInputField: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('searchTableClienteNameInputField') searchTableClienteNameInputField: ElementRef<HTMLInputElement> | undefined;


  public optionDisplayTableCommandContent: string = "table";
  public maxTablesAvailable:number = 50;
  public tableSelectOptions:Array<number> = [];
  public listOfTable:Array<TableModel> = [];
  public listOfSelectedTables:Array<number> = [];

  //CommandsRelated


  //erSanckBar
  public messageSent: Subject<any> = new Subject<any>();

  constructor(
    private erMessages: ErMessages,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fillTotalTables();
  }

  public changeDisplayTableCommand = (option:string) => {
    this.optionDisplayTableCommandContent = option;
  }

  //Related Table functions
  public refreshTableListBySelectedNumber = (totalNumberOfTables:number) => {
    if(this.listOfSelectedTables.length === 0)
    {
      this.listOfTable = [];
      for (let index = 1; index <= totalNumberOfTables; index++) {
        let table = new TableModel()
        table.id=index;
        this.listOfTable.push(table);
      }
    }
    else
    {
      //TODO
      // implementar funcionalidade para nao permitir apagar uma mesa ativa ou selecionada
      this.messageSent.next({type:"warning", messageSent : `${this.erMessages.canNotChangeTotalTableIfHasAnySelectedOrActive}`});
    }
  }

  public filterTableByNumberChange = () => {
    if(!!this.searchTableByNumberInputField)
    {
      let inputText = this.searchTableByNumberInputField.nativeElement.value;
      this.searchTableByNumberInputField.nativeElement.value = inputText.replace(/\D/g, '');
    }
  }

  public filterTableByClientNameChange = () => {
    if(!!this.searchTableClienteNameInputField)
    {
      let inputText = this.searchTableClienteNameInputField.nativeElement.value;
      this.searchTableClienteNameInputField.nativeElement.value = inputText.replace(/[^a-zA-Z]+/g, '');
    }
  }

  private fillTotalTables = () => {
    this.tableSelectOptions = [];
    for (let index = 1; index <= this.maxTablesAvailable; index++) {
      this.tableSelectOptions.push(index);
      let table = new TableModel()
      table.id=index;
      this.listOfTable.push(table);
    }
  }

  public clearTableSearchInout = (inputName:string) => {
    if(inputName === "searchTableByNumberInputField" && this.searchTableByNumberInputField)
    {
      this.searchTableByNumberInputField.nativeElement.value = "";
      this.searchTableByNumberInputField.nativeElement.blur();
    }
    if(inputName === "searchTableClienteNameInputField" && this.searchTableClienteNameInputField)
    {
      this.searchTableClienteNameInputField.nativeElement.value = "";
      this.searchTableClienteNameInputField.nativeElement.blur();
    }
  }

  public selectThisTable = (tableId: number) => {
    let teste = this.listOfSelectedTables.find((element) => element === tableId);
    if(teste === undefined)
    {
      this.listOfSelectedTables.push(tableId);
    }
    else
    {
      this.listOfSelectedTables = this.listOfSelectedTables.filter((element)=>{
        if (element === tableId)
        {
          return false;
        }
        else
        {
          return true;
        }
      });
    }
    // console.log(this.listOfSelectedTables);
  }

  public isTableSelected = (tableId: number):boolean => {

    let isSelected : boolean = false;
    this.listOfSelectedTables.forEach( element => {
      if(element === tableId)
      {
        isSelected = true;
      }
    })

    return isSelected;
  }

  public editTable = () => {

    if(this.listOfSelectedTables.length === 0)
    {
      this.messageSent.next({type:"warning", messageSent : `${this.erMessages.oneItemMustBeSelected}`});
      return false;
    }

    if(this.listOfSelectedTables.length > 1)
    {
      this.messageSent.next({type:"warning", messageSent : `${this.erMessages.onlyOneItemMustBeSelectedToEdit}`});
      return false;
    }

    if(this.listOfSelectedTables.length === 1)
    {
      this.openTableEditDialog();
    }

    return false;
  }

  public openTableEditDialog = () => {
    let table : TableModel =  this.listOfTable.filter( element =>{
        if(element.id === this.listOfSelectedTables[0])
        {
          return true;
        }
        else
        {
          return false;
        }
    })[0];

    const dialogRef = this.dialog.open(TableEditingDialogComponent, {
      height: '90vh',
      width:'100vw',
      data: {
        id: table.id,
        isOccupy: table.isOccupy,
        clientName: table.clientName,
        waiter: table.waiter,
        products: table.products,
        startTime: table.startTime
      }
    });

    dialogRef.afterClosed().subscribe( (dataReceived:any) => {
      if(dataReceived.closeType === 'normal')
      {
        this.handleDefaultTableUpdatesJobs(dataReceived.table);
      }
      else
      {
        if(dataReceived.closeType === 'finishTable')
        {
            //TODO implementar como vai ser a sequencia de uma finalização de mesa
        }
        else
        {
          if(dataReceived.closeType === 'cancelTable')
          {
            this.handleCancelTableUpdateJobs(dataReceived.table);
          }
        }
      }
     });
  }

  private handleDefaultTableUpdatesJobs = (tableReturned:TableModel) => {
    if(tableReturned.isOccupy) {
      this.pushEditedTableInList(tableReturned)
    }else{
      this.clearTableReturned(tableReturned.id);
    }
  }

  private handleCancelTableUpdateJobs = (tableReturned:TableModel) => {
    this.clearTableReturned(tableReturned.id);
  }

  private pushEditedTableInList = (editedTable:TableModel) =>{
    this.listOfTable = this.listOfTable.map( (table) => {
      if(table.id === editedTable.id)
      {
        table = editedTable;
        console.log(`Preencheu mesa : ${table.id}`);
       }
       return table;
     });
  }

  private clearTableReturned = (editedTableid:number) => {
    this.listOfTable = this.listOfTable.map( (table) => {
      if(table.id === editedTableid)
      {
        table = new TableModel();
        table.id = editedTableid;
        console.log(`Limpou mesa mesa : ${table.id}`);
       }
       return table;
     });
  }
  // End //Related Table functions
}
