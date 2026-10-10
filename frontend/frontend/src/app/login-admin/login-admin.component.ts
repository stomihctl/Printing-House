import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KorisnikService } from '../services/korisnik.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  imports: [FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent {
  username = ""
  password = ""
  message = ""

  private korisnikService = inject(KorisnikService)
  private router = inject(Router)

  login(){
    this.korisnikService.adminLogin(this.username, this.password).subscribe(user => {
      if(user && user.uloga){
        localStorage.setItem('loggedUser', JSON.stringify(user))
        //this.message = "Admin ulogovan"
        this.router.navigate(['/admin-meni'])
      }
      else{
        this.message = user.poruka
      }
    })
  }

}
