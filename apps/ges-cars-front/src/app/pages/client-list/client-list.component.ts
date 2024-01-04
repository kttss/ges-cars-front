import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AlertService } from '../../services/alert.service';
import { ClientService } from '../../services/client.service';
import { RoleEnum } from '../../shared/enums/role.enum';
import { IDataSource } from '../../shared/models/table.model';
import { CurrentRole } from '../../shared/utils/user';
import { IPaginate } from '../../shared/components/table/table.component';

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
      delete: CurrentRole() === RoleEnum.Admin,
      detail: true,
      create: true,
    },
    columns: [
      { key: 'id', title: '#', orderKey: 'id' },
      { key: 'lastname', title: 'Nom', orderKey: 'lastname' },
      { key: 'firstname', title: 'Prenom', orderKey: 'firstname' },
      {
        key: 'birthday',
        title: 'Date naissance',
        type: 'date',
        orderKey: 'birthday',
      },
      {
        key: 'lieuNaissance',
        title: 'Lieu naissance',
        orderKey: 'lieuNaissance',
      },
      { key: 'adresse', title: 'Adresse', orderKey: 'adresse' },
      { key: 'telephone', title: 'Telephone', orderKey: 'telephone' },
      { key: 'cin', title: 'CIN', orderKey: 'cin' },
      { key: 'villeCin', title: 'Ville cin', orderKey: 'villeCin' },
      { key: 'datePermis', title: 'Date permis', orderKey: 'datePermis' },
      { key: 'villePermis', title: 'Ville permis', orderKey: 'villePermis' },
    ],
    rows: [],
  };

  paginate: IPaginate = {
    page: 0,
    count: 10,
    search: '',
    order: 'DESC',
    orderBy: '',
    total: 100,
  };

  constructor(
    private clientService: ClientService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.onChangePaginate(this.paginate);
  }

  onChangePaginate(event: IPaginate) {
    this.paginate = event;
    const { page, count, orderBy, order, search } = this.paginate;
    this.clientService
      .getAllWithPaginate(page, count, search, orderBy, order)
      .subscribe((res: any) => {
        this.paginate.total = res.count;
        this.paginate = { ...this.paginate, total: res.count };

        this.data.rows = res.rows.map((item: any) => {
          return {
            ...item,
            datePermis: moment(item.datePermis).format('DD/MM/yyyy'),
            birthday: moment(item.birthday).format('DD/MM/yyyy'),
          };
        });
      });
  }

  openDetail(client: any) {
    this.router.navigate(['/client/detail/' + client.id]);
  }

  openEdit(client: any) {
    this.router.navigate(['/client/edit/' + client.id]);
  }

  ondelete(client: any) {
    this.alert.handleDelete().then((result) => {
      if (result.value) {
        this.clientService.delete(client.id).subscribe((res: any) => {
          this.alert.handleSucces();
          this.ngOnInit();
        });
      }
    });
  }

  onCreateReservation(client: any) {
    this.router.navigate(['/reservation/new'], {
      queryParams: { client: client.id },
    });
  }
}
