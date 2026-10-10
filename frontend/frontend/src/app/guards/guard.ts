import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function klijentGuard() {
  const router = inject(Router)
  let s = localStorage.getItem('loggedUser')

  if (!s) {
    router.navigate(['/login'])
    return false
  }

  let korisnik = JSON.parse(s)
  if (korisnik.uloga !== 'klijent') {
    router.navigate(['/login'])
    return false
  }

  return true
}

export function stamparGuard() {
  const router = inject(Router)
  let s = localStorage.getItem('loggedUser')

  if (!s) {
    router.navigate(['/login'])
    return false
  }

  let korisnik = JSON.parse(s)
  if (korisnik.uloga !== 'stampar') {
    router.navigate(['/login'])
    return false
  }

  return true
}

export function adminGuard() {
  const router = inject(Router)
  let s = localStorage.getItem('loggedUser')

  if (!s) {
    router.navigate(['/login-admin'])
    return false
  }

  let korisnik = JSON.parse(s)
  if (korisnik.uloga !== 'admin') {
    router.navigate(['/login-admin'])
    return false
  }

  return true
}