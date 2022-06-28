import { Component, OnInit } from '@angular/core';

import { CarService } from '../../services/car.service';
import { IDataSource } from '../../shared/models/table.model';

@Component({
  selector: 'ges-cars-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  data: IDataSource = {
    mode: {
      edit: false,
      delete: true,
      detail: true,
    },
    columns: [
      { key: 'id', title: '#' },
      { key: 'marque', title: 'Marque' },
      { key: 'model', title: 'Model' },
      { key: 'matricule', title: 'Matricule' },
      { key: 'carburant', title: 'Carburant' },
      { key: 'statut', title: 'statut' },
      { key: 'description', title: 'Description' },
    ],
    rows: [],
  };

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAll().subscribe((res: any) => {
      this.data.rows = res;
    });
  }
}
