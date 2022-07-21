import { Component, OnInit } from '@angular/core';
import { AgenceService } from '../../services/agence.service';
import { IDataSource } from '../../shared/models/table.model';

@Component({
  selector: 'ges-cars-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  data: IDataSource = {
    mode: {
      edit: false,
      delete: false,
      detail: false,
    },
    columns: [
      { key: 'id', title: '#' },
      { key: 'createAt', title: 'Date' },
      { key: 'value', title: 'Value' },
    ],
    rows: [],
  };
  constructor(private ageceService: AgenceService) {}

  ngOnInit(): void {
    this.ageceService.getAllLogs().subscribe((data: any) => {
      this.data.rows = data;
    });
  }
}
