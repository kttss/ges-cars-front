import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
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

  generateContrat(id: number) {
    return this.network.get('contrat/pdf/' + id);
  }

  getContratUrl(filename: string) {
    return environment.apiUrl + 'upload/readcontrat/' + filename;
  }

  getcontratdata(id: number) {
    return this.network.get('contrat/pdf/' + id);
  }
}
