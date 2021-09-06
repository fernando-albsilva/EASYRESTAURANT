import { FunctionModel } from 'src/app/Function/Model/FunctionModel';
export class WorkerModel{
    
    public worker_Id : string = "";
    public name : string = "";
    public cpf : string = "";
    public phone_Number : string = "";
    public address : string = "";
    public email : string = "";
    public function : FunctionModel = new FunctionModel();   

}

export class WorkerFlatModel{
    
    public worker_Id : string = "";
    public name : string = "";
    public cpf : string = "";
    public phone_Number : string = "";
    public address : string = "";
    public email : string = "";
    public type : string = "";   


}


export class Functions {
    public functionList : Array<FunctionModel> = [];

    constructor (list : Array<FunctionModel>)
    {
        this.functionList = list;
    }

}