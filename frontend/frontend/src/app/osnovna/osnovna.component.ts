import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProizvodService } from '../services/proizvod.service';
import { KorisnikService } from '../services/korisnik.service';
import { Proizvod } from '../models/proizvod';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-osnovna',
  imports: [FormsModule, RouterLink],
  templateUrl: './osnovna.component.html',
  styleUrl: './osnovna.component.css',
})
export class OsnovnaComponent {
  brStamp = 0
  topic: Proizvod[] = []
  rezz: Proizvod[] = []

  private proizvodService = inject(ProizvodService)
  private korisnikService = inject(KorisnikService)

  naziv = ""
  kat = "Sve kategorije"
  sort = ""
  kategorije: string[] = []
  

  ngOnInit() {
    this.korisnikService.brStamp().subscribe(res => {
      this.brStamp = res.broj
    })

    this.proizvodService.sveKat().subscribe(res => {
      this.kategorije = res
    })

    this.proizvodService.topp().subscribe(res => {
      this.topic = res
    })

    this.nadji()
  }

  nadji() {
    this.proizvodService.pretProiz(this.naziv, this.kat, this.sort).subscribe(res => {
      this.rezz = res
    })
  }

  sortiraj() {
    this.sort = this.sort == 'asc' ? 'desc' : 'asc'
    this.nadji()
  }
}
