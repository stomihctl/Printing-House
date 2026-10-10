import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KorisnikService } from '../services/korisnik.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  uloga = "klijent"
  tip = "fizicko"
  kor_ime = ""
  lozinka = ""
  ime = ""
  prezime = ""
  telefon = ""
  mejl = ""
  nazivInstitucije = ""
  adresaSedista = ""
  maticniBroj = ""
  pib = ""
  slika = "" 
  message = ""

  private korisnikService = inject(KorisnikService)
  private router = inject(Router)

  obradiSlik(evt: any) {
    const fajl = evt.target.files[0]
    if (!fajl) {
      return
    }

    const podrzTip = ['image/jpeg', 'image/png', 'image/gif']
    if (!podrzTip.includes(fajl.type)) {
      this.message = "Dozvoljeni formati su JPG, PNG i GIF"
      return
    }

    const pomSlika = new Image()
    const citac = new FileReader()

    citac.onload = () => {
      pomSlika.onload = () => {
        const sir = pomSlika.width >= 100 && pomSlika.width <= 250
        const vis = pomSlika.height >= 100 && pomSlika.height <= 250

        if (!sir || !vis) {
          this.message = "Dimenzije slike moraju biti izmedju 100x100 i 250x250 px"
          return
        }
        this.slika = citac.result as string
      }
      pomSlika.src = citac.result as string
    }
    citac.readAsDataURL(fajl)
  }

  register() {
    this.korisnikService.register(
      this.kor_ime,
      this.lozinka,
      this.uloga,
      this.tip,
      this.ime,
      this.prezime,
      this.telefon,
      this.mejl,
      this.nazivInstitucije,
      this.adresaSedista,
      this.maticniBroj,
      this.pib,
      this.slika
    ).subscribe(res => {
      if (res && res.uspeh) {
        this.message = "Registracija uspesna, ceka odobrenje administratora"
        this.router.navigate(['/login'])
      }
      else {
        this.message = res?.poruka || "Greska pri registraciji"
      }
    })
  }
}