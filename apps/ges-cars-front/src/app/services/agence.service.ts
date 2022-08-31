import { Injectable } from '@angular/core';

import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class AgenceService {
  constructor(private network: NetworkService) {}

  create(agence: any) {
    return this.network.post('agency', agence);
  }

  getAll() {
    return this.network.get('agency');
  }

  getAllLogs() {
    return this.network.get('agency/logs');
  }

  getById(id: number) {
    return this.network.get('agency/' + id);
  }

  update(id: string, agence: any) {
    return this.network.patch('agency/' + id, agence);
  }

  delete(id: number) {
    return this.network.delete('agency/' + id);
  }
}
