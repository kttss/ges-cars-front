import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AgenceService } from '../../services/agence.service';
import { IDataSource } from '../../shared/models/table.model';

@Component({
  selector: 'ges-cars-agence-list',
  templateUrl: './agence-list.component.html',
  styleUrls: ['./agence-list.component.scss'],
})
export class AgenceListComponent implements OnInit {
  data: IDataSource = {
    mode: {
      edit: true,
      delete: true,
      detail: true,
    },
    columns: [
      { key: 'id', title: '#' },
      { key: 'name', title: 'Nom' },
      { key: 'description', title: 'Description' },
      { key: 'adresse', title: 'Adresse' },
      { key: 'emails', title: 'Emails', width: 130 },
      { key: 'telephones', title: 'Tels', width: 130 },
      { key: 'telephones', title: 'Faxs', width: 130 },
    ],
    rows: [],
  };
  constructor(private agenceService: AgenceService, private router: Router) {}

  ngOnInit(): void {
    this.agenceService.getAll().subscribe((res: any) => {
      const rows = res.map((e: any) => {
        return {
          adresse: e.adresse,
          description: e.description,
          emails: e.emails.map((t: any) => t.value).join(', \n'),
          id: e.id,
          logo: 'string',
          name: e.name,
          telephones: e.telephones.map((t: any) => t.value).join(', \n'),
        };
      });
      this.data.rows = rows;
    });
  }

  openDetail(agnce: any) {
    this.router.navigate(['/agence/detail/' + agnce.id]);
  }

  openEdit(agnce: any) {
    this.router.navigate(['/agence/edit/' + agnce.id]);
  }
}
