import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Faktura } from '../models/faktura';

@Injectable({
  providedIn: 'root',
})
export class FakturaService {
   private http = inject(HttpClient)

  potvrdi(korpa: any[], klijentKorIme: string) {
    const data = {
      korpa: korpa,
      klijentKorIme: klijentKorIme
    }

    return this.http.post<any>("http://localhost:4000/fakture/potvrdi", data)
  }

  mojeNarudzbine(korIme: string) {
    return this.http.get<any[]>("http://localhost:4000/fakture/moje/" + korIme)
  }

  otkazi(id: string) {
    return this.http.put<any>("http://localhost:4000/fakture/otkazi/" + id, {})
  }

  zaStampariju(korIme: string) {
    return this.http.get<Faktura[]>("http://localhost:4000/fakture/zaStampariju/" + korIme)
  }

  promeniStatus(id: string) {
    return this.http.put<any>("http://localhost:4000/fakture/promeniStatus/" + id, {})
  }

  primi(id: string) {
    return this.http.put<any>("http://localhost:4000/fakture/primi/" + id, {})
  }
}
