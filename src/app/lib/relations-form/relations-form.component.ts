import { Component, OnInit } from '@angular/core';
import { RealtionsService } from '../../service/realtions.service';
import { ApiSchemaHeadersResponse, ApiTableSchemaResponse, FormDefResponse} from '../../interfaces';
import { CommonModule } from '@angular/common';
import { Form, FormsModule } from '@angular/forms';
import { RelationsCreateRequest } from '../../interfaces';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-relations-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './relations-form.component.html',
  styleUrl: './relations-form.component.css'
})
export class RelationsFormComponent implements OnInit {

  faArrowsAltH = faArrowsAltH;
  responseData?: ApiSchemaHeadersResponse;
  responseDataForm?:FormDefResponse[];
  formSeleccionadaPadre:string = 'string';
  formSeleccionadaHijo:string = 'string';
  tablaSeleccionadaPadre:string = '';
  campoSelecionadoPadre:string = '';
  tablaSeleccionadaHijo:string = '';
  campoSelecionadoHijo:string = '';
  camposPadre: string[] = [];
  camposHijo: string[] = [];
  tablasCreadas:any[] = [];
  description:string = '';
  editable:number = 0;
  realtionTableId:number = 0;
  relationalType:string = ''
  


  constructor(private relationService: RealtionsService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.relationService.getTableHeaders().subscribe(
      (response) => {
        this.responseData = response;
      });

    this.relationService.getForms().subscribe(
      (response) => {
        this.responseDataForm = response;
        console.log(this.responseDataForm)
      });

  }

  //////////// Padre /////////////////////////////////
  ///////////////////////////////////////////////////
  onTablaSelectedPadre(event: any) {
    if (event && event.target) {
      this.tablaSeleccionadaPadre = event.target.value;
      this.obtenerCamposPadre(this.tablaSeleccionadaPadre)
    }
  }

  onCampoSelectedPadre(event: any){
    if (event && event.target){
      this.campoSelecionadoPadre = event.target.value;
    }
  }

  obtenerCamposPadre(tabla:string) {
    this.relationService.getTableFields(tabla).subscribe(
      (response) => {
        this.camposPadre = response;
        console.log(this.camposPadre)
      }
    );
  }

  /////////////////// Hijo //////////////////////////////////
  //////////////////////////////////////////////////////////
  onTablaSelectedHijo(event: any) {
    if (event && event.target) {
      this.tablaSeleccionadaHijo = event.target.value;
      this.obtenerCamposHijo(this.tablaSeleccionadaHijo)
    }
  }

  onCampoSelectedHijo(event: any){
    if (event && event.target){
      this.campoSelecionadoHijo = event.target.value;
    }
  }

  obtenerCamposHijo(tabla:string) {
    this.relationService.getTableFields(tabla).subscribe(
      (response) => {
        this.camposHijo = response;
        console.log(this.camposHijo)
      }
    );}

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
  onSumbit(){
    const relationsBody: RelationsCreateRequest = {
      description:this.description || 'string',
      form_definition_from:this.formSeleccionadaPadre || 'string',
      table_from: this.tablaSeleccionadaPadre || 'string',
      table_from_key: this.campoSelecionadoPadre || 'string',
      form_definition_to: this.formSeleccionadaHijo || 'string',
      table_to:this.tablaSeleccionadaHijo || 'string',
      table_to_key:this.campoSelecionadoHijo || 'string',
      editable: this.editable ? 1 : 0,
      relation_type:this.relationalType || 'string' 
   }

   this.relationService.crearRelation(relationsBody).subscribe(
    response => {
      this.realtionTableId = response.id;
      if(relationsBody.relation_type == 'nn' || relationsBody.relation_type == 'NN'){
        this.relationService.createTableIntermediate(this.realtionTableId).subscribe(
          tableResponse => {
            console.log('Tabla intermedia crada exitosamente', tableResponse);
          }
        )

       }
    }
   )

   

  this.tablasCreadas.push(relationsBody)
  console.log(this.tablasCreadas)
  }

  limpiarForm(){
    this.responseData = undefined;
    this.tablaSeleccionadaPadre = '';
    this.tablaSeleccionadaHijo = '';
    this.camposPadre = [];
    this.camposHijo = [];
    this.description = '';
    this.relationalType = '';
    this.editable = 0;
  }

  onFormSelectedPadre(event: any) {
    if (event && event.target) {
      this.formSeleccionadaPadre = event.target.value;
    }
  }

  onFormSelectedHijo(event:any){
    if (event && event.target) {
      this.formSeleccionadaHijo = event.target.value;
    }
  }


}


