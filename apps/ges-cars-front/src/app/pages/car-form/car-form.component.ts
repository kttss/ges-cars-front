import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { CarService } from '../../services/car.service';
import { ClientService } from '../../services/client.service';
import { CarStatutEnum } from '../../shared/enums/car-statut.enum';
import { carburantTypeEnum } from '../../shared/enums/carburant-type.enum';

@Component({
  selector: 'ges-cars-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
})
export class CarFormComponent implements OnInit {
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
    carteGriseImages: new FormControl([], [Validators.required]),
    autorisationCirculationImages: new FormControl([], [Validators.required]),
    assuranceImages: new FormControl([], [Validators.required]),
    vignetteImages: new FormControl([], [Validators.required]),
    visiteImages: new FormControl([], [Validators.required]),
    carteGriseDateExpertation: new FormControl('', [Validators.required]),
    autorisationCirculationDateExpertation: new FormControl('', [
      Validators.required,
    ]),
    assuranceDateExpertation: new FormControl('', [Validators.required]),
    vignetteDateExpertation: new FormControl('', [Validators.required]),
    visiteeDateExpertation: new FormControl('', [Validators.required]),
  });

  get form() {
    return this.carForm.controls;
  }

  car: any = null;
  mode: 'edit' | 'detail' | 'new' = 'new';

  constructor(
    private carService: CarService,
    private router: Router,
    private alert: AlertService,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url.length === 2) {
        const id = Number(url[1].path);
        const root = url[0].path;
        this.mode = root as any;
        this.loadCarById(id);
      }
    });
  }

  private loadCarById(id: number) {
    this.carService.getById(id).subscribe((res) => {
      console.log('dd', res);
      this.car = res;
      const { carburant, description, marque, matricule, model, statut } =
        this.car;

      this.carForm.patchValue({
        marque,
        model,
        matricule,
        carburant,
        statut,
        description,
      });

      if (this.car.autorisationCirculation) {
        this.carForm.patchValue({
          autorisationCirculationDateExpertation:
            this.car.autorisationCirculation.DateExpiration,
        });
        this.clientService
          .getDocById(this.car.autorisationCirculation.id)
          .subscribe((res: any) => {
            this.carForm.patchValue({
              autorisationCirculationImages: res.files.map((f: any) => f.path),
            });
          });
      }
      if (this.car.carteGrise) {
        this.carForm.patchValue({
          carteGriseDateExpertation: this.car.carteGrise.DateExpiration,
        });
        this.clientService
          .getDocById(this.car.carteGrise.id)
          .subscribe((res: any) => {
            this.carForm.patchValue({
              carteGriseImages: res.files.map((f: any) => f.path),
            });
          });
      }
      if (this.car.vignette) {
        this.carForm.patchValue({
          vignetteDateExpertation: this.car.vignette.DateExpiration,
        });

        this.clientService
          .getDocById(this.car.vignette.id)
          .subscribe((res: any) => {
            this.carForm.patchValue({
              vignetteImages: res.files.map((f: any) => f.path),
            });
          });
      }
      if (this.car.visite) {
        this.carForm.patchValue({
          visiteeDateExpertation: this.car.visite.DateExpiration,
        });

        this.clientService
          .getDocById(this.car.visite.id)
          .subscribe((res: any) => {
            this.carForm.patchValue({
              visiteImages: res.files.map((f: any) => f.path),
            });
          });
      }
      if (this.car.assurance) {
        this.carForm.patchValue({
          assuranceDateExpertation: this.car.assurance.DateExpiration,
        });
        this.clientService
          .getDocById(this.car.autorisationCirculation.id)
          .subscribe((res: any) => {
            this.carForm.patchValue({
              assuranceImages: res.files.map((f: any) => f.path),
            });
          });
      }
      if (this.mode === 'detail') {
        this.carForm.disable();
      }
    });
  }

  onSubmit() {
    if (this.carForm.invalid) {
      Object.keys(this.carForm.controls).forEach((control) => {
        this.carForm.get(control)?.markAsDirty();
        this.carForm.get(control)?.markAsTouched();
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
    this.carService.create(this.carForm.value).subscribe((data) => {
      this.alert.success('voiture a ete ajouté');
      this.router.navigate(['/car/list']);
    });
  }

  handleUpdate() {
    this.carService
      .update(this.car.id, this.carForm.value)
      .subscribe((data) => {
        this.alert.success('voiture bien modifié');
        this.router.navigate(['/car/list']);
      });
  }
}
