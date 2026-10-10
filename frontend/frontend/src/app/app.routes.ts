import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminMeniComponent } from './admin-meni/admin-meni.component';
import { AdminKorisniciComponent } from './admin-korisnici/admin-korisnici.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { AdminKorisnikEditComponent } from './admin-korisnik-edit/admin-korisnik-edit.component';
import { AdminKategorijeComponent } from './admin-kategorije/admin-kategorije.component';
import { StamparMeniComponent } from './stampar-meni/stampar-meni.component';
import { StamparProizvodiComponent } from './stampar-proizvodi/stampar-proizvodi.component';
import { StamparAzurirajComponent } from './stampar-azuriraj/stampar-azuriraj.component';
import { StamparMojprofilComponent } from './stampar-mojprofil/stampar-mojprofil.component';
import { OsnovnaComponent } from './osnovna/osnovna.component';
import { ProdetaljiComponent } from './prodetalji/prodetalji.component';
import { KlijentPocetnaComponent } from './klijent-pocetna/klijent-pocetna.component';
import { KlijentMojprofilComponent } from './klijent-mojprofil/klijent-mojprofil.component';
import { KlijentPretraziComponent } from './klijent-pretrazi/klijent-pretrazi.component';
import { KlijentProdetaljiComponent } from './klijent-prodetalji/klijent-prodetalji.component';
import { KlijentPriproComponent } from './klijent-pripro/klijent-pripro.component';
import { EkorpaComponent } from './ekorpa/ekorpa.component';
import { StamparNarudzbeComponent } from './stampar-narudzbe/stampar-narudzbe.component';
import { KlijentArhivaComponent } from './klijent-arhiva/klijent-arhiva.component';
import { KlijentNabavkeComponent } from './klijent-nabavke/klijent-nabavke.component';
import { StamparLicitacijeComponent } from './stampar-licitacije/stampar-licitacije.component';
import { adminGuard, klijentGuard, stamparGuard } from './guards/guard';

export const routes: Routes = [
    {path: "", component: OsnovnaComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "login-admin", component: LoginAdminComponent},
    {path: "admin-meni", component: AdminMeniComponent, canActivate: [adminGuard] },
    {path: "admin-korisnici", component: AdminKorisniciComponent, canActivate: [adminGuard] },
    {path: "admin-zahtevi", component: AdminZahteviComponent, canActivate: [adminGuard] },
    {path: "admin-korisnikEdit/:id", component: AdminKorisnikEditComponent, canActivate: [adminGuard] },
    {path: "admin-kategorije", component: AdminKategorijeComponent, canActivate: [adminGuard] },
    {path: "stampar-meni", component: StamparMeniComponent, canActivate: [stamparGuard] },
    {path: "stampar-proizvodi", component: StamparProizvodiComponent, canActivate: [stamparGuard] },
    {path: "stampar-azuriraj", component: StamparAzurirajComponent, canActivate: [stamparGuard] },
    {path: "stampar-mojprofil", component: StamparMojprofilComponent, canActivate: [stamparGuard] },
    {path: "prodetalji/:id", component: ProdetaljiComponent},
    {path: "klijent-pocetna", component: KlijentPocetnaComponent, canActivate: [klijentGuard] },
    {path: "klijent-mojprofil", component: KlijentMojprofilComponent, canActivate: [klijentGuard] },
    {path: "klijent-pretrazi", component: KlijentPretraziComponent, canActivate: [klijentGuard] },
    {path: "klijent-prodetalji/:id", component: KlijentProdetaljiComponent, canActivate: [klijentGuard] },
    {path: "klijent-prippro/:id", component: KlijentPriproComponent, canActivate: [klijentGuard] },
    {path: "klijent-ekorpa", component: EkorpaComponent, canActivate: [klijentGuard] },
    {path: "stampar-narudzbe", component: StamparNarudzbeComponent, canActivate: [stamparGuard] },
    {path: "klijent-arhiva", component: KlijentArhivaComponent, canActivate: [klijentGuard] },
    {path: "klijent-nabavke", component: KlijentNabavkeComponent, canActivate: [klijentGuard] },
    {path: "stampar-licitacije", component: StamparLicitacijeComponent, canActivate: [stamparGuard] },
];
