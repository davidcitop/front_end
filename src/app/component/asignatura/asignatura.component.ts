import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asignatura } from 'src/app/service/asignatura/asignatura';
import { AsignaturaService } from 'src/app/service/asignatura/asignatura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit {

  asignaturas: Asignatura[];
  paginador: any;
  asignaturaSeleccionado: Asignatura;
  searchText: string;
  totalElements!: number;

  constructor(private asignaturaService: AsignaturaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.asignaturaService.getAllAsignaturas().subscribe((asignaturas) => this.asignaturas = asignaturas)

  }
  delete(asignatura: Asignatura): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro de eliminar la Asignatura ${asignatura.asgCodigo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignaturaService.delete(asignatura.asgCodigo).subscribe(
          response=>{
            this.asignaturas = this.asignaturas.filter(cli=>cli !== asignatura)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Asignatura ${asignatura.asgNombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })

  }

}
