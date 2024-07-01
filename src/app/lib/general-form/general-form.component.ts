import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiDefinitionInterface, ApiParametersInterface } from '../../interfaces';

@Component({
  selector: 'app-general-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.css'
})
export class GeneralFormComponent {
  apiDefinitionForm: FormGroup;
  apiParameterForm: FormGroup;
  apidefinitions: ApiDefinitionInterface[] = [];
  apiParameters: ApiParametersInterface[] = [];
  selectedApiDefinitionId: number = 0;
  idparameter:number = 1;
  isactive:boolean = false
  default_value:string = '0'
  showAlert:boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.apiDefinitionForm = this.fb.group({
      method: ['', Validators.required],
      serializer: ['', Validators.required],
      description: ['', Validators.required],
      authenticatable: [false],
      url_list: ['', Validators.required],
      url_path: ['', Validators.required],
      fun_definition: ['', Validators.required]
    });

    this.apiParameterForm = this.fb.group({
      field: ['', Validators.required],
      id_parameter_type: [0, Validators.required],
      data_type: ['', Validators.required],
      default_value: [''],
      inBody: [false],
      in_response: [false],
      required: [false]
    });
  }

  onSubmitApiDefinition() {
    const formData = this.apiDefinitionForm.value;
    const apiDefinition: ApiDefinitionInterface = {
      method: formData.method,
      serializer: formData.serializer,
      description: formData.description,
      authenticatable: formData.authenticatable ? 1 : 0,
      url_list: formData.url_list,
      url_path: formData.url_path,
      fun_definition: formData.fun_definition,
      apiParameters: this.apiParameters
    };

    this.apiService.createApiDefinition(apiDefinition).subscribe(
      response => {
        console.log('API Definition created successfully:', response);
        this.selectedApiDefinitionId = response.id;
        this.apiDefinitionForm.reset()
      }
    )

    this.apidefinitions.push(apiDefinition);
    this.activarParams()
    this.apiDefinitionForm.reset();


  }

  onSubmitApiParameter() {
    const formData = this.apiParameterForm.value;
    const apiParameter: ApiParametersInterface = {
      id_api_definition: this.selectedApiDefinitionId,
      field: formData.field,
      id_parameter_type: formData.id_parameter_type,
      data_type: formData.data_type,
      default_value: this.default_value,
      body: formData.inBody ? 1 : 0,
      in_response: formData.in_response ? 1 : 0,
      required: formData.required ? 1 : 0
    };

    this.apiParameters.push(apiParameter);
    this.apiParameterForm.reset();
  }

  createdApiParameters(){
    for(let parameter of this.apiParameters){
      this.apiService.createApiParameters(parameter).subscribe(
        response => {
          console.log("Parameter created successfully", response);
          // this.selectedApiParameterId = response.id
          this.apiParameters = []
        }
      )
      // this.parameterId = this.selectedApiParameterId
      this.showAlertMessage()
    }
  }

  selectApiDefinition(apiDefinitionId: number) {
    this.selectedApiDefinitionId = apiDefinitionId;
  }

  activarParams(){
    this.isactive =  true
  }

  showAlertMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000); // Ocultar después de 2000 milisegundos (2 segundos)
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
