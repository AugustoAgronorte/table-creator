import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  ApiSearchResponse, ApiSearchGroup, ApiTableHeadersRequest, ApiTableSchemaRequest, ApiTableSchemaResponse, FormCreateRequest, ApiResponse} from '../../interfaces';
import { GeneralFormComponent } from '../general-form/general-form.component';
import { delay, interval, of, switchMap, takeWhile } from 'rxjs';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule, GeneralFormComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})

export class FormularioComponent implements OnInit {

  api_path: string = ''; // Segmento de la URL de la API después de /api
  table_name: string = ''; // Nombre de la tabla
  api_table_name = ''

  criteria_group = {
    logic_operator: "",
    group_list: []
  }
  
  selectedItems: any[] = [];
  responseData: string[] = [];
  fieldNames: string[] = [];
  currentPage: number = 1;
  id_table_api_schema: number = 1;
  tableSchemaId!: number;
  showAlert:boolean = false;
  isForm?:string;
  isLoading:boolean = true
  

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.actualizarGenerator('modelos').subscribe(
      response => {
        this.waitForHealthCheck(() => {
          this.apiService.actualizarGenerator('serializers').subscribe(
            response => {
              this.isLoading = false;
            },
            error => {
              this.isLoading = false;
            }
          );
        });
      },
      error => {
        this.isLoading = false;
      }
    );
  }
  


  waitForHealthCheck(callback: () => void) {
    const intervalId = setInterval(() => {
      this.apiService.healthCheck().subscribe(response => {
        if (response.status === 'OK') {
          clearInterval(intervalId);
          callback();
        }
      }, error => {
        console.error('Health check failed:', error);
      });
    }, 1000);
  }

  onSubmit(currentPage: number) {
    this.selectedItems = []
    this.apiService.searchTableData(
      this.api_path,
      this.table_name,
      currentPage,
      this.criteria_group
    ).subscribe((data: any) => {
      console.log(data)
      this.responseData = data;
      this.processData();
    });
  }
  
  processData() {
    if (this.responseData.length > 0) {
      this.fieldNames = this.responseData;
    }
  }

  crearForm(){}

  showSelectedItem(index: number) {
    const selectedItem = this.fieldNames[index];
    if (!this.selectedItems.includes(selectedItem)) 
      this.selectedItems.push(selectedItem);
  }

  selectAll() {
    this.selectedItems = []
    this.responseData.forEach(element => {
      this.selectedItems.push(element)
    });
  }

  capitalizeFirstLetter(text: string): string {
    return text
    .split(/(?=[A-Z])|[_\s]/) 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
    .join(' ');
  }
  
  createTableSchemaAndHeadersAndForm() {
    this.isLoading = true;
    const requestBody = {
      table_key_name: this.api_table_name,
      api_path: this.api_path,
      pagination: 1,
      editable: 1,
      deletable: 0
    };

    this.apiService.createTableSchema(requestBody).subscribe(
      schemaResponse => {
        this.tableSchemaId = schemaResponse.id;
        console.log('TableSchema created with ID:', this.tableSchemaId);

        if (this.tableSchemaId) {
          this.selectedItems.forEach(item => {
            const headerRequest = {
              id_table_api_schema: this.tableSchemaId,
              header_key: item,
              display_name: this.capitalizeFirstLetter(item)
            };

            this.apiService.createTableHeaders(headerRequest).subscribe(
              response => {
                console.log(`TableApiHeader created successfully for ${item}:`, response);
                this.showAlertMessage();
                this.clearAll();
              },
              error => {
                console.error(`Error creating TableApiHeader for ${item}:`, error);
              }
            );
          });
        }

        //////////////////////////////////////////////////////////////////////////
        /////////////////// actualizar modelos y serializers
        this.apiService.actualizarGenerator('modelos').subscribe(
          response => {
            this.waitForHealthCheck(() => {
              this.apiService.actualizarGenerator('serializers').subscribe(
                response => {
                  const RequestBodyForm = {
                    table_name: this.table_name
                  };

                  if (this.isForm === 'Si') {
                    this.apiService.createFormWithFields(RequestBodyForm).subscribe(
                      response => {
                        console.log(`Form created successfully for:`, response);
                        this.waitForHealthCheck(() => {
                          this.apiService.actualizarGenerator('modelos').subscribe(
                            response => {
                              this.waitForHealthCheck(() => {
                                this.apiService.actualizarGenerator('serializers').subscribe(
                                  response => {
                                    this.waitForHealthCheck(() => {
                                      this.apiService.actualizarGenerator('controllers').subscribe(
                                        response => {
                                          this.waitForHealthCheck(() => {
                                            this.apiService.actualizarGenerator('urls').subscribe(
                                              response => {
                                                this.isLoading = false;
                                              },
                                              error => {
                                                this.isLoading = false;
                                              }
                                            );
                                          });
                                        },
                                        error => {
                                          this.isLoading = false;
                                        }
                                      );
                                    });
                                  },
                                  error => {
                                    this.isLoading = false;
                                  }
                                );
                              });
                            },
                            error => {
                              this.isLoading = false;
                            }
                          );
                        });
                      },
                      error => {
                        this.isLoading = false;
                      }
                      
                    );
                  }
                })
            })
          })
      });

      

  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onSubmit(this.currentPage);
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onSubmit(this.currentPage);
    }
  }
  
  get totalPages(): number {
    return 1;
  }

  showAlertMessage() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }

  clearAll(){
    this.fieldNames = [],
    this.selectedItems = []
  }
}