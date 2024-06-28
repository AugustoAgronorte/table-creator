import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSearchResponse, ApiSearchGroup, ApiSearchRequest, ApiTableHeadersRequest, ApiTableSchemaRequest, ApiTableSchemaResponse } from '../interfaces';




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  searchTableData<ApiSearchResponse>(apiPath: string, tableParam: string, page: number, criteriaGroup: ApiSearchGroup): Observable<ApiSearchResponse>{
  // searchTableData<T>(apiPath: string, tableParam: string,page:number): Observable<T> {
    const url = `${this.apiUrl}/${apiPath}/${tableParam}?page=${page}`;
    console.log('URL:' , url)

    const requestData: ApiSearchRequest = {
      page,
      criteria_group: criteriaGroup
    };
    
    return this.http.post<ApiSearchResponse>(url, requestData, { headers :{'Authorization': `aa` }});
  }

  createTableSchema(requestBody: ApiTableSchemaRequest): Observable<ApiTableSchemaResponse> {
    const url = `${this.apiUrl}/table_api_schema/create`;
    return this.http.post<ApiTableSchemaResponse>(url, requestBody, { headers: { 'Authorization': 'aa' } });
  }

  createTableHeaders(headers: ApiTableHeadersRequest): Observable<any> {
    const url = `${this.apiUrl}/table_api_headers/create`;
    console.log('BODY',headers)
    return this.http.post<any>(url, headers);
  }

  makeRequest(method: string, url: string, params: any = null, body: any = null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'aa'
    });

    if (method.toUpperCase() === 'GET') {
      let httpParams = new HttpParams();
      if (params) {
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            httpParams = httpParams.set(key, params[key]);
          }
        }
      }
      return this.http.get(url, { headers, params: httpParams });
    } else if (method.toUpperCase() === 'POST') {
      return this.http.post(url, body, { headers });
    } else {
      throw new Error('Unsupported request method');
    }
  }

}
