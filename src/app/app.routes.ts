import { Routes } from '@angular/router';
import { FormularioComponent } from './lib/formulario/formulario.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'formulario'},
    {
      path: 'formulario',
      component: FormularioComponent,
      title: 'Formulario',
    },
    {path:'**', pathMatch:'full',redirectTo:'formulario'}
  ];
  
