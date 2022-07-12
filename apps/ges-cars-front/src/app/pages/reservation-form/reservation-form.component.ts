import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenceService } from '../../services/agence.service';
import { AlertService } from '../../services/alert.service';
import { CarService } from '../../services/car.service';
import { ClientService } from '../../services/client.service';
import { ReservationService } from '../../services/reservation.service';
import { PaiementTypeEnum } from '../../shared/enums/paiement-type.enum';
import { ReservationStatutEnum } from '../../shared/enums/reservation-statut.enum';

@Component({
  selector: 'ges-cars-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm = new FormGroup({
    car: new FormControl(),
    agence: new FormControl(),
    client: new FormControl(),
    paiement: new FormControl(),
    satrtAt: new FormControl(),
    endAt: new FormControl(),
    creatAt: new FormControl(),
    backAt: new FormControl(),
    statut: new FormControl(),
    price: new FormControl(),
  });

  clientList = [];
  agenceList = [];
  carList = [];

  resrvationStatutList = [
    {
      value: ReservationStatutEnum.Pending,
      viewValue: 'Pending',
    },
    {
      value: ReservationStatutEnum.Encore,
      viewValue: 'Encore',
    },
    {
      value: ReservationStatutEnum.Cloture,
      viewValue: 'Clôturé',
    },
  ];

  paimentTypes = [
    {
      value: PaiementTypeEnum.Cheque,
      viewValue: 'Espèce',
    },
    {
      value: PaiementTypeEnum.Cheque,
      viewValue: 'Cheque',
    },
  ];

  get form() {
    return this.reservationForm.controls;
  }
  mode: 'edit' | 'detail' | 'new' = 'new';
  reservation: any;

  constructor(
    private clientService: ClientService,
    private agenceService: AgenceService,
    private carService: CarService,
    private reservationService: ReservationService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe((res: any) => {
      this.clientList = res.map((r: any) => {
        return {
          value: r.id,
          viewValue: r.firstname + ' ' + r.lastname,
        };
      });
    });

    this.agenceService.getAll().subscribe((res: any) => {
      this.agenceList = res.map((r: any) => {
        return {
          value: r.id,
          viewValue: r.name,
        };
      });
    });

    this.carService.getAll().subscribe((res: any) => {
      this.carList = res.map((r: any) => {
        return {
          value: r.id,
          viewValue: r.marque + ' ' + r.model,
        };
      });
    });

    this.route.url.subscribe((url) => {
      if (url.length === 2) {
        const id = Number(url[1].path);
        const root = url[0].path;
        this.mode = root as any;
        this.loadReservationById(id);
      }
    });
  }

  loadReservationById(id: number) {
    this.reservationService.getById(id).subscribe((res: any) => {
      this.reservation = res;
      this.reservationForm.patchValue({
        car: this.reservation.car ? this.reservation.car.id : null,
        agence: this.reservation.agence ? this.reservation.agence.id : null,
        client: this.reservation.client ? this.reservation.client.id : null,
        paiement: res.paiement,
        satrtAt: res.satrtAt,
        endAt: res.endAt,
        creatAt: res.creatAt,
        backAt: res.backAt,
        statut: res.statut,
        price: res.price,
      });
      if (this.mode === 'detail') {
        this.reservationForm.disable();
      }
    });
  }

  onSubmit() {
    if (this.reservationForm.invalid) {
      Object.keys(this.reservationForm.controls).forEach((control) => {
        this.reservationForm.get(control)?.markAsDirty();
        this.reservationForm.get(control)?.markAsTouched();
      });
    } else {
      if (this.mode === 'new') {
        this.handleAdd();
      } else if (this.mode === 'edit') {
        this.handleUpdate();
      }
    }
  }

  handleAdd() {
    this.reservationService
      .create({
        ...this.reservationForm.value,
        price: Number(this.reservationForm.value.price),
      })
      .subscribe((data) => {
        this.alert.success('Une reservation a ete ajoutée');
        this.router.navigate(['/reservation/list']);
      });
  }

  handleUpdate() {
    this.reservationService
      .update(this.reservation.id, {
        ...this.reservationForm.value,
        price: Number(this.reservationForm.value.price),
      })
      .subscribe((data) => {
        this.alert.success('Reservation bien modifiée');
        this.router.navigate(['/reservation/list']);
      });
  }

  get getTitle() {
    if (this.mode === 'new') {
      return 'Ajouter Reservation';
    } else if (this.mode === 'detail') {
      return 'Details';
    } else {
      return 'Edit Reservation';
    }
  }
}
