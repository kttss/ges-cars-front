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

  getAllWithPaginate(
    page: number,
    count: number,
    search: string,
    orderBy: string,
    order: 'ASC' | 'DESC'
  ) {
    let root = `contrat/paginate?page=${page}&count=${count}&order=${order}`;
    if (search) {
      root = root + '&search=' + search;
    }
    if (orderBy) {
      root = root + '&orderBy=' + orderBy;
    }
    return this.network.get(root);
  }

  getById(id: number) {
    return this.network.get('contrat/' + id);
  }

  getreservedDates(id: number) {
    return this.network.get('contrat/car/' + id);
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
