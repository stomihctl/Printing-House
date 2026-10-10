import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-klijent-pocetna',
  imports: [RouterLink],
  templateUrl: './klijent-pocetna.component.html',
  styleUrl: './klijent-pocetna.component.css',
})
export class KlijentPocetnaComponent {
  private router = inject(Router)
  tip = ""

  ngOnInit() {
    let s = localStorage.getItem("loggedUser")
    let korisnik = JSON.parse(s!)
    this.tip = korisnik.tip
  }

  izloguj() {
    localStorage.removeItem('loggedUser')
    this.router.navigate(['/login'])
  }
}
