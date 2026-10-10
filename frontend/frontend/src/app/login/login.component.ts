import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KorisnikService } from '../services/korisnik.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = ""
  password = ""
  // korisnik = ""
  message = ""
  korisnik: any = null

  private korisnikService = inject(KorisnikService)
  private router = inject(Router)

  login(){
    this.korisnikService.login(this.username, this.password).subscribe(user => {
      if(user && user.uloga){
        this.korisnik = user
        localStorage.setItem('loggedUser', JSON.stringify(user))
        if(user.uloga == "klijent"){
          this.router.navigate(['/klijent-pocetna'])
        }
        else if(user.uloga == "stampar"){
          this.router.navigate(['/stampar-meni'])
        }
      }
      else{
        this.message = user.poruka
      }
    })
  }

}
