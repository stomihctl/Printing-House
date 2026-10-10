import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JavnaNabavka } from '../models/javnaNabavka';

@Injectable({
  providedIn: 'root',
})
export class JavnaNabavkaService {
  private http = inject(HttpClient)

  kreiraj(korpa: any[], klijentKorIme: string) {
    const data = { korpa: korpa, klijentKorIme: klijentKorIme }
    return this.http.post<any>("http://localhost:4000/javneNabavke/kreiraj", data)
  }

  otvorene() {
    return this.http.get<JavnaNabavka[]>("http://localhost:4000/javneNabavke/otvorene")
  }

  posaljiPonudu(id: string, stamparKorIme: string, stavke: any[]) {
    const data = { stamparKorIme: stamparKorIme, stavke: stavke }
    return this.http.put<any>("http://localhost:4000/javneNabavke/posaljiPonudu/" + id, data)
  }

  izvestaj(korIme: string) {
    return this.http.get<JavnaNabavka[]>("http://localhost:4000/javneNabavke/izvestaj/" + korIme)
  }
}
