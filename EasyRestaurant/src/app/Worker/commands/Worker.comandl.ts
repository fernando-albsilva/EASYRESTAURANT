export class WorkerCommand{
    
    public id:string="";
    public name:string="";
    public unitValue:number=0;
    public cost:number=0;

}

export class WorkerDeleteCommand{
    
    public id:string="";

}

export class WorkerProductListCommand{
    
    public id: Array<string>  = [];

}
