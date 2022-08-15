import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
export class AdminFormComponent implements OnInit {
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
  admin: any = null;
  mode: 'edit' | 'detail' | 'new' = 'new';

  changePassword = false;

  constructor(
    private userService: UserService,
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
        this.loadAdminById(id);
        this.toggleEditPassword(false);
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach((control) => {
        this.userForm.get(control)?.markAsDirty();
        this.userForm.get(control)?.markAsTouched();
      });
    } else {
      if (this.mode === 'new') {
        this.handleAdd();
      } else if (this.mode === 'edit') {
        this.handleUpdate();
      }
    }
  }

  private loadAdminById(id: number) {
    this.userService.getById(id).subscribe((res) => {
      this.admin = res;

      this.userForm.patchValue({
        firstname: this.admin.firstname,
        lastname: this.admin.lastname,
        email: this.admin.email,
        role: this.admin.role,
        telephone: this.admin.telephone,
      });
      if (this.mode === 'detail') {
        this.userForm.disable();
      }
    });
  }

  toggleEditPassword(value: boolean) {
    this.changePassword = value;
    if (!this.changePassword) {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('password')?.setValue('');
      this.userForm.get('confirmPassword')?.setValue('');
    } else {
      this.userForm.get('password')?.addValidators([Validators.required]);
      this.userForm
        .get('confirmPassword')
        ?.addValidators([Validators.required, confirmPasswordValidator]);
    }
  }

  handleAdd() {
    this.userService.create(this.userForm.value).subscribe((data) => {
      this.alert.success('le compte bien ajouté');
      this.router.navigate(['/admin/list']);
    });
  }

  handleUpdate() {
    this.userService
      .update(this.admin.id, this.userForm.value)
      .subscribe((data) => {
        this.alert.success('le compte bien modifié');
        this.router.navigate(['/admin/list']);
      });
  }

  get getTitle() {
    if (this.mode === 'new') {
      return 'Ajouter Admin';
    } else if (this.mode === 'detail') {
      return 'Details';
    } else {
      return 'Edit Admin';
    }
  }
}
