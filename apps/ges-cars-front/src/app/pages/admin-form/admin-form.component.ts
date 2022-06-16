import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { RoleEnum } from '../../shared/enums/role.enum';

@Component({
  selector: 'ges-cars-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent {
  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  roles = [
    { value: RoleEnum.Admin, viewValue: 'Admin' },
    { value: RoleEnum.AgenceAdmin, viewValue: 'Agence admin' },
  ];
  constructor(
    private userService: UserService,
    private alert: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.create(this.userForm.value).subscribe((data) => {
        this.alert.success('le compte bien ajouter');
        this.router.navigate(['/admin/list']);
      });
    }
  }
}
