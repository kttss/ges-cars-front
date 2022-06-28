import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private network: NetworkService) {}

  create(car: any) {
    return this.network.post('car', car);
  }

  getAll() {
    return this.network.get('car');
  }
}
