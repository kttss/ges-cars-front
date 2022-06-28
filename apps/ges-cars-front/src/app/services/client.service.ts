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
}
