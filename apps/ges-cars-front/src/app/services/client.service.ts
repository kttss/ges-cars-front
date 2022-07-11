import { Injectable } from '@angular/core';

import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private network: NetworkService) {}

  create(client: any) {
    return this.network.post('client', client);
  }

  getAll() {
    return this.network.get('client');
  }

  getById(id: number) {
    return this.network.get('client/' + id);
  }

  update(id: number, client: any) {
    return this.network.patch('client/' + id, client);
  }

  getDocById(id: number) {
    return this.network.get('client/doc/' + id);
  }

  delete(id: number) {
    return this.network.delete('client/' + id);
  }
}
