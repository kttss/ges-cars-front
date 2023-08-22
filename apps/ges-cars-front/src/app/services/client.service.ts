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

  getAllWithPaginate(
    page: number,
    count: number,
    search: string,
    orderBy: string,
    order: 'ASC' | 'DESC'
  ) {
    let root = `client/paginate?page=${page}&count=${count}&order=${order}`;
    if (search) {
      root = root + '&search=' + search;
    }
    if (orderBy) {
      root = root + '&orderBy=' + orderBy;
    }
    return this.network.get(root);
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
