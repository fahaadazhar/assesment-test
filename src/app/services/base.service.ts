import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class BaseAPIService {
  baseUrl = '';
  constructor(public http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  post(url: string, body: object | string): Observable<any> {
    return this.http.post(url, body);
  }
}
