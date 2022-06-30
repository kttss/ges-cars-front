import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  get(url: string, headers?: any) {
    return this.http.get(environment.apiUrl + url, headers);
  }

  post(url: string, body: any, headers?: any) {
    return this.http.post(environment.apiUrl + url, body, headers);
  }
}
