import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JavnaNabavkaService } from '../services/javna-nabavka.service';
import { JavnaNabavka } from '../models/javnaNabavka';

@Component({
  selector: 'app-stampar-licitacije',
  imports: [FormsModule, RouterLink],
  templateUrl: './stampar-licitacije.component.html',
  styleUrl: './stampar-licitacije.component.css',
})
export class StamparLicitacijeComponent {
  nabavke: JavnaNabavka[] = []
  korIme = ""
  message = ""

  cene: { [id: string]: { [naziv: string]: number } } = {}

  private javnaNabavkaService = inject(JavnaNabavkaService)

  ngOnInit() {
    let s = localStorage.getItem('loggedUser')
    let korisnik = s ? JSON.parse(s) : null
    this.korIme = korisnik.kor_ime

    this.ucitaj()
  }

  ucitaj() {
    this.javnaNabavkaService.otvorene().subscribe(res => {
      this.nabavke = res

      for (let n of this.nabavke) {
        if (!this.cene[n._id]) {
          this.cene[n._id] = {}
        }
        for (let p of n.proizvodi) {
          if (!this.cene[n._id][p.naziv]) {
            this.cene[n._id][p.naziv] = 0
          }
        }
      }
    })
  }

  posaljiPonudu(n: JavnaNabavka) {
    let stavke = []
    for (let p of n.proizvodi) {
      let cena = this.cene[n._id][p.naziv]
      if (!cena || cena <= 0) {
        this.message = "Sve cene moraju biti vece od 0"
        return
      }
      stavke.push({ naziv: p.naziv, cena: cena })
    }

    this.javnaNabavkaService.posaljiPonudu(n._id, this.korIme, stavke).subscribe(res => {
      if (res.uspeh) {
        this.message = "Ponuda poslata"
        this.ucitaj()
      } else {
        this.message = res.poruka
      }
    })
  }
}
