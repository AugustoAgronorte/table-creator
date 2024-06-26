import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ApiSearchGroup } from '../../interfaces';


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
  

  responseData = {};

  constructor(private apiService: ApiService) { }

  onSubmit(){
    this.apiService.searchTableData(this.api_path, this.table_name,this.page, this.criteria_group ).subscribe(data =>
      this.responseData = data);
  };


}
  
