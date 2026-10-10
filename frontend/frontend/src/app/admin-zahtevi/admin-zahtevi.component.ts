import { Component, inject, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-zahtevi',
  imports: [RouterLink],
  templateUrl: './admin-zahtevi.component.html',
  styleUrl: './admin-zahtevi.component.css',
})
export class AdminZahteviComponent {
  zahtevi: Korisnik[] = []

  private korisnikService = inject(KorisnikService)

  ngOnInit() {
    this.ucitajZahteve()
  }

  ucitajZahteve() {
    this.korisnikService.neodobreni().subscribe(res => {
      this.zahtevi = res
    })
  }

  odobri(id: string) {
    this.korisnikService.odobriKor(id).subscribe(res => {
      this.ucitajZahteve()
    })
  }

  odbij(id: string) {
    this.korisnikService.odbijKor(id).subscribe(res => {
      this.ucitajZahteve()
    })
  }
}
