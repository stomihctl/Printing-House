import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KategorijaService } from '../services/kategorija.service';
import { Kategorija } from '../models/kategorija';

@Component({
  selector: 'app-admin-kategorije',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-kategorije.component.html',
  styleUrl: './admin-kategorije.component.css',
})
export class AdminKategorijeComponent {
  kategorije: Kategorija[] = []
  noviNazivKat = ""
  novaPodkat: { [naziv: string]: string } = {}
  message = ""

  private kategorijaService = inject(KategorijaService)

  ngOnInit() {
    this.ucitajKategorije()
  }

  ucitajKategorije() {
    this.kategorijaService.dohvSveKat().subscribe(res => {
      this.kategorije = res
    })
  }

  dodajKat() {
    this.kategorijaService.dodajKat(this.noviNazivKat).subscribe(res => {
      if (res.uspeh) {
        this.noviNazivKat = ""
        this.ucitajKategorije()
      } else {
        this.message = res.poruka
      }
    })
  }

  dodajPodkat(naziv: string) {
    const podkat = this.novaPodkat[naziv]
    this.kategorijaService.dodajPodKat(naziv, podkat).subscribe(res => {
      if (res.uspeh) {
        this.novaPodkat[naziv] = ""
        this.ucitajKategorije()
      } else {
        this.message = res.poruka
      }
    })
  }
}