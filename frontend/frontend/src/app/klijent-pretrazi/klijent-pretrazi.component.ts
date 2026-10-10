import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProizvodService } from '../services/proizvod.service';
import { Proizvod } from '../models/proizvod';

@Component({
  selector: 'app-klijent-pretrazi',
  imports: [FormsModule, RouterLink],
  templateUrl: './klijent-pretrazi.component.html',
  styleUrl: './klijent-pretrazi.component.css',
})
export class KlijentPretraziComponent {
  rezz: Proizvod[] = []
  kategorije: string[] = []

  private proizvodService = inject(ProizvodService)
  
  naziv = ""
  kat = "Sve kategorije"
  sort = ""

  ngOnInit() {
    this.proizvodService.sveKat().subscribe(res => {
      this.kategorije = res
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
