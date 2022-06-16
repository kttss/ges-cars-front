import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private network: NetworkService) {}

  auth(data: any) {
    return this.network.post('auth/login', data);
  }
}
