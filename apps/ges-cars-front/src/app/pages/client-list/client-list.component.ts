import { Component, OnInit } from '@angular/core';

declare let $: any;
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
declare interface TableWithCheckboxes {
  id?: number;
  ischecked?: boolean;
  product_name: string;
  type: string;
  quantity: number;
  price: any;
  amount: string;
}
export interface TableData2 {
  headerRow: string[];
  dataRows: TableWithCheckboxes[];
}
@Component({
  selector: 'ges-cars-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  public tableData1: TableData = {
    headerRow: ['#', 'Name', 'Job Position', 'Since', 'Salary', 'Actions'],
    dataRows: [
      ['1', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
      ['2', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
      ['3', 'Alex Mike', 'Design', '2010', '92,144', 'btn-link'],
      ['4', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
      ['5', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
