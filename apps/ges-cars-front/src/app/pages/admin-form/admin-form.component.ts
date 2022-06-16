import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export enum RoleEnum {
  Admin = 'Admin',
  AgenceAdmin = 'AgenceAdmin',
}

@Component({
  selector: 'ges-cars-front-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  userForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  roles = [
    { value: RoleEnum.Admin, viewValue: 'Admin' },
    { value: RoleEnum.AgenceAdmin, viewValue: 'Agence admin' },
  ];
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.userForm.value);
  }
}
