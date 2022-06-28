import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { CarService } from '../../services/car.service';
import { CarStatutEnum } from '../../shared/enums/car-statut.enum';
import { carburantTypeEnum } from '../../shared/enums/carburant-type.enum';

@Component({
  selector: 'ges-cars-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent {
  carburantTypes = [
    {
      value: carburantTypeEnum.Diesel,
      viewValue: 'Diesel',
    },
    {
      value: carburantTypeEnum.Essence,
      viewValue: 'Essence',
    },
  ];
  statusList = [
    {
      value: CarStatutEnum.Disponible,
      viewValue: 'Disponible',
    },
    {
      value: CarStatutEnum.Reserved,
      viewValue: 'Reservé',
    },
    {
      value: CarStatutEnum.Panne,
      viewValue: 'en panne',
    },
  ];
  carForm = new FormGroup({
    marque: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    matricule: new FormControl('', [Validators.required]),
    carburant: new FormControl('', [Validators.required]),
    statut: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  get form() {
    return this.carForm.controls;
  }
  constructor(
    private carService: CarService,
    private router: Router,
    private alert: AlertService
  ) {}

  onSubmit() {
    if (this.carForm.invalid) {
      Object.keys(this.carForm.controls).forEach((control) => {
        this.carForm.get(control)?.markAsDirty();
        this.carForm.get(control)?.markAsTouched();
      });
    } else {
      this.carService.create({ ...this.carForm.value }).subscribe((res) => {
        this.alert.success('une voiture a ete ajouté');
        this.router.navigate(['/car/list']);
      });
    }
  }
}
