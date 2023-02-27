import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urlconstante } from '../urlconstante';
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;


  constructor(
    private http: HttpClient) { }

    public get usuario(): Usuario{

      if(this._usuario != null){
        return this._usuario;
      }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
        this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
        return this._usuario;
      }
        return new Usuario();
    }

    public get token(): string{
      if(this._token != null){
        return this._token;
      }else if(this._token == null && sessionStorage.getItem('token') != null){
        this._token = sessionStorage.getItem('token');
        return this._token;
      }
      return null;
    }

  login(usuario: Usuario): Observable<any>{
    const urlEndpoint = Urlconstante.URL+'oauth/token';
    const credenciales = btoa('servipack' + ':' + 'libre23.');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', usuario.usuCodigo);
    params.set('password', usuario.usuContrasena);
    return this.http.post(urlEndpoint, params.toString(), {headers: httpHeaders});

  }

  guardarUsuario(accesToken: string): void{
    let payload = this.obtenerDatosPayload(accesToken);
    this._usuario = new Usuario();
    this._usuario.usuCodigo = payload.user_name;
    this._usuario.usuNombre = payload.nombre_usuario;
    this._usuario.roles = payload.authorities;

    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));

  }

  guardarToken(accesToken: string): void{

    this._token = accesToken;
    sessionStorage.setItem('token',accesToken);

  }

  obtenerDatosPayload(accesToken: string): any{

    if(accesToken != null){
      return JSON.parse(atob(accesToken.split(".")[1]));

    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosPayload(this.token);

    if(payload!= null && payload.user_name && payload.user_name.length>0){
      return true;

    }
    return false;

  }

  hasRole(role: string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }

  logout():void{
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
   // sessionStorage.removeItem('token');
    //sessionStorage.removeItem('usuario');

  }
}
