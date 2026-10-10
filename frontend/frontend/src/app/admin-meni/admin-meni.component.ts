import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-meni',
  imports: [RouterLink],
  templateUrl: './admin-meni.component.html',
  styleUrl: './admin-meni.component.css',
})
export class AdminMeniComponent {
  private router = inject(Router)

  izloguj() {
    localStorage.removeItem('loggedUser')
    this.router.navigate(['/login-admin'])
  }
}
