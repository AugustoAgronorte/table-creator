import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiDefinitionInterface, ApiDefinitionResponse, ApiParametersInterface, ApiParametersResponse } from '../../interfaces';
import { ApiCreatorComponent } from '../api-creator/api-creator.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-general-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ApiCreatorComponent],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.css'
})
export class GeneralFormComponent {
  apiGeneralForm:FormGroup;
  idApiDefSearch:number = 0;
  ResponseapiDefinitions: ApiDefinitionResponse[] = [];
  ResponseSingleApiDefinition: ApiDefinitionResponse | null = null;
  createdActive:boolean = false;
  resultsapis:boolean = true
  isActiveResults:boolean = false;
  ResponseApiParams: ApiParametersResponse[] = [];
  showAlert:boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.apiGeneralForm = this.fb.group({
      idApiDefSearch: ['', Validators.required], // Ajusta el nombre aquí según tu formulario
    });
  }


  buscarApiDef() {
    this.idApiDefSearch = +this.apiGeneralForm.get('idApiDefSearch')?.value;

    this.apiService.getApiDefinition(this.idApiDefSearch).subscribe(
      (data: ApiDefinitionResponse | ApiDefinitionResponse[]) => {
        if (Array.isArray(data)) {
          this.ResponseSingleApiDefinition = null
          this.ResponseapiDefinitions = data;
          for(let def of this.ResponseapiDefinitions){
            this.buscarApiParamsPorID(def.id)
            console.log
          }
          console.log(this.ResponseapiDefinitions);

          

        } else {
          this.ResponseapiDefinitions = []
          this.ResponseSingleApiDefinition = data;
          this.buscarApiParamsPorID(this.idApiDefSearch);
          console.log(this.ResponseSingleApiDefinition);

        }
 
        
      }
      
    )

    
    this.showResults()
  }


  buscarApiParamsPorID(id:number){
    this.apiService.getApiParameters(id).subscribe(
      (data: ApiParametersResponse[]) => {
        this.ResponseApiParams = data;
        console.log(this.ResponseApiParams)
      });
    
  }

  deleteApiDef(id:number){
    const confirmDelete = confirm('¿Estas seguro que deseas eliminar esta ApiDefinition?');
    if (confirmDelete) {
      this.apiService.deleteApiDef(this.ResponseSingleApiDefinition?.id).subscribe()}

    this.ResponseSingleApiDefinition = null
    this.showAlertMessage()
  }

  deleteApiParam(id:number){
    const confirmDelete = confirm('¿Estas seguro que deseas eliminar este parametro?');
    if(confirmDelete){
      this.apiService.deleteApiParams(id).subscribe()
    }
    this.buscarApiParamsPorID(this.idApiDefSearch)
      
  }

  desactivarCreate(){
    this.createdActive = false;
    this.resultsapis = true;
  }

  showAlertMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000); // Ocultar después de 2000 milisegundos (2 segundos)
  }

  showResults(){
    this.isActiveResults = true;
  }
  createdAcive(){
    this.createdActive = true;
    this.resultsapis = false;
  }
}
// export class GeneralFormComponent {

//   apiDefinitionForm: FormGroup;
//   apiParameterForm: FormGroup;
//   apidefinitions: ApiDefinitionInterface[] = [];
//   selectedApiDefinition: ApiDefinitionInterface | null = null;
//   default_value: string = '';

//   constructor(private fb: FormBuilder, private apiService: ApiService) {
//     this.apiDefinitionForm = this.fb.group({
//       method: ['', Validators.required],
//       serializer: ['', Validators.required],
//       description: ['', Validators.required],
//       authenticatable: [0, Validators.required],
//       url_list: ['', Validators.required],
//       url_path: ['', Validators.required],
//       fun_definition: ['', Validators.required]
//     });

//     this.apiParameterForm = this.fb.group({
//       field: ['', Validators.required],
//       required: [0, Validators.required],
//       id_parameter_type: [0, Validators.required],
//       data_type: ['', Validators.required],
//       default_value: ['', Validators.required],
//       inBody: [0, Validators.required],
//       in_response: [0, Validators.required]
//     });
//   }

//   onSubmitApiDefinition() {
//     if (this.apiDefinitionForm.valid) {
//       const formData = this.apiDefinitionForm.value;

