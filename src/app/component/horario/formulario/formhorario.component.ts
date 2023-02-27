import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from 'src/app/service/asignatura/asignatura';
import { AsignaturaService } from 'src/app/service/asignatura/asignatura.service';
import { Aula } from 'src/app/service/aula/aula';
import { AulaService } from 'src/app/service/aula/aula.service';
import { Docente } from 'src/app/service/docente/docente';
import { DocenteService } from 'src/app/service/docente/docente.service';
import { Horario } from 'src/app/service/horario/horario';
import { HorarioService } from 'src/app/service/horario/horario.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-formhorario',
  templateUrl: './formhorario.component.html',
  styleUrls: ['./formhorario.component.css']
})
export class FormhorarioComponent implements OnInit {

  horario: Horario= new Horario()

  asignaturas: Asignatura[];
  aulas: Aula[];
  docentes: Docente[];
  isAddMode: boolean;
  @ViewChild('picker') picker: any;
  @ViewChild('picker') picker2: any;

  public disabled = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;

  constructor(private horarioService: HorarioService,
    private asignaturaService: AsignaturaService,
    private aulaService: AulaService,
    private docenteService: DocenteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarHorario();
  }
  
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  cargarHorario(): void{
    this.activatedRoute.params.subscribe(params =>{
      let horCodigo = params['horCodigo']
      this.isAddMode = horCodigo;
      this.asignaturaService.getAllAsignaturas().subscribe(asignaturas=>this.asignaturas = asignaturas);
      this.aulaService.getAllAulas().subscribe(aulas=>this.aulas = aulas);
      this.docenteService.getAllDocentes().subscribe(docentes=>this.docentes = docentes);

      if(horCodigo){
        this.isAddMode==true;
        this.horarioService.getHorario(horCodigo).subscribe((horario) => this.horario = horario);
      }else{
        this.isAddMode==false;
      }

    })
  }

  public create(): void{


    if(this.horario.horCodigo==null){
      Swal.fire('Aula Ocupada', `No se puede asignar un horario a esa aula`, 'warning')

    }else{
      this.horarioService.create(this.horario).subscribe(
        json => {
          this.router.navigate(['/horarios'])
          Swal.fire('Nuevo Horario', `${json.horario.horCodigo}: ${json.mensaje}`, 'success')
        }
      );

    }

    
  }
  update():void{
    this.horarioService.update(this.horario).subscribe(json=>{
      this.router.navigate(['/horarios'])
      Swal.fire('Horario Actualizado', `Cliente ${json.horario.horCodigo} actualizado con éxito!`, 'success')

    })
  }

  compararAsignatura(o1:Asignatura, o2:Asignatura): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 ===null || o2===null || o1===undefined || o2 ===undefined ? false : o1.asgCodigo===o2.asgCodigo;
  }
  compararAula(o1:Aula, o2:Aula): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 ===null || o2===null || o1===undefined || o2 ===undefined ? false : o1.aulCodigo===o2.aulCodigo;
  }
  compararDocente(o1:Docente, o2:Docente): boolean{
    if(o1===undefined && o2===undefined){
      return true;
    }
    return o1 ===null || o2===null || o1===undefined || o2 ===undefined ? false : o1.docCodigo===o2.docCodigo;
  }
}
