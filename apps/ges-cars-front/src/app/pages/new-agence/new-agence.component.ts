import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    logo: new FormControl('logo'),
  });
  users = [];

  get form() {
    return this.agenceForm.controls;
  }

  constructor(
    private agenceService: AgenceService,
    private userService: UserService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((res: any) => {
      this.users = res.map((u: any) => {
        return {
          value: u.id,
          viewValue: u.firstname + ' ' + u.lastname,
        };
      });
    });
  }

  onSubmit() {
    if (this.agenceForm.invalid) {
      this.agenceForm.markAllAsTouched();
      this.agenceForm.markAsDirty();
    } else {
      this.agenceService
        .create({ ...this.agenceForm.value })
        .subscribe((data) => {
          console.log(data);
          this.alert.success('une agence a ete ajouté');
          this.router.navigate(['/agence/list']);
        });
    }
  }
}
