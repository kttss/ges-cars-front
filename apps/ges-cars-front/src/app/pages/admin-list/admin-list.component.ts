import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { IDataSource } from '../../shared/models/table.model';

@Component({
  selector: 'ges-cars-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  data: IDataSource = {
    mode: {
      edit: true,
      delete: true,
      detail: true,
    },
    columns: [
      { key: 'id', title: '#' },
      { key: 'firstname', title: 'Nom' },
      { key: 'lastname', title: 'Prénom' },
      { key: 'role', title: 'Rôle' },
      { key: 'email', title: 'E-mail' },
      { key: 'telephone', title: 'Telephone' },
    ],
    rows: [],
  };
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data: any) => {
      this.data.rows = data;
    });
  }

  openDetail(admin: any) {
    this.router.navigate(['/admin/detail/' + admin.id]);
  }

  openEdit(admin: any) {
    this.router.navigate(['/admin/edit/' + admin.id]);
  }
}
