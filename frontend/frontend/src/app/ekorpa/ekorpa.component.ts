import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Narudzba } from '../models/narudzba';
import { FakturaService } from '../services/faktura.service';
import { JavnaNabavkaService } from '../services/javna-nabavka.service';

@Component({
  selector: 'app-ekorpa',
  imports: [RouterLink],
  templateUrl: './ekorpa.component.html',
  styleUrl: './ekorpa.component.css',
})
export class EkorpaComponent {
  korpa: Narudzba[] = []
  stamparije: string[] = []
  message = ""

  private router = inject(Router)
  private fakturaService = inject(FakturaService)
  private javnaNabavkaService = inject(JavnaNabavkaService)

  ngOnInit() {
    let s = localStorage.getItem('korpa')
    this.korpa = s ? JSON.parse(s) : []
    this.stamparije = []
    for (let st of this.korpa) {
      if (!this.stamparije.includes(st.stamparKorIme)) {
        this.stamparije.push(st.stamparKorIme)
      }
    }
  }


  stavke(korIme: string): Narudzba[] {
    return this.korpa.filter(st => st.stamparKorIme === korIme)
  }

  ukupnoZaStampariju(korIme: string): number {
    return this.stavke(korIme).reduce((zbir, st) => zbir + st.cena, 0)
  }

  ukloni(index: number) {
    this.korpa.splice(index, 1)
    localStorage.setItem('korpa', JSON.stringify(this.korpa))
    let s = localStorage.getItem('korpa')
    this.korpa = s ? JSON.parse(s) : []
    this.stamparije = []
    for (let st of this.korpa) {
      if (!this.stamparije.includes(st.stamparKorIme)) {
        this.stamparije.push(st.stamparKorIme)
      }
    }
  }

  // potvrdi() {
  //   let s = localStorage.getItem('loggedUser')
  //   let korisnik = s ? JSON.parse(s) : null

  //   this.fakturaService.potvrdi(this.korpa, korisnik.kor_ime).subscribe(res => {
  //     if (res.uspeh) {
  //       localStorage.removeItem('korpa')
  //       this.korpa = []
  //       this.stamparije = []
  //       this.message = "Narudzbina uspesno kreirana"
  //       this.router.navigate(['/klijent-narudzbine'])
  //     } else {
  //       this.message = res.poruka
  //     }
  //   })
  // }
  potvrdi() {
    let s = localStorage.getItem('loggedUser')
    let korisnik = s ? JSON.parse(s) : null

    if (korisnik.uloga == 'klijent' && korisnik.tip == 'pravno') {
      this.javnaNabavkaService.kreiraj(this.korpa, korisnik.kor_ime).subscribe(res => {
        if (res.uspeh) {
          localStorage.removeItem('korpa')
          this.korpa = []
          this.stamparije = []
          this.message = "Javna nabavka raspisana"
          this.router.navigate(['/klijent-nabavke'])
        } else {
          this.message = res.poruka
        }
      })
      return
    }

    this.fakturaService.potvrdi(this.korpa, korisnik.kor_ime).subscribe(res => {
      if (res.uspeh) {
        localStorage.removeItem('korpa')
        this.korpa = []
        this.stamparije = []
        this.message = "Narudzbina uspesno kreirana"
        this.router.navigate(['/klijent-meni'])
      } else {
        this.message = res.poruka
      }
    })
  }
}
