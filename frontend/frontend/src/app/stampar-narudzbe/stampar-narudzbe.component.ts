import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FakturaService } from '../services/faktura.service';
import { Faktura } from '../models/faktura';

@Component({
  selector: 'app-stampar-narudzbe',
  imports: [RouterLink], 
  templateUrl: './stampar-narudzbe.component.html',
  styleUrl: './stampar-narudzbe.component.css',
})
export class StamparNarudzbeComponent {
narudzbine: Faktura[] = []

  private fakturaService = inject(FakturaService)

  ngOnInit() {
    let s = localStorage.getItem('loggedUser')
    let korisnik = s ? JSON.parse(s) : null

    this.fakturaService.zaStampariju(korisnik.kor_ime).subscribe(res => {
      this.narudzbine = res
    })
  }

  promeniStatus(id: string) {
    this.fakturaService.promeniStatus(id).subscribe(res => {
      let s = localStorage.getItem('loggedUser')
      let korisnik = s ? JSON.parse(s) : null

      this.fakturaService.zaStampariju(korisnik.kor_ime).subscribe(res => {
        this.narudzbine = res
      })
    })
  }
}
