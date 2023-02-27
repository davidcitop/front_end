import { NgModule,CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsignaturaComponent } from './component/asignatura/asignatura.component';
import { AulaComponent } from './component/aula/aula.component';
import { DocenteComponent } from './component/docente/docente.component';
import { HorarioComponent } from './component/horario/horario.component';
import { LoginComponent } from './component/login/login.component';
import { FormasignaturaComponent } from './component/asignatura/formulario/formasignatura.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFilterPipe } from './component/search-filter-pipe';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AsignaturaService } from './service/asignatura/asignatura.service';
import { AulaService } from './service/aula/aula.service';
import { DocenteService } from './service/docente/docente.service';
import { HorarioService } from './service/horario/horario.service';
import { UsuarioService } from './service/usuario/usuario.service';
import { TokenInterceptor } from './service/usuario/interceptor/token.interceptor';
import { AuthInterceptor } from './service/usuario/interceptor/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormhorarioComponent } from './component/horario/formulario/formhorario.component';
import { NgxMatDateAdapter, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatMomentModule, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    AsignaturaComponent,
    AulaComponent,
    DocenteComponent,
    HorarioComponent,
    LoginComponent,
    SearchFilterPipe,
    FormasignaturaComponent,
    FormhorarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    MatSliderModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,      
    NgxMatDatetimePickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule

  ],
  providers: [AsignaturaService,AulaService,DocenteService,HorarioService,UsuarioService,  
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})


export class AppModule { }
