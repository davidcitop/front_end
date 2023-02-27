import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Usuario } from 'src/app/service/usuario/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titulo: String='Iniciar Sesion'
  usuario: Usuario;

  constructor(public authService: AuthService,
    private router: Router) {
    this.usuario = new Usuario();

   }

  ngOnInit(): void {
      if(this.authService.isAuthenticated()){
        Swal.fire('Login', `Hola ${this.authService.usuario.usuNombre} ya estas autenticado!`, 'info')
        this.router.navigate(['/horarios'])
      }
  }

  login():void{
    if(this.usuario.usuCodigo == null || this.usuario.usuContrasena==null){
      Swal.fire("Error login", "Usuario o Contrasena es incorrecta");
      return;
    }
    this.authService.login(this.usuario).subscribe(response=>{
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/horarios']);
      Swal.fire('Login', `Hola ${usuario.usuNombre}, has iniciado sesion con exito!`, 'success');
    },err =>{
      if(err.status==400){
        Swal.fire('Error login', 'Usuario o Contrasena incorrectas!','error')
      }
    });
  }

}
