import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Urlconstante } from '../urlconstante';
import { Asignatura } from './asignatura';

@Injectable()
export class AsignaturaService {

  private urlEndPoint:string = Urlconstante.URL+'api/asignaturas'

  constructor(private http:HttpClient, private router: Router) { }

  getAllAsignaturas(): Observable<Asignatura[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response=>{
        let asignaturas = response as Asignatura[];
        return asignaturas.map(asignatura=>{
         // usuario.usuNombre = usuario.usuNombre.toUpperCase();
         // usuario.usuFecha = formatDate(usuario.usuFecha, 'dd-MM-yyyy', 'es'); EEEE decimalDigest, MMMM yyyy Fecha personalizada
          return asignatura;
        });
      })
    );
  }

  create(asignatura: Asignatura): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, asignatura).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al crear asignatura", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  getAsignatura(asgCodigo): Observable<Asignatura>{
    return this.http.get<Asignatura>(`${this.urlEndPoint}/${asgCodigo}`).pipe(
      catchError(e=>{
        if(e.status != 401){
          this.router.navigate(['/asignaturas'])
          Swal.fire("Error al obtener asignatura", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }
  update(asignatura: Asignatura): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${asignatura.asgCodigo}`, asignatura).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al actualizar asignatura", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  delete(asgCodigo: string): Observable<Asignatura>{
    return this.http.delete<Asignatura>(`${this.urlEndPoint}/${asgCodigo}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al eliminar asignatura", e.error.mensaje,'error');
        }
        return throwError(e);
      })
    );
  }



}
