import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Urlconstante } from '../urlconstante';
import { Aula } from './aula';

@Injectable()
export class AulaService {

  private urlEndPoint:string = Urlconstante.URL+'api/aulas'

  constructor(private http:HttpClient, private router: Router) { }

  getAllAulas(): Observable<Aula[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response=>{
        let aulas = response as Aula[];
        return aulas.map(aula=>{
         // usuario.usuNombre = usuario.usuNombre.toUpperCase();
         // usuario.usuFecha = formatDate(usuario.usuFecha, 'dd-MM-yyyy', 'es'); EEEE decimalDigest, MMMM yyyy Fecha personalizada
          return aula;
        });
      })
    );
  }

  create(aula: Aula): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, aula).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al crear aula", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  getAula(aulCodigo): Observable<Aula>{
    return this.http.get<Aula>(`${this.urlEndPoint}/${aulCodigo}`).pipe(
      catchError(e=>{
        if(e.status != 401){
          this.router.navigate(['/aulas'])
          Swal.fire("Error al obtener aula", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }
  update(aula: Aula): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${aula.aulCodigo}`, aula).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al actualizar aula", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  delete(aulCodigo: string): Observable<Aula>{
    return this.http.delete<Aula>(`${this.urlEndPoint}/${aulCodigo}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al eliminar aula", e.error.mensaje,'error');
        }
        return throwError(e);
      })
    );
  }


}
