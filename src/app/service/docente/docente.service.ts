import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Urlconstante } from '../urlconstante';
import { Docente } from './docente';

@Injectable()
export class DocenteService {

  private urlEndPoint:string = Urlconstante.URL+'api/docentes'

  constructor(private http:HttpClient, private router: Router) { }

  getAllDocentes(): Observable<Docente[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response=>{
        let docentes = response as Docente[];
        return docentes.map(docente=>{
         // usuario.usuNombre = usuario.usuNombre.toUpperCase();
         // usuario.usuFecha = formatDate(usuario.usuFecha, 'dd-MM-yyyy', 'es'); EEEE decimalDigest, MMMM yyyy Fecha personalizada
          return docente;
        });
      })
    );
  }

  create(docente: Docente): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, docente).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al crear docente", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  getDocente(docCodigo): Observable<Docente>{
    return this.http.get<Docente>(`${this.urlEndPoint}/${docCodigo}`).pipe(
      catchError(e=>{
        if(e.status != 401){
          this.router.navigate(['/docentes'])
          Swal.fire("Error al obtener docente", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }
  update(docente: Docente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${docente.docCodigo}`, docente).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al actualizar docente", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  delete(docCodigo: string): Observable<Docente>{
    return this.http.delete<Docente>(`${this.urlEndPoint}/${docCodigo}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al eliminar docente", e.error.mensaje,'error');
        }
        return throwError(e);
      })
    );
  }

}
