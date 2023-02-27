import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Urlconstante } from '../urlconstante';
import { Horario } from './horario';

@Injectable()
export class HorarioService {

  private urlEndPoint:string = Urlconstante.URL+'api/horarios'

  constructor(private http:HttpClient, private router: Router) { }

  getAllHorarios(): Observable<Horario[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response=>{
        let horarios = response as Horario[];
        return horarios.map(horario=>{
         // usuario.usuNombre = usuario.usuNombre.toUpperCase();
         // usuario.usuFecha = formatDate(usuario.usuFecha, 'dd-MM-yyyy', 'es'); EEEE decimalDigest, MMMM yyyy Fecha personalizada
          return horario;
        });
      })
    );
  }

  create(horario: Horario): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, horario).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al crear horario", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  getHorario(horCodigo): Observable<Horario>{
    return this.http.get<Horario>(`${this.urlEndPoint}/${horCodigo}`).pipe(
      catchError(e=>{
        if(e.status != 401){
          this.router.navigate(['/horarios'])
          Swal.fire("Error al obtener horario", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }
  update(horario: Horario): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${horario.horCodigo}`, horario).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al actualizar horario", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  delete(horCodigo: number): Observable<Horario>{
    return this.http.delete<Horario>(`${this.urlEndPoint}/${horCodigo}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al eliminar horario", e.error.mensaje,'error');
        }
        return throwError(e);
      })
    );
  }

}
