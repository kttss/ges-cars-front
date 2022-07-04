import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'ges-cars-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
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

  client: any = null;
  mode: 'edit' | 'detail' | 'new' = 'new';

  constructor(
    private clientService: ClientService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url.length === 2) {
        const id = Number(url[1].path);
        const root = url[0].path;
        this.mode = root as any;
        this.loadClientById(id);
      }
    });
  }

  private loadClientById(id: number) {
    this.clientService.getById(id).subscribe((res) => {
      this.client = res;

      this.clientForm.patchValue({
        firstname: this.client.firstname,
        lastname: this.client.lastname,
        adresse: this.client.adresse,
        telephone: this.client.telephone,
        birthday: this.client.birthday,
        lieuNaissance: this.client.lieuNaissance,
        cin: this.client.cin,
        villeCin: this.client.villeCin,
        villePermis: this.client.villePermis,
        datePermis: this.client.datePermis,
      });

      if (this.mode === 'detail') {
        this.clientForm.disable();
      }
    });
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      Object.keys(this.clientForm.controls).forEach((control) => {
        this.clientForm.get(control)?.markAsDirty();
        this.clientForm.get(control)?.markAsTouched();
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
    this.clientService.create(this.clientForm.value).subscribe((data) => {
      this.alert.success('un client a ete ajouté');
      this.router.navigate(['/client/list']);
    });
  }

  handleUpdate() {
    this.clientService
      .update(this.client.id, this.clientForm.value)
      .subscribe((data) => {
        this.alert.success('le client bien modifié');
        this.router.navigate(['/client/list']);
      });
  }

  get getTitle() {
    if (this.mode === 'new') {
      return 'Ajouter client';
    } else if (this.mode === 'detail') {
      return 'Details';
    } else {
      return 'Edit Client';
    }
  }
}
