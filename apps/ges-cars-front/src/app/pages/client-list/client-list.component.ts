import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { ClientService } from '../../services/client.service';
import { IDataSource } from '../../shared/models/table.model';

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

  data: IDataSource = {
    mode: {
      edit: true,
      delete: true,
      detail: true,
    },
    columns: [
      { key: 'id', title: '#' },
      { key: 'lastname', title: 'Nom' },
      { key: 'firstname', title: 'Prenom' },
      { key: 'birthday', title: 'Date naissance' },
      { key: 'lieuNaissance', title: 'Lieu naissance' },
      { key: 'adresse', title: 'Adresse' },
      { key: 'telephone', title: 'Telephone' },
      { key: 'cin', title: 'CIN' },
      { key: 'villeCin', title: 'Ville cin' },
      { key: 'datePermis', title: 'Date permis' },
      { key: 'villePermis', title: 'Ville permis' },
    ],
    rows: [],
  };

  constructor(
    private clientService: ClientService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe((res: any) => {
      this.data.rows = res;
    });
  }

  openDetail(client: any) {
    this.router.navigate(['/client/detail/' + client.id]);
  }

  openEdit(client: any) {
    this.router.navigate(['/client/edit/' + client.id]);
  }

  ondelete(car: any) {
    this.alert.handleDelete().then((result) => {
      if (result.value) {
        this.clientService.delete(car.id).subscribe((res: any) => {
          this.alert.handleSucces();
          this.ngOnInit();
        });
      }
    });
  }
}
