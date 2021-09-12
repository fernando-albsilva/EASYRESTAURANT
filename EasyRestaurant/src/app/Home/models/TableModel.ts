import { ProductModel } from './../../Product/models/Product.model';
export class TableModel {
      public id:number = 0;
      public isOccupy:boolean = false;
      public products: Array<ProductModel> = [];
}