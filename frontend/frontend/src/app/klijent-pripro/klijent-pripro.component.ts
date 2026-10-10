import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProizvodService } from '../services/proizvod.service';
import { Proizvod } from '../models/proizvod';
import { Narudzba } from '../models/narudzba';

@Component({
  selector: 'app-klijent-pripro',
  imports: [FormsModule, RouterLink],
  templateUrl: './klijent-pripro.component.html',
  styleUrl: './klijent-pripro.component.css',
})
export class KlijentPriproComponent {
  proizvod: Proizvod = new Proizvod
  boja = "#ffffff"

  private proizvodService = inject(ProizvodService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  tekst = ""
  tipS = ""
  dodatnaCena = 0
  kolicina = 1
  message = ""

  ponisti() {
    this.tekst = ""
    this.tipS = ""
    this.dodatnaCena = 0
    this.kolicina = 1
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.boja = this.route.snapshot.queryParams['boja'] || "#ffffff"

    this.proizvodService.det(id).subscribe(res => {
      this.proizvod = res
    })
  }

  izaberi(tip: string, cena: number) {
    this.tipS = tip
    this.dodatnaCena = cena
  }
  

  dodaj() {
    if (this.kolicina <= 0) {
      this.message = "Kolicina mora biti veca od 0"
      return
    }
    if (this.kolicina > this.proizvod.kolicinaNaLageru) {
      this.message = "Nema dovoljno proizvoda na stanju"
      return
    }

    let stavka = new Narudzba
    stavka.proId = this.proizvod._id
    stavka.naziv = this.proizvod.naziv
    stavka.stamparKorIme = this.proizvod.stamparKorIme
    stavka.slika = this.proizvod.slika
    stavka.kolicina = this.kolicina
    stavka.boja = this.boja
    stavka.tekst = this.tekst
    stavka.tipStampe = this.tipS
    stavka.dodatnaCena = this.dodatnaCena
    stavka.cena = (this.proizvod.cena + this.dodatnaCena) * this.kolicina

    let s = localStorage.getItem('korpa')
    let korpa: Narudzba[] = s ? JSON.parse(s) : []
    korpa.push(stavka)
    localStorage.setItem('korpa', JSON.stringify(korpa))

    this.router.navigate(['/klijent-ekorpa'])
  }

  nazad() {
    this.router.navigate(['/klijent-prodetalji', this.proizvod._id])
  }
}
