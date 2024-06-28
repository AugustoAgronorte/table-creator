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

  apiForm: FormGroup;
  response: any;
  apidefinitions:ApiDefinitionInterface[] = [];
  apiparameters:ApiParametersInterface[] = [];
  nextApiDefinitionId: number = 1;

  ////////////////////////////////////
  //// api definition
  nameSerializer:string = '';
  pathapi:string = '';
  description:string = '';
  url_list:string = '';
  def_fun:string = '';
  method:string = '';
  autorizable:boolean = false;

  ////////////////////////////////////
  ///// api parameter
  
  idApidefinition = 0;
  campo:string = '';
  idParametertype:number = 0;
  parameterDatatype:string = '';
  inResponse:number = 0;
  required:number = 0;
  inBody:number = 0;
  default_value:string = '';



  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.apiForm = this.fb.group({
      method: ['', Validators.required],
      nameSerializer: ['', Validators.required],
      description: ['', Validators.required],
      autorizable: [0, Validators.required],
      url_list: ['', Validators.required],
      pathapi: ['', Validators.required],
      def_fun: ['', Validators.required], 
      campo:['', Validators.required],    
      required:[0, Validators.required],    
      idParametertype:[0, Validators.required],
      parameterDatatype:['', Validators.required],        
      inBody:[0, Validators.required],    
      inResponse:[0, Validators.required]

    })
  }

  onSubmit() {

    
      const formData = this.apiForm.value;

      // Crear un objeto de tipo ApiDefinitionInterface
      const apiDefinition: ApiDefinitionInterface = {
        serializer: formData.nameSerializer,
        url_path: formData.pathapi,
        description: formData.description,
        url_list: formData.url_list,
        fun_definition: formData.def_fun,
        method: formData.method,
        authenticatable: formData.autorizable,
        apiParameters: []
      }

      const apiParameters: ApiParametersInterface = { 
        id_api_definition: apiDefinition.apiParameters.length + 1,
        field: formData.campo,    
        required: formData.required,    
        id_parameter_type: formData.idParametertype,
        data_type: formData.parameterDatatype,    
        default_value: this.default_value,    
        body: formData.inBody,    
        in_response:formData.inResponse
      };


      this.apidefinitions.push(apiDefinition);
      this.apiparameters.push(apiParameters)

      // Limpia el formulario después de agregar la definición API
      this.apiForm.reset();
    
    
  }

}
