import { ProductForTableList, TableStartTime, WaiterModel } from "../models/TableModel";

export class InvoiceCommand {

  public id:string = "";
  public table?: TableCommand;

  constructor (tableCommand : TableCommand){
    this.table = tableCommand;
  }

}

export class TableCommand {
  public clientName: string = "";
  public waiterId: string = "";
  public products: Array<ProductForTableList> = [];

  constructor (clientName:string,waiterId:string,products:Array<ProductForTableList>) {
    this.clientName = clientName;
    this.waiterId = waiterId;
    this.products = products;
  }
}
