import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProizvodService } from '../services/proizvod.service';
import { Proizvod } from '../models/proizvod';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-prodetalji',
  imports: [RouterLink],
  templateUrl: './prodetalji.component.html',
  styleUrl: './prodetalji.component.css',
})
export class ProdetaljiComponent {
  stampar: Korisnik = new Korisnik
  proizvod: Proizvod = new Proizvod

  private proizvodService = inject(ProizvodService)
  private route = inject(ActivatedRoute)
  private korisnikService = inject(KorisnikService)

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    this.proizvodService.det(id).subscribe(res => {
      this.proizvod = res
      this.korisnikService.dohvKorIme(this.proizvod.stamparKorIme).subscribe(k => {
        this.stampar = k
      })
    })
    
  }
}
