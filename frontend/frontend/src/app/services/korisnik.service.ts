import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {

  private http = inject(HttpClient)

  login(u: string, p: string) {

    const data = {
      kor_ime: u,
      lozinka: p
    }

    return this.http.post<any>("http://localhost:4000/korisnici/login", data)
  }

  adminLogin(u: string, p: string) {

    const data = {
      kor_ime: u,
      lozinka: p
    }

    return this.http.post<any>("http://localhost:4000/korisnici/admin-login", data)
  }

  register(kor_ime: string, lozinka: string, uloga: string, tip: string, ime: string, prezime: string, telefon: string, mejl: string, nazivInstitucije: string, adresaSedista: string, maticniBroj: string, pib: string, slika: string) {

    const data = {
      kor_ime: kor_ime,
      lozinka: lozinka,
      uloga: uloga,
      tip: tip,
      ime: ime,
      prezime: prezime,
      telefon: telefon,
      mejl: mejl,
      nazivInstitucije: nazivInstitucije,
      adresaSedista: adresaSedista,
      maticniBroj: maticniBroj,
      pib: pib,
      profilnaSlika: slika,
      status: "neaktivan"
    }

    return this.http.post<any>("http://localhost:4000/korisnici/register", data)
  }

  sviKor() {
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/svi")
  }

  neodobreni() {
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/neodobreni")
  }

  odobriKor(id: string) {
    return this.http.put<any>("http://localhost:4000/korisnici/odobri/" + id, {})
  }

  odbijKor(id: string) {
    return this.http.put<any>("http://localhost:4000/korisnici/odbij/" + id, {})
  }

  dohvKor(id: string) {
    return this.http.get<Korisnik>("http://localhost:4000/korisnici/dohvKor/" + id)
  }

  obrisiKor(id: string) {
    return this.http.delete<any>("http://localhost:4000/korisnici/obrisiKor/" + id)
  }

  izmeniKorisnika(id: string,  kor_ime: string, uloga: string, tip: string, ime: string, prezime: string, telefon: string, mejl: string, nazivInstitucije: string, adresaSedista: string, maticniBroj: string, pib: string, slika: string, status: string) {

    const data = {
      kor_ime: kor_ime,
      uloga: uloga,
      tip: tip,
      ime: ime,
      prezime: prezime,
      telefon: telefon,
      mejl: mejl,
      nazivInstitucije: nazivInstitucije,
      adresaSedista: adresaSedista,
      maticniBroj: maticniBroj,
      pib: pib,
      profilnaSlika: slika,
      status: status
    }

    return this.http.post<any>("http://localhost:4000/korisnici/izmeniKor/" + id, data)
  }

  brStamp() {
    return this.http.get<any>("http://localhost:4000/korisnici/brStamp")
  }

  dohvKorIme(korIme: string) {
    return this.http.get<Korisnik>("http://localhost:4000/korisnici/dohvKorIme/" + korIme)
  }

}