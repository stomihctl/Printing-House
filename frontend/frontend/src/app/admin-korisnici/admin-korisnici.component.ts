import { Component, inject, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-korisnici',
  imports: [RouterLink],
  templateUrl: './admin-korisnici.component.html',
  styleUrl: './admin-korisnici.component.css',
})
export class AdminKorisniciComponent {
  korisnici: Korisnik[] = []

  private korisnikService = inject(KorisnikService)

  ngOnInit() {
    this.ucitajKorisnike()
  }

  ucitajKorisnike() {
    this.korisnikService.sviKor().subscribe(res => {
      this.korisnici = res
    })
  }

  obrisi(id: string) {
    this.korisnikService.obrisiKor(id).subscribe(res => {
      this.ucitajKorisnike()
    })
  }
}
