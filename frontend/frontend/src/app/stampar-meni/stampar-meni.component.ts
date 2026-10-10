import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-stampar-meni',
  imports: [RouterLink],
  templateUrl: './stampar-meni.component.html',
  styleUrl: './stampar-meni.component.css',
})
export class StamparMeniComponent {
  private router = inject(Router)

  izloguj() {
    localStorage.removeItem('loggedUser')
    this.router.navigate(['/login'])
  }
}
