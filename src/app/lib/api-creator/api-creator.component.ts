import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiDefinitionInterface, ApiDefinitionResponse, ApiParametersInterface } from '../../interfaces';


@Component({
  selector: 'app-api-creator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './api-creator.component.html',
  styleUrl: './api-creator.component.css'
})
export class ApiCreatorComponent {
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
