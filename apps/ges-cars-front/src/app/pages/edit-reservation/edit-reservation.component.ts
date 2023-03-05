import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { FileService } from '../../services/file.service';
import { ReservationService } from '../../services/reservation.service';
import { ReservationStatutEnum } from '../../shared/enums/reservation-statut.enum';

@Component({
  selector: 'ges-cars-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss'],
})
export class EditReservationComponent implements OnInit {
  reservationForm = new FormGroup({
    car: new FormControl('', [Validators.required]),
    agence: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
    paiement: new FormControl('', [Validators.required]),
    satrtAt: new FormControl('', [Validators.required]),
    endAt: new FormControl('', [Validators.required]),
    startPlace: new FormControl('', [Validators.required]),
    endPlace: new FormControl('', [Validators.required]),
    // creatAt: new FormControl('', [Validators.required]),
    // backAt: new FormControl('', [Validators.required]),
    statut: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    chauffeur: new FormControl(null, []),
    observation: new FormControl(''),
    file: new FormControl(''),
  });
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
  reservation: any;

  get form() {
    return this.reservationForm.controls;
  }
  id: any;

  constructor(
    private http: HttpClient,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private alert: AlertService,
    public fileService: FileService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.id = Number(url[1].path);
      this.loadReservationById(this.id);
    });
  }

  onSubmit() {
    this.reservationService
      .update(this.reservation.id, {
        ...this.reservationForm.value,
        price: Number(this.reservationForm.value.price),
      })
      .subscribe((data) => {
        this.alert.success('Reservation bien modifiée');
        this.loadReservationById(this.id);
      });
  }

  loadReservationById(id: number) {
    this.reservationService.getById(id).subscribe((res: any) => {
      this.reservation = res;
      this.reservationForm.patchValue({
        car: this.reservation.car ? this.reservation.car.id : null,
        agence: this.reservation.agence ? this.reservation.agence.id : null,
        client: this.reservation.client ? this.reservation.client.id : null,
        chauffeur: this.reservation.chauffeur
          ? this.reservation.chauffeur.id
          : null,
        paiement: res.paiement,
        satrtAt: res.satrtAt,
        endAt: res.endAt,
        startPlace: res.startPlace,
        endPlace: res.endPlace,
        // creatAt: res.creatAt,
        // backAt: res.backAt,
        statut: res.statut,
        price: res.price,
        file: res.file,
      });

      if (this.reservation.statut === ReservationStatutEnum.Cloture) {
        this.reservationForm.disable();
      }
    });
  }

  async change(event: any) {
    const file = event.target.files[0];
    const formData: any = new FormData();
    formData.append('file', file);
    const filename = await this.fileService.upload(formData);
    this.reservationForm.patchValue({ file: filename });
  }

  uploadFile() {
    this.reservationService
      .update(this.reservation.id, {
        ...this.reservationForm.value,
        price: Number(this.reservationForm.value.price),
      })
      .subscribe((data) => {
        this.alert.success('Le contrat a été correctement uploader');
        this.loadReservationById(this.id);
      });
  }
}
