import { ProductModel } from './../../Product/models/Product.model';
export class TableModel {
      public id: number = 0;
      public isOccupy:boolean = false;
      public clientName: string = "";
      public waiter: WaiterModel = new WaiterModel();
      public products: Array<ProductForTableList> = [];
}

export class WaiterModel {
      public workerId: string = "";
      public name: string = "";
}

export class ProductForTableList{
  public id: string = "";
  public name: string = "";
  public unitValue: number = 0;
  public cost: number = 0;
  public quantity: number = 0;

  set(id:string = "", name:string = "", unitValue:number = 0, cost:number = 0, quantity:number = 0){
    this.id= id;
    this.name = name;
    this.unitValue = unitValue;
    this.cost = cost;
  }
}


export class TableStartTime {
  public hour: number = 0;
  public min: number = 0;
  public sec: number = 0;
}
