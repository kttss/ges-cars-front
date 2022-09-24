import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AlertService } from '../../services/alert.service';
import { ReservationService } from '../../services/reservation.service';
import { RoleEnum } from '../../shared/enums/role.enum';
import { IDataSource } from '../../shared/models/table.model';
import { CurrentRole } from '../../shared/utils/user';

@Component({
  selector: 'ges-cars-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
  data: IDataSource = {
    mode: {
      edit: true,
      delete: CurrentRole() === RoleEnum.Admin,
      detail: true,
    },
    columns: [
      { key: 'id', title: '#' },
      { key: 'client', title: 'Client' },
      { key: 'satrtAt', title: 'Date debut' },
      { key: 'endAt', title: 'Date fIn' },
      { key: 'creatAt', title: 'Date creation' },
      { key: 'backAt', title: 'Date retour' },
      { key: 'paiement', title: 'Mode Paiement' },
      { key: 'price', title: 'prix' },
      { key: 'statut', title: 'statut' },
    ],
    rows: [],
  };
  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.reservationService.getAll().subscribe((res: any) => {
      this.data.rows = res.map((item: any) => {
        return {
          ...item,
          satrtAt: moment(item.satrtAt).format('DD/MM/YYYY'),
          endAt: moment(item.endAt).format('DD/MM/YYYY'),
          creatAt: moment(item.creatAt).format('DD/MM/YYYY'),
          backAt: moment(item.backAt).format('DD/MM/YYYY'),
          client: item.client.lastname + ' ' + item.client.firstname,
        };
      });
    });
  }

  openDetail(reservation: any) {
    this.router.navigate(['/reservation/detail/' + reservation.id]);
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
