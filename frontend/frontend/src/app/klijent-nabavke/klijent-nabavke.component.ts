import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JavnaNabavkaService } from '../services/javna-nabavka.service';
import { JavnaNabavka } from '../models/javnaNabavka';

@Component({
  selector: 'app-klijent-nabavke',
  imports: [RouterLink],
  templateUrl: './klijent-nabavke.component.html',
  styleUrl: './klijent-nabavke.component.css',
})
export class KlijentNabavkeComponent {
  nabavke: JavnaNabavka[] = []

  private javnaNabavkaService = inject(JavnaNabavkaService)

  ngOnInit() {
    let s = localStorage.getItem('loggedUser')
    let korisnik = s ? JSON.parse(s) : null

    this.javnaNabavkaService.izvestaj(korisnik.kor_ime).subscribe(res => {
      this.nabavke = res
    })
  }
}
