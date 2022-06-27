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
}
