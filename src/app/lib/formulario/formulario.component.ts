import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ApiSearchResponse, ApiSearchGroup } from '../../interfaces';



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
  page:number = 1
  criteria_group:ApiSearchGroup = {
    group_list: []
  }
  
  selectedItems: any[] = [];
  responseData?:ApiSearchResponse;
  fieldNames: string[] = [];
  

  constructor(private apiService: ApiService) { }

  onSubmit(){
    this.apiService.searchTableData<ApiSearchResponse>(this.api_path, this.table_name,this.page, this.criteria_group ).subscribe(data =>
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
  
}
  
