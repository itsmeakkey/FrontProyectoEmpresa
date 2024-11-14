// src/app/app.routes.ts
import { Routes } from '@angular/router';
//Esto es cada sección o página 
import { InicioComponent } from './pages/inicio/inicio.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { JefesComponent } from './pages/jefes/jefes.component';
import { TareasComponent } from './pages/tareas/tareas.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'departamentos', component: DepartamentosComponent},
  { path: 'empleados', component: EmpleadosComponent},
  { path: 'jefes', component: JefesComponent},
  { path: 'tareas', component: TareasComponent},
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' } // Maneja las rutas no encontradas
];