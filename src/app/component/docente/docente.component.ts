import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Docente } from 'src/app/service/docente/docente';
import { DocenteService } from 'src/app/service/docente/docente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  docentes: Docente[];
  paginador: any;
  docenteSeleccionado: Docente;
  searchText: string;
  totalElements!: number;

  constructor(private docenteService: DocenteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.docenteService.getAllDocentes().subscribe((docentes) => this.docentes = docentes)

  }
  delete(docente: Docente): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro de eliminar el docente ${docente.docCodigo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.docenteService.delete(docente.docCodigo).subscribe(
          response=>{
            this.docentes = this.docentes.filter(cli=>cli !== docente)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Docente ${docente.docNombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })

  }
}
