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
    group_list: BaseApiSearchGroup[];
}

export interface ApiSearchRequest {
    page: number;
    criteria_group: ApiSearchGroup;
  }