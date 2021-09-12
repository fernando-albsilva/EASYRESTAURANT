import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableNumber:number = 0;
  @Input() isTableOccupy:boolean = false;
  @Input() isTableSelected:boolean = false;


  constructor() { }

  ngOnInit(): void {
   
  }

  
}
