import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProizvodService } from '../services/proizvod.service';
import { Proizvod } from '../models/proizvod';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-stampar-azuriraj',
  imports: [FormsModule, RouterLink],
  templateUrl: './stampar-azuriraj.component.html',
  styleUrl: './stampar-azuriraj.component.css',
})
export class StamparAzurirajComponent {
  korisnik: Korisnik = new Korisnik
  proizvodi: Proizvod[] = []
  message = ""
  korIme = ""

  private proizvodService = inject(ProizvodService)

  ngOnInit() {
    let s = localStorage.getItem("loggedUser")
    this.korisnik = JSON.parse(s!)
    this.korIme = this.korisnik.kor_ime
    this.ucitajProizvode()
  }

  ucitajProizvode() {
    this.proizvodService.dohvProizOdStamp(this.korIme).subscribe(res => {
      this.proizvodi = res
    })
  }

  azurirajKolicinu(id: string, kolicina: number) {
    this.proizvodService.azurirajKol(id, kolicina).subscribe(res => {
      this.ucitajProizvode()
      this.message = res.poruka
    })
  }
}
