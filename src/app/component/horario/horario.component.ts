import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Horario } from 'src/app/service/horario/horario';
import { HorarioService } from 'src/app/service/horario/horario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  horarios: Horario[];
  paginador: any;
  horarioSeleccionado: Horario;
  searchText: string;
  totalElements!: number;
  constructor(private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.horarioService.getAllHorarios().subscribe((horarios) => this.horarios = horarios)

  }

  delete(horario: Horario): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro de eliminar el horario ${horario.horCodigo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioService.delete(horario.horCodigo).subscribe(
          response=>{
            this.horarios = this.horarios.filter(cli=>cli !== horario)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Horario ${horario.horCodigo} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })

  }

}
