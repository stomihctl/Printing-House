import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-stampar-mojprofil',
  imports: [FormsModule, RouterLink],
  templateUrl: './stampar-mojprofil.component.html',
  styleUrl: './stampar-mojprofil.component.css',
})
export class StamparMojprofilComponent {
  korisnik: Korisnik = new Korisnik
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

  ngOnInit() {
    let s = localStorage.getItem("loggedUser")
    this.korisnik = JSON.parse(s!)

    this.id = this.korisnik._id
    this.kor_ime = this.korisnik.kor_ime
    this.uloga = this.korisnik.uloga
    this.tip = this.korisnik.tip
    this.ime = this.korisnik.ime
    this.prezime = this.korisnik.prezime
    this.telefon = this.korisnik.telefon
    this.mejl = this.korisnik.mejl
    this.nazivInstitucije = this.korisnik.nazivInstitucije
    this.adresaSedista = this.korisnik.adresaSedista
    this.maticniBroj = this.korisnik.maticniBroj
    this.pib = this.korisnik.pib
    this.slika = this.korisnik.profilnaSlika
    this.status = this.korisnik.status
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
        this.korisnikService.dohvKor(this.id).subscribe(k => {
          localStorage.setItem('loggedUser', JSON.stringify(k))
        })
        this.message = "Profil uspesno azuriran"
      } else {
        this.message = res.poruka
      }
    })
  }
}
