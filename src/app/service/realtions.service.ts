import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiSchemaHeadersResponse, RelationsCreateRequest } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtionsService {

  private apiUrl = 'http://192.168.2.109:8080';

  constructor(private http: HttpClient){}

  getTableHeaders():Observable<ApiSchemaHeadersResponse>{
    const url = `${this.apiUrl}/table_api_schema/get-table-names`;
    return this.http.get<ApiSchemaHeadersResponse>(url);
  }


  getTableFields(table_name:string):Observable<any>{
    const url = `${this.apiUrl}/table_api_schema/headers/${table_name}`;
    return this.http.get<any>(url)
  }

  crearRelation(requestBody:RelationsCreateRequest):Observable<any>{
    const url = `${this.apiUrl}/relations/create`;
    return this.http.post<any>(url, requestBody)
  }
}
