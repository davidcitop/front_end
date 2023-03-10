import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService,
    private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      }

      let role = route.data['role'] as string;
      console.log(role);

      if(this.authService.hasRole(role)){
        return true;
      }
      Swal.fire('Acceso Denegado','No tienes acceso a la ruta','warning');
      this.router.navigate(['/horarios']);
    return false;
  }
}
