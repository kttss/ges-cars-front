import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AgenceService } from '../../services/agence.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ges-cars-new-agence',
  templateUrl: './new-agence.component.html',
  styleUrls: ['./new-agence.component.scss'],
})
export class NewAgenceComponent implements OnInit {
  agenceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    telephones: new FormControl([], [Validators.required]),
    emails: new FormControl([], [Validators.required]),
    faxs: new FormControl([], [Validators.required]),
    users: new FormControl([], [Validators.required]),
    logo: new FormControl(''),
  });
  users = [];
  agence: any = null;
  mode: 'edit' | 'detail' | 'new' = 'new';
  get form() {
    return this.agenceForm.controls;
  }

  constructor(
    private agenceService: AgenceService,
    private userService: UserService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAdminList();
    this.route.url.subscribe((url) => {
      if (url.length === 2) {
        const id = Number(url[1].path);
        const root = url[0].path;
        this.mode = root as any;
        this.loadAgenceById(id);
      }
    });
  }

  loadAdminList() {
    this.userService.getAll().subscribe((res: any) => {
      this.users = res.map((u: any) => {
        return {
          value: u.id,
          viewValue: u.firstname + ' ' + u.lastname,
        };
      });
    });
  }

  loadAgenceById(id: number) {
    this.agenceService.getById(id).subscribe((res) => {
      this.agence = res;

      this.agenceForm.setValue({
        name: this.agence.name,
        description: this.agence.description,
        adresse: this.agence.adresse,
        logo: this.agence.logo,
        telephones: this.agence.telephones.map((t: any) => t.value),
        emails: this.agence.emails.map((t: any) => t.value),
        users: this.agence.users.map((t: any) => t.id),
        faxs: this.agence.faxs.map((t: any) => t.value),
      });
      if (this.mode === 'detail') {
        this.agenceForm.disable();
      }
    });
  }

  onSubmit() {
    if (this.agenceForm.invalid) {
      this.agenceForm.markAllAsTouched();
      this.agenceForm.markAsDirty();
    } else {
      if (this.mode === 'new') {
        this.handleAdd();
      } else if (this.mode === 'edit') {
        this.handleUpdate();
      }
    }
  }

  handleAdd() {
    this.agenceService
      .create({ ...this.agenceForm.value })
      .subscribe((data) => {
        this.alert.success('une agence a ete ajouté');
        this.router.navigate(['/agence/list']);
      });
  }

  handleUpdate() {
    this.agenceService
      .update(this.agence.id, { ...this.agenceForm.value })
      .subscribe((data) => {
        this.alert.success('une agence a ete modifié');
        this.router.navigate(['/agence/list']);
      });
  }

  get getTitle() {
    if (this.mode === 'new') {
      return 'Nouvelle Agence';
    } else if (this.mode === 'detail') {
      return 'Details';
    } else {
      return 'Edit Agence';
    }
  }
}
