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

  update(id: number, car: any) {
    return this.network.patch('car/' + id, car);
  }

  getAll() {
    return this.network.get('car');
  }

  getById(id: number) {
    return this.network.get('car/' + id);
  }

  delete(id: number) {
    return this.network.delete('car/' + id);
  }
}
