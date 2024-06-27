import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ApiSearchResponse, ApiSearchGroup, ApiTableHeadersRequest, ApiTableSchemaRequest, ApiTableSchemaResponse} from '../../interfaces';



@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent{

  api_path: string = ''; // Segmento de la URL de la API después de /api
  table_name: string = ''; // Nombre de la tabla
  criteria_group:ApiSearchGroup = {
    group_list: []
  }
  
  selectedItems: any[] = [];
  responseData!:ApiSearchResponse;
  fieldNames: string[] = [];
  currentPage: number = 1;
  id_table_api_schema: number = 1;
  tableSchemaId?: number;
  

  constructor(private apiService: ApiService) { }

  onSubmit(){
    this.apiService.searchTableData<ApiSearchResponse>(this.api_path, this.table_name, this.currentPage, this.criteria_group ).subscribe(data =>
      this.responseData = data);
      this.processData()
  };

  processData() {
    if (this.responseData && this.responseData.results && this.responseData.results.length > 0) {
      this.fieldNames = Object.keys(this.responseData.results[0]);
      console.log(this.fieldNames);
    }
  }

  showSelectedItem(index: number) {
    const selectedItem = this.fieldNames[index];
    if (!this.selectedItems.includes(selectedItem)) 
      this.selectedItems.push(selectedItem);
  }

  selectAll() {
    if (this.fieldNames) {
      this.fieldNames.forEach(item => {
        if (!this.selectedItems.includes(item)) {
          this.selectedItems.push(item);
        }
      });
    }
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  
  createTableSchemaAndHeaders() {
    
    const requestBody: ApiTableSchemaRequest = {
      table_key_name: "tabla_" + this.table_name,
      api_path: this.api_path + "/" + this.table_name,
      pagination: 1,
      editable: 1,  
      deletable: 0  
    };

    // Paso 1: Crear la tabla schema
    this.apiService.createTableSchema(requestBody).subscribe(
      (schemaResponse: ApiTableSchemaResponse) => {
        this.tableSchemaId = schemaResponse.id; // Guarda el ID de la tabla schema creada
        console.log('TableSchema created with ID:', this.tableSchemaId);

        // Paso 2: Crear los headers utilizando el ID de la tabla schema
        if (this.tableSchemaId) {
          const headersArray = this.createTableHeadersArray(this.tableSchemaId);
          this.apiService.createTableHeaders(headersArray).subscribe(
            response => {
              console.log('TableApiHeaders created successfully', response);
            }
          );
        }
      }
    );
  }

  createTableHeadersArray(id_table_api_schema: number): ApiTableHeadersRequest[] {
    return this.selectedItems.map(item => ({
      id_table_api_schema: this.id_table_api_schema,
      header_key: item.toLowerCase(),
      display_name: this.capitalizeFirstLetter(item)
    }));
  }

}
  // goToFirst() {
  //   this.currentPage = 1
  //   this.onSubmit()

  // }

  // goToPrevious() {

  //   if (this.currentPage - 1 > 0) {
  //     this.currentPage--
  //     this.onSubmit()

  //   }
  // }

  // goToNext() {

  //   if (this.currentPage + 1 <= this.responseData.pages) {
  //     this.currentPage++
  //     this.onSubmit()

  //   }
  // }

  // goToLast() {

  //   if(this.currentPage = this.responseData.pages)
  //     this.onSubmit()
  // }


  
