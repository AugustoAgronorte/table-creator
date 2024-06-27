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
    logic_operator: "",
    group_list: []
  }
  
  selectedItems: any[] = [];
  responseData!:ApiSearchResponse;
  fieldNames: string[] = [];
  currentPage: number = 1;
  id_table_api_schema: number = 1;
  tableSchemaId!: number;
  itemsPerPage:number = 10;
  showAlert:boolean = false;
  

  constructor(private apiService: ApiService) { }

  onSubmit(currentPage: number) {
    this.apiService.searchTableData<ApiSearchResponse>(
      this.api_path,
      this.table_name,
      currentPage,
      this.criteria_group
    ).subscribe(data => {
      this.responseData = data;
      this.processData();
    });
  }
  
  processData() {
    if (this.responseData && this.responseData.results && this.responseData.results.length > 0) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.fieldNames = Object.keys(this.responseData.results[0]).slice(startIndex, endIndex);
    }
  }

  showSelectedItem(index: number) {
    const selectedItem = this.fieldNames[index];
    if (!this.selectedItems.includes(selectedItem)) 
      this.selectedItems.push(selectedItem);
  }

  selectAll() {
    if (Object.keys(this.responseData.results[0])) {
      Object.keys(this.responseData.results[0]).forEach(item => {
        if (!this.selectedItems.includes(item)) {
          this.selectedItems.push(item);
        }
      });
    }
  }

  capitalizeFirstLetter(text: string): string {
    return text
    .split(/(?=[A-Z])|[_\s]/)  // Divide por mayúsculas, guiones bajos o espacios
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // Capitaliza la primera letra de cada palabra
    .join(' ');
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
  
        // Paso 2: Crear los headers uno por uno utilizando el ID de la tabla schema
        if (this.tableSchemaId) {
          this.selectedItems.forEach(item => {
            const headerRequest: ApiTableHeadersRequest = {
              id_table_api_schema: this.tableSchemaId,
              header_key: item,
              display_name: this.capitalizeFirstLetter(item)
            };
  
            this.apiService.createTableHeaders(headerRequest).subscribe(
              response => {
                console.log(`TableApiHeader created successfully for ${item}:`, response);
                this.showAlertMessage()
                this.clearAll()
              },
              error => {
                console.error(`Error creating TableApiHeader for ${item}:`, error);
              }
            );
          });
        }
      },
      error => {
        console.error('Error creating TableSchema:', error);
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onSubmit(this.currentPage);
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onSubmit(this.currentPage);
    }
  }
  
  get totalPages(): number {
    if (this.responseData && this.responseData.results && this.responseData.results.length > 0) {
      return Math.ceil(Object.keys(this.responseData.results[0]).length / this.itemsPerPage);
    } else {
      return 0; // Manejar el caso cuando no hay resultados o responseData no está definido
    }
  }

  showAlertMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000); // Ocultar después de 2000 milisegundos (2 segundos)
  }

  clearAll(){
    this.fieldNames = [],
    this.selectedItems = []
  }

}
  
