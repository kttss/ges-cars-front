import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AlertService } from '../../services/alert.service';
import { ReservationService } from '../../services/reservation.service';
import { RoleEnum } from '../../shared/enums/role.enum';
import { IDataSource } from '../../shared/models/table.model';
import { CurrentRole } from '../../shared/utils/user';
import { IPaginate } from '../../shared/components/table/table.component';

@Component({
  selector: 'ges-cars-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
  data: IDataSource = {
    mode: {
      edit: false,
      delete: CurrentRole() === RoleEnum.Admin,
      detail: true,
    },
    columns: [
      { key: 'id', title: '#', orderKey: 'contrat.id' },
      { key: 'client', title: 'Client', orderKey: 'client.lastname' },
      { key: 'car', title: 'Voiture', orderKey: 'car.matricule' },
      {
        key: 'satrtAt',
        title: 'Date debut',
        type: 'date',
        orderKey: 'contrat.satrtAt',
      },
      {
        key: 'endAt',
        title: 'Date fin',
        type: 'date',
        orderKey: 'contrat.endAt',
      },
      // { key: 'creatAt', title: 'Date creation' },
      // { key: 'backAt', title: 'Date retour' },
      { key: 'paiement', title: 'Mode Paiement', orderKey: 'contrat.paiement' },
      { key: 'price', title: 'prix', orderKey: 'contrat.price' },
      { key: 'statut', title: 'statut', orderKey: 'contrat.statut' },
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
    private reservationService: ReservationService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.onChangePaginate(this.paginate);
  }

  onChangePaginate(event: IPaginate) {
    this.paginate = event;
    const { page, count, orderBy, order, search } = this.paginate;
    this.reservationService
      .getAllWithPaginate(page, count, search, orderBy, order)
      .subscribe((res: any) => {
        this.paginate.total = res.count;
        this.paginate = { ...this.paginate, total: res.count };

        this.data.rows = res.rows.map((item: any) => {
          return {
            ...item,
            satrtAt: moment(item.satrtAt).format('DD/MM/yyyy hh:mm'),
            endAt: moment(item.endAt).format('DD/MM/yyyy hh:mm'),
            creatAt: moment(item.creatAt).format('DD/MM/yyyy'),
            backAt: moment(item.backAt).format('DD/MM/yyyy'),
            client: item.client.lastname + ' ' + item.client.firstname,
            car:
              item && item.car
                ? item.car.matricule +
                  ' ' +
                  item.car.marque +
                  ' ' +
                  item.car.model
                : '',
          };
        });
      });
  }

  openDetail(reservation: any) {
    // this.router.navigate(['/reservation/detail/' + reservation.id]);
    this.router.navigate(['/reservation/detail/' + reservation.id + '/pdf']);
  }

  openEdit(reservation: any) {
    this.router.navigate(['/reservation/edit/' + reservation.id]);
  }

  ondelete(reservation: any) {
    this.alert.handleDelete().then((result) => {
      if (result.value) {
        this.reservationService.delete(reservation.id).subscribe((res: any) => {
          this.alert.handleSucces();
          this.ngOnInit();
        });
      }
    });
  }
}
