import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-korisnik-edit',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-korisnik-edit.component.html',
  styleUrl: './admin-korisnik-edit.component.css',
})
export class AdminKorisnikEditComponent {
  id = ""
  kor_ime = ""
  uloga = ""
  tip = ""
  ime = ""
  prezime = ""
  telefon = ""
  mejl = ""
  nazivInstitucije = ""
  adresaSedista = ""
  maticniBroj = ""
  pib = ""
  slika = ""
  status = ""
  message = ""

  private korisnikService = inject(KorisnikService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.korisnikService.dohvKor(this.id).subscribe(k => {
      this.kor_ime = k.kor_ime
      this.uloga = k.uloga
      this.tip = k.tip
      this.ime = k.ime
      this.prezime = k.prezime
      this.telefon = k.telefon
      this.mejl = k.mejl
      this.nazivInstitucije = k.nazivInstitucije
      this.adresaSedista = k.adresaSedista
      this.maticniBroj = k.maticniBroj
      this.pib = k.pib
      this.slika = k.profilnaSlika
      this.status = k.status
    })
  }

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

  izmeni() {
    this.korisnikService.izmeniKorisnika(
      this.id, this.kor_ime, this.uloga, this.tip, this.ime, this.prezime, this.telefon, this.mejl,
      this.nazivInstitucije, this.adresaSedista, this.maticniBroj, this.pib,
      this.slika, this.status
    ).subscribe(res => {
      if (res.uspeh) {
        this.router.navigate(['/admin-korisnici'])
      } else {
        this.message = res.poruka
      }
    })
  }
}
