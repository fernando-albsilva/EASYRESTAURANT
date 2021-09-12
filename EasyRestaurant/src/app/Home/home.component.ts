import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableModel } from './models/TableModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('searchTableByNumberInputField') searchTableByNumberInputField: ElementRef<HTMLInputElement> | undefined;  
  @ViewChild('searchTableClienteNameInputField') searchTableClienteNameInputField: ElementRef<HTMLInputElement> | undefined;  
  
  public optionDisplayTableCommandContent: string = "table";

  //TableRelated
  public maxTablesAvailable:number = 50;
  public tableSelectOptions:Array<number> = [];
  public listOfTable:Array<TableModel> = [];

  //CommandsRelated
  
  constructor() { }

  ngOnInit(): void {
    this.fillTotalTables();
  }

  public changeDisplayTableCommand = (option:string) => {
    this.optionDisplayTableCommandContent = option;
  }

  //Related Table functions
  public refreshTableListBySelectedNumber = (totalNumberOfTables:number) => {
    this.listOfTable = [];
    for (let index = 1; index <= totalNumberOfTables; index++) {
      let table = new TableModel()
      table.id=index;
      this.listOfTable.push(table);  
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

  // End //Related Table functions
}
