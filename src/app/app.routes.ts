import { Routes } from '@angular/router';
import { FormularioComponent } from './lib/formulario/formulario.component';
import { RelationsFormComponent } from './lib/relations-form/relations-form.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'formulario'},
    {
      path: 'formulario',
      component: FormularioComponent,
      title: 'Formulario',
    },
    {
      path: 'relations-form',
      component: RelationsFormComponent,
      title: 'Relations Form',
    },
    {path:'**', pathMatch:'full',redirectTo:'formulario'}
  ];
  
