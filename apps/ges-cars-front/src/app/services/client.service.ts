import { Injectable } from '@angular/core';

import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private network: NetworkService) {}

  getAll() {
    return this.network.get('client');
  }
}
