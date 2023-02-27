import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignaturaComponent } from './component/asignatura/asignatura.component';
import { AulaComponent } from './component/aula/aula.component';
import { DocenteComponent } from './component/docente/docente.component';
import { FormhorarioComponent } from './component/horario/formulario/formhorario.component';
import { HorarioComponent } from './component/horario/horario.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'horarios', component:HorarioComponent},
  {path:'asignaturas', component:AsignaturaComponent},
  {path:'aulas', component:AulaComponent},
  {path:'docentes', component:DocenteComponent},
  {path:'login', component:LoginComponent},
  {path:'horarios/formulario/formhorario/:horCodigo', component:FormhorarioComponent},
  {path:'horarios/formulario/formhorario', component:FormhorarioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
