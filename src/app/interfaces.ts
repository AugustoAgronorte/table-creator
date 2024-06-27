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
