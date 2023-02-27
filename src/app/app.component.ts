import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HorarioSEK';

  constructor(public authService: AuthService,
    private router: Router){
  }

  logout():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
