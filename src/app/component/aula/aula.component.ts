import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aula } from 'src/app/service/aula/aula';
import { AulaService } from 'src/app/service/aula/aula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  aulas: Aula[];
  paginador: any;
  aulaSeleccionado: Aula;
  searchText: string;
  totalElements!: number;

  constructor(private aulaService: AulaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aulaService.getAllAulas().subscribe((aulas) => this.aulas = aulas)

  }
  delete(aula: Aula): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `Seguro de eliminar el Aula ${aula.aulCodigo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.aulaService.delete(aula.aulCodigo).subscribe(
          response=>{
            this.aulas = this.aulas.filter(cli=>cli !== aula)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Aula ${aula.aulNombre} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })

  }
}
