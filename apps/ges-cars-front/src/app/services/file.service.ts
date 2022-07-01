import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private network: NetworkService) {}

  upload(file: FormData) {
    return this.network
      .post('upload/upload', file, { responseType: 'text' })
      .toPromise();
  }

  getFileBlob(fileName: string) {
    return this.network.get('upload/read/' + fileName, {
      responseType: 'blob',
    });
  }

  getUrl(fileName: string): string {
    return environment.apiUrl + 'upload/read/' + fileName;
  }
}