//       const apiDefinition: ApiDefinitionInterface = {
//         method: formData.method,
//         serializer: formData.serializer,
//         description: formData.description,
//         authenticatable: formData.authenticatable,
//         url_list: formData.url_list,
//         url_path: formData.url_path,
//         fun_definition: formData.fun_definition,
//         apiParameters: []
//       };

//       this.apidefinitions.push(apiDefinition);

//       // Limpia el formulario después de agregar la definición API
//       this.apiDefinitionForm.reset();
//     } else {
//       console.error('El formulario de definición de API no es válido.');
//     }
//   }

//   onSubmitApiParameter() {
//     if (this.apiParameterForm.valid) {
//       const formData = this.apiParameterForm.value;

//       if (this.selectedApiDefinition) {
//         const apiParameter: ApiParametersInterface = {
//           id_api_definition: this.selectedApiDefinition.apiParameters.length + 1,
//           field: formData.campo,    
//           required: formData.required,    
//           id_parameter_type: formData.idParametertype,
//           data_type: formData.parameterDatatype,    
//           default_value: this.default_value,    
//           body: formData.inBody,    
//           in_response:formData.inResponse
//         };

//         this.selectedApiDefinition.apiParameters.push(apiParameter);

//         // Limpia el formulario después de agregar el parámetro API
//         this.apiParameterForm.reset();
//       } else {
//         console.error('No se ha seleccionado ninguna definición de API.');
//       }
//     } else {
//       console.error('El formulario de parámetros de API no es válido.');
//     }
//   }

//   selectApiDefinition(apiDefinition: ApiDefinitionInterface) {
//     this.selectedApiDefinition = apiDefinition;
//   }
// }

// #####################################################################################################################


// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ApiService } from '../../service/api.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ApiDefinitionInterface, ApiParametersInterface } from '../../interfaces';

// @Component({
//   selector: 'app-general-form',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './general-form.component.html',
//   styleUrl: './general-form.component.css'
// })
// export class GeneralFormComponent {

//   apiForm: FormGroup;
//   response: any;
//   apidefinitions:ApiDefinitionInterface[] = [];
//   apiparameters:ApiParametersInterface[] = [];
//   nextApiDefinitionId: number = 1;

//   ////////////////////////////////////
//   //// api definition
//   nameSerializer:string = '';
//   pathapi:string = '';
//   description:string = '';
//   url_list:string = '';
//   def_fun:string = '';
//   method:string = '';
//   autorizable:boolean = false;

//   ////////////////////////////////////
//   ///// api parameter
  
//   idApidefinition = 0;
//   campo:string = '';
//   idParametertype:number = 0;
//   parameterDatatype:string = '';
//   inResponse:number = 0;
//   required:number = 0;
//   inBody:number = 0;
//   default_value:string = '';



//   constructor(private fb: FormBuilder, private apiService: ApiService) {
//     this.apiForm = this.fb.group({
//       method: ['', Validators.required],
//       nameSerializer: ['', Validators.required],
//       description: ['', Validators.required],
//       autorizable: [0, Validators.required],
//       url_list: ['', Validators.required],
//       pathapi: ['', Validators.required],
//       def_fun: ['', Validators.required], 
//       campo:['', Validators.required],    
//       required:[0, Validators.required],    
//       idParametertype:[0, Validators.required],
//       parameterDatatype:['', Validators.required],        
//       inBody:[0, Validators.required],    
//       inResponse:[0, Validators.required]

//     })
//   }

//   onSubmit() {

    
//       const formData = this.apiForm.value;

//       // Crear un objeto de tipo ApiDefinitionInterface
//       const apiDefinition: ApiDefinitionInterface = {
//         serializer: formData.nameSerializer,
//         url_path: formData.pathapi,
//         description: formData.description,
//         url_list: formData.url_list,
//         fun_definition: formData.def_fun,
//         method: formData.method,
//         authenticatable: formData.autorizable,
//         apiParameters: []
//       }

//       const apiParameters: ApiParametersInterface = { 
//         id_api_definition: apiDefinition.apiParameters.length + 1,
//         field: formData.campo,    
//         required: formData.required,    
//         id_parameter_type: formData.idParametertype,
//         data_type: formData.parameterDatatype,    
//         default_value: this.default_value,    
//         body: formData.inBody,    
//         in_response:formData.inResponse
//       };


//       this.apidefinitions.push(apiDefinition);
//       this.apiparameters.push(apiParameters)

//       // Limpia el formulario después de agregar la definición API
//       this.apiForm.reset();
    
    
//   }

// }
