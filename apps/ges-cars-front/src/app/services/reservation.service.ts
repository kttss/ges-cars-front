import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private network: NetworkService) {}

  create(reservation: any) {
    return this.network.post('contrat', reservation);
  }

  update(id: number, reservation: any) {
    return this.network.patch('contrat/' + id, reservation);
  }

  getAll() {
    return this.network.get('contrat');
  }

  getById(id: number) {
    return this.network.get('contrat/' + id);
  }

  delete(id: number) {
    return this.network.delete('contrat/' + id);
  }

  getStatistique() {
    return this.network.get('contrat/statistique');
  }
}
