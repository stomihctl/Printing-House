import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proizvod } from '../models/proizvod';
import { Poruka } from '../models/prouka';

@Injectable({
  providedIn: 'root',
})
export class ProizvodService {
  private http = inject(HttpClient)

  dohvProizOdStamp(korIme: string) {
    return this.http.get<Proizvod[]>("http://localhost:4000/proizvodi/" + korIme)
  }

  dodajProiz(naziv: string, opis: string, kategorija: string, podkategorija: string, cena: number, kolicinaNaLageru: number, boje: string[], slika: string, uslugeStampe: any[], stamparKorIme: string) {

    const data = {
      naziv: naziv,
      opis: opis,
      kategorija: kategorija,
      podkategorija: podkategorija,
      cena: cena,
      kolicinaNaLageru: kolicinaNaLageru,
      boje: boje,
      slika: slika,
      uslugeStampe: uslugeStampe,
      stamparKorIme: stamparKorIme
    }

    return this.http.post<any>("http://localhost:4000/proizvodi/dodajProiz", data)
  }

  azurirajKol(id: string, kolicinaNaLageru: number) {
    const data = { 
      kolicinaNaLageru
    }
    return this.http.put<Poruka>("http://localhost:4000/proizvodi/azurirajKol/" + id, data)
  }

  topp() {
    return this.http.get<Proizvod[]>("http://localhost:4000/proizvodi/topp")
  }

  pretProiz(n: string, k: string, s: string) {
  const data = {
    n: n,
    k: k,
    s: s
  }

  return this.http.post<Proizvod[]>("http://localhost:4000/proizvodi/pretProiz", data)
}

  det(id: string) {
    return this.http.get<Proizvod>("http://localhost:4000/proizvodi/det/" + id)
  }

  sveKat() {
    return this.http.get<string[]>("http://localhost:4000/proizvodi/sveKat")
  }

  svidi(id: string, korIme: string) {
    const data = { korIme }
    return this.http.put<any>("http://localhost:4000/proizvodi/svidi/" + id, data)
  }

  nesvidi(id: string, korIme: string) {
    const data = { korIme }
    return this.http.put<any>("http://localhost:4000/proizvodi/nesvidi/" + id, data)
  }

  komentarisi(id: string, korIme: string, tekst: string) {
    const data = { korIme, tekst }
    return this.http.post<any>("http://localhost:4000/proizvodi/komentarisi/" + id, data)
  }
}
