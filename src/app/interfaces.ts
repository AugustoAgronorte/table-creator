export interface ApiSearchCriteria {
    column_filter: string;
    compare_criteria: string;
    compare_value: string;
}
  
  // BaseApiSearchGroupSerializer
export interface BaseApiSearchGroup {
    logic_operator: string;
    criteria_list: ApiSearchCriteria[];
    group_list: any[]; // Aquí puedes definir una interfaz específica si conoces la estructura exacta de group_list
}
  
  // ApiSearchGroupSerializer
export interface ApiSearchGroup {
    logic_operator:string
    group_list: BaseApiSearchGroup[];
}

export interface ApiSearchRequest {
    page: number;
    criteria_group: ApiSearchGroup;
}

export interface ApiSearchResponse{
  count: number,
  next: string,
  previous: string,
  page_size: number,
  pages: number,
  results:  { [key: string]: any }[];
}

export interface ApiTableHeadersRequest {
  id_table_api_schema: number;
  header_key: string;
  display_name: string;
}

export interface ApiTableSchemaRequest {
  table_key_name: string,
  api_path: string,
  pagination: number,
  editable: number,
  deletable: number
}

export interface ApiTableSchemaResponse {
  id: number; // Asegúrate de que el objeto de respuesta incluya el ID
}

export interface ApiDefintion{
  id:number;
  method:string;    
  serializer:string;    
  description:string;    
  authenticatable:number;    
  url_list:string;    
  url_path:string;    
  fun_definition:string;
  apiParameters: ApiParametersInterface[];
}

export interface ApiDefinitionInterface{  
  method:string;    
  serializer:string;    
  description:string;    
  authenticatable:number;    
  url_list:string;    
  url_path:string;    
  fun_definition:string;
  apiParameters: ApiParametersInterface[];
}

export interface ApiParameter{
  id:number;
  id_api_definition:number;    
  field:string;    
  required:number;    
  id_parameter_type:number;    
  data_type:string;    
  default_value:string;    
  body:number;    
  in_response:number;
}

export interface ApiParametersInterface{
    id_api_definition:number;    
    field:string;    
    required:number;    
    id_parameter_type:number;    
    data_type:string;    
    default_value:string;    
    body:number;    
    in_response:number;
}

export interface ApiDefinitionResponse {
  id: number;
  method:string;    
  serializer:string;    
  description:string;    
  authenticatable:number;    
  url_list:string;    
  url_path:string;    
  fun_definition:string;
  apiParameters: ApiParametersResponse[];
   // Asegúrate de que el objeto de respuesta incluya el ID
}

export interface ApiParametersResponse {
    id: number; 
    id_api_definition:number;    
    field:string;    
    required:number;    
    id_parameter_type:number;    
    data_type:string;    
    default_value:string;    
    body:number;    
    in_response:number;// Asegúrate de que el objeto de respuesta incluya el ID
}

export interface ApiSchemaHeadersResponse{
    result: boolean;
    message: string;
    status: number;
    datetime: string;
    content_type: string;
    content: string[];
}

export interface RelationsCreateRequest{
  description: string,
  table_from: string,
  table_from_key: string,
  table_to: string,
  table_to_key: string,
  editable: number,
  relation_type:string
}