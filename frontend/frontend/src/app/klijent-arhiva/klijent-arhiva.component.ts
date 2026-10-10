import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FakturaService } from '../services/faktura.service';
import { ProizvodService } from '../services/proizvod.service';
import { Faktura } from '../models/faktura';

@Component({
  selector: 'app-klijent-arhiva',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './klijent-arhiva.component.html',
  styleUrl: './klijent-arhiva.component.css',
})
export class KlijentArhivaComponent implements OnInit {
  stavke: any[] = []
  korIme = ""
  sortPolje = ""
  sortSmer = 1
  message = ""

  noviKomentar: { [id: string]: string } = {}

  private fakturaService = inject(FakturaService)
  private proizvodService = inject(ProizvodService)

  ngOnInit() {
    let s = localStorage.getItem('loggedUser')
    let korisnik = s ? JSON.parse(s) : null
    this.korIme = korisnik.kor_ime

    this.ucitaj()
  }

  ucitaj() {
    this.fakturaService.mojeNarudzbine(this.korIme).subscribe((fakture: Faktura[]) => {
      this.stavke = []

      for (let f of fakture) {
        if (f.status == 'isporuceno' || f.status == 'primljeno') {
          for (let p of f.proizvodi) {
            this.stavke.push({
              fakturaId: f._id,
              datum: f.datum,
              stamparKorIme: f.stamparKorIme,
              status: f.status,
              proId: p.proId,
              naziv: p.naziv,
              kolicina: p.kolicina,
              lajkovano: false,
              komentarisano: false
            })
          }
        }
      }

      this.ucitajOznake()
      this.sortiraj('datum')
    })
  }

  ucitajOznake() {
    for (let st of this.stavke) {
      this.proizvodService.det(st.proId).subscribe(p => {
        st.lajkovano = p.lajkovaliKorisnici.includes(this.korIme) || p.nesvidjaliKorisnici.includes(this.korIme)
        st.komentarisano = p.komentari.some((k: any) => k.korIme == this.korIme)
      })
    }
  }

  sortiraj(polje: string) {
    if (this.sortPolje == polje) {
      this.sortSmer = this.sortSmer * -1
    } else {
      this.sortPolje = polje
      this.sortSmer = 1
    }

    this.stavke.sort((a: any, b: any) => {
      if (a[polje] < b[polje]) return -1 * this.sortSmer
      if (a[polje] > b[polje]) return 1 * this.sortSmer
      return 0
    })
  }

  primi(fakturaId: string) {
    this.fakturaService.primi(fakturaId).subscribe(res => {
      this.ucitaj()
    })
  }

  svidi(st: any) {
    this.proizvodService.svidi(st.proId, this.korIme).subscribe(res => {
      if (res.uspeh) {
        st.lajkovano = true
      } else {
        this.message = res.poruka
      }
    })
  }

  nesvidi(st: any) {
    this.proizvodService.nesvidi(st.proId, this.korIme).subscribe(res => {
      if (res.uspeh) {
        st.lajkovano = true
      } else {
        this.message = res.poruka
      }
    })
  }

  komentarisi(st: any) {
    let tekst = this.noviKomentar[st.proId]
    if (!tekst) return

    this.proizvodService.komentarisi(st.proId, this.korIme, tekst).subscribe(res => {
      if (res.uspeh) {
        this.noviKomentar[st.proId] = ""
        st.komentarisano = true
      } else {
        this.message = res.poruka
      }
    })
  }
}