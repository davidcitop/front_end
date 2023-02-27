import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Urlconstante } from '../urlconstante';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioService {

  private urlEndPoint:string = Urlconstante.URL+'api/usuarios'

  constructor(private http:HttpClient, private router: Router) { }

  getAllUsuarios(): Observable<Usuario[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response=>{
        let usuarios = response as Usuario[];
        return usuarios.map(usuario=>{
         // usuario.usuNombre = usuario.usuNombre.toUpperCase();
         // usuario.usuFecha = formatDate(usuario.usuFecha, 'dd-MM-yyyy', 'es'); EEEE decimalDigest, MMMM yyyy Fecha personalizada
          return usuario;
        });
      })
    );
  }

  create(usuario: Usuario): Observable<any>{
    return this.http.post<any>(this.urlEndPoint, usuario).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al crear usuario", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  getUsuario(usuCodigo): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${usuCodigo}`).pipe(
      catchError(e=>{
        if(e.status != 401){
          this.router.navigate(['/usuarios'])
          Swal.fire("Error al obtener usuario", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }
  update(usuario: Usuario): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.usuCodigo}`, usuario).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al actualizar usuario", e.error.mensaje,'error');
        }
        return throwError(e);

      })
    );
  }

  delete(usuCodigo: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${usuCodigo}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          Swal.fire("Error al eliminar usuario", e.error.mensaje,'error');
        }
        return throwError(e);
      })
    );
  }

}
