import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProizvodService } from '../services/proizvod.service';
import { Proizvod } from '../models/proizvod';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-klijent-prodetalji',
  imports: [FormsModule, RouterLink, DatePipe],
  templateUrl: './klijent-prodetalji.component.html',
  styleUrl: './klijent-prodetalji.component.css',
})
export class KlijentProdetaljiComponent {
  stamp: Korisnik = new Korisnik
  pro: Proizvod = new Proizvod
  boja = "#ffffff"
  korIme = ""

  private proizvodService = inject(ProizvodService)
  private route = inject(ActivatedRoute)
  private korisnikService = inject(KorisnikService)
  private router = inject(Router)

  ngOnInit() {
    let s = localStorage.getItem('loggedUser')
    let korisnik = s ? JSON.parse(s) : null
    this.korIme = korisnik ? korisnik.kor_ime : ""
    let id = this.route.snapshot.params['id']
    this.proizvodService.det(id).subscribe(res => {
      this.pro = res
      this.korisnikService.dohvKorIme(this.pro.stamparKorIme).subscribe(k => {
        this.stamp = k
      })
    })
  }

  idi() {
    this.router.navigate(['/klijent-prippro', this.pro._id], { queryParams: { boja: this.boja } })
  }

  poslednjiKomentari(): any[] {
    if (!this.pro.komentari) return []

    let obrnuto = []
    for (let i = this.pro.komentari.length - 1; i >= 0; i--) {
      obrnuto.push(this.pro.komentari[i])
    }

    return obrnuto.slice(0, 5)
  }
}
