import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiSearchGroup, ApiSearchRequest } from '../interfaces';


type CriteriaGroup = {
  page: number;
  criteria_group: {
    group_list: any[]; // Ajusta según tus necesidades
  };
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  searchTableData(apiPath: string, tableParam: string, page: number, criteriaGroup: ApiSearchGroup): Observable<any>{
  // searchTableData<T>(apiPath: string, tableParam: string,page:number): Observable<T> {
    const url = `${this.apiUrl}/${apiPath}/${tableParam}?page=${page}`;
    console.log('URL:' , url)

    const requestData: ApiSearchRequest = {
      page,
      criteria_group: criteriaGroup
    };
    
    return this.http.post<any>(url, requestData, { headers :{'Authorization': `aa` }});
  }
}
