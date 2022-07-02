import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { RoleEnum } from '../../shared/enums/role.enum';
import {
  confirmPasswordValidator,
  emailValidator,
  phoneValidator,
} from '../../shared/utils/validators';

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
    confirmPassword: new FormControl('', [
      Validators.required,
      confirmPasswordValidator,
    ]),
    email: new FormControl('', [Validators.required, emailValidator]),
    telephone: new FormControl('', [Validators.required, phoneValidator]),
    role: new FormControl('', [Validators.required]),
  });
  roles = [
    { value: RoleEnum.Admin, viewValue: 'Admin' },
    { value: RoleEnum.AgenceAdmin, viewValue: 'Agence admin' },
  ];

  get form() {
    return this.userForm.controls;
  }
  mode: 'edit' | 'detail' | 'new' = 'new';

  constructor(
    private userService: UserService,
    private alert: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    } else {
      if (this.mode === 'new') {
        this.handleAdd();
      } else if (this.mode === 'edit') {
        this.handleUpdate();
      }
    }
  }

  handleAdd() {
    this.userService.create(this.userForm.value).subscribe((data) => {
      this.alert.success('le compte bien ajouté');
      this.router.navigate(['/admin/list']);
    });
  }

  handleUpdate() {
    this.userService.create(this.userForm.value).subscribe((data) => {
      this.alert.success('le compte bien modifié');
      this.router.navigate(['/admin/list']);
    });
  }
}
