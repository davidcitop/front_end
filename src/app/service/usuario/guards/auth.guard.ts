import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService,
    private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.isAuthenticated()){
        if(this.isTokenExpirador()){
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      }
      this.router.navigate(['/login']);

    return false;
  }

  isTokenExpirador(){
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosPayload(token);
    let now = new Date().getTime()/1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }
  
}
