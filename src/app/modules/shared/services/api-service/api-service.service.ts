import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/ApiResponse';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  doGet(url: string, params?: any, headers?: any) {
    let header = new HttpHeaders()
    if( headers!=null ) {
      header = new HttpHeaders({"Accept": "Application/json", ...headers});
    }
    return this.http.get<ApiResponse>(url, {params: params, headers: header});
  }

  doPost(url: string, data?: any) {
    let header = new HttpHeaders({ Accept: 'Application/json' });
    return this.http.post<ApiResponse>(url, data, { headers: header });
  }

  doPut(url: string, data?: any) {
    let header = new HttpHeaders({ Accept: 'Application/json' });
    return this.http.put<ApiResponse>(url, data, { headers: header });
  }

  getCountry() {
    let url = 'https://countriesnow.space/api/v0.1/countries/population';
    return this.doGet(url).pipe(
      map((response: any) => response['data']),
      map((country: any) => country.map((x: any) => x['country']))
    )
  }
}
