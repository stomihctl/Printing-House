import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProizvodService } from '../services/proizvod.service';
import { KategorijaService } from '../services/kategorija.service';
import { Kategorija } from '../models/kategorija';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-stampar-proizvodi',
  imports: [FormsModule, RouterLink],
  templateUrl: './stampar-proizvodi.component.html',
  styleUrl: './stampar-proizvodi.component.css',
})
export class StamparProizvodiComponent implements OnInit {
  kategorije: Kategorija[] = []
  korIme = ""
  korisnik: Korisnik = new Korisnik

  naziv = ""
  cena = 0
  opis = ""
  slika = ""
  kol = 0
  kat = ""
  podkat = ""
  boja = "#ffffff"
  boje: string[] = []
  message = ""

  tipStamp = ""
  dodatnaCena = 0
  maxS = 0
  maxV = 0
  uslugeStampe: Array<{ tipStampe: string, dodatnaCena: number, maxSirina: number, maxVisina: number }> = []

  private proizvodService = inject(ProizvodService)
  private kategorijaService = inject(KategorijaService)

  ngOnInit() {
    let s = localStorage.getItem("loggedUser")
    this.korisnik = JSON.parse(s!)

    this.korIme = this.korisnik.kor_ime
    this.kategorijaService.dohvSveKat().subscribe(res => {
      this.kategorije = res
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (!file) {
      return
    }

    const dozvoljeniFormati = ['image/jpeg', 'image/png', 'image/gif']
    if (!dozvoljeniFormati.includes(file.type)) {
      this.message = "Slika mora biti JPG, PNG ili GIF format"
      return
    }

    const img = new Image()
    const reader = new FileReader()

    reader.onload = () => {
      img.onload = () => {
        if (img.width < 100 || img.height < 100 || img.width > 250 || img.height > 250) {
          this.message = "Slika mora biti minimalno 100x100, a maksimalno 250x250 px"
          return
        }
        this.slika = reader.result as string
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  trenKat(): Kategorija | undefined {
    return this.kategorije.find(k => k.naziv == this.kat)
  }

  dodajBoju() {
    if (this.boja && !this.boje.includes(this.boja)) {
      this.boje.push(this.boja)
    }
  }

  dodajUslugu() {
    if (this.tipStamp != '') {
      this.uslugeStampe.push({
        tipStampe: this.tipStamp,
        dodatnaCena: this.dodatnaCena,
        maxSirina: this.maxS,
        maxVisina: this.maxV
      })
      this.tipStamp = ""
      this.dodatnaCena = 0
      this.maxS = 0
      this.maxV = 0
    }
  }

  dodajProizvod() {
    this.proizvodService.dodajProiz(
      this.naziv, this.opis, this.kat, this.podkat,
      this.cena, this.kol, this.boje, this.slika,
      this.uslugeStampe, this.korIme
    ).subscribe(res => {
      if (res.uspeh) {
        this.naziv = ""
        this.cena = 0
        this.opis = ""
        this.slika = ""
        this.kol = 0
        this.kat = ""
        this.podkat = ""
        this.boje = []
        this.uslugeStampe = []
        this.message = "Proizvod uspesno dodat"
      } else {
        this.message = res.poruka
      }
    })
  }
}