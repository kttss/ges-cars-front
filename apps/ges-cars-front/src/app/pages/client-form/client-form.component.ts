import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'ges-cars-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  clientForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    lieuNaissance: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    villeCin: new FormControl('', [Validators.required]),
    villePermis: new FormControl('', [Validators.required]),
    datePermis: new FormControl('', [Validators.required]),
  });

  get form() {
    return this.clientForm.controls;
  }

  constructor(
    private clientService: ClientService,
    private alert: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.clientForm.invalid) {
      Object.keys(this.clientForm.controls).forEach((control) => {
        this.clientForm.get(control)?.markAsDirty();
        this.clientForm.get(control)?.markAsTouched();
      });
    } else {
      this.clientService
        .create({ ...this.clientForm.value })
        .subscribe((res) => {
          this.alert.success('un client a ete ajouté');
          this.router.navigate(['/client/list']);
        });
    }
  }
}
