import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ges-cars-front-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  data = {
    mode: {
      edit: false,
      delete: true,
      detail: true,
    },
    columns: [
      { key: 'id', title: '#' },
      { key: 'name', title: 'name' },
      { key: 'job', title: 'Job' },
      { key: 'salary', title: 'Salary' },
    ],
    rows: [
      {
        id: 1,
        name: 'Andrew Mike',
        job: 'Design',
        salary: '62773',
      },
      {
        id: 2,
        name: 'Andrew Mike',
        job: 'Design',
        salary: '62773',
      },
      {
        id: 3,
        name: 'Andrew Mike',
        job: 'Design',
        salary: '62773',
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
