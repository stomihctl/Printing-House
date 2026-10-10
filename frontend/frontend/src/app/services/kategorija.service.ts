import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kategorija } from '../models/kategorija';

@Injectable({
  providedIn: 'root',
})
export class KategorijaService {
  private http = inject(HttpClient)

  dohvSveKat() {
    return this.http.get<Kategorija[]>("http://localhost:4000/kategorije/dohvSveKat")
  }

  dodajKat(naziv: string) {
    const data = { naziv: naziv }
    return this.http.post<any>("http://localhost:4000/kategorije/dodajKat", data)
  }

  dodajPodKat(naziv: string, podkat: string) {
    const data = {
      naziv: naziv,
      podkat: podkat 
    }
    return this.http.put<any>("http://localhost:4000/kategorije/dodajPodKat/", data)

    
  }
}
