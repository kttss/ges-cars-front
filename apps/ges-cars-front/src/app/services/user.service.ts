import { Injectable } from '@angular/core';

import { ICreateUserDto } from '../shared/models/user.model';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private network: NetworkService) {}

  create(user: ICreateUserDto) {
    return this.network.post('user', user);
  }

  update(id: number, user: ICreateUserDto) {
    return this.network.patch('user/' + id, user);
  }

  getAll() {
    return this.network.get('user');
  }

  getById(id: number) {
    return this.network.get('user/' + id);
  }
}
