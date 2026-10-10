export class Proizvod {
    _id = ""
    naziv = ""
    opis = ""
    kategorija = ""
    podkategorija = ""
    cena = 0
    kolicinaNaLageru = 0
    boje :  string[] = []
    slika = ""
    uslugeStampe :  Array<{ tipStampe: string, dodatnaCena: number, maxSirina: number, maxVisina: number }> = []
    stamparKorIme = ""
    brojSvidjanja = 0
    brojNesvidjanja = 0
    komentari: Array<{ korIme: string, tekst: string, datum: string }> = []
    lajkovaliKorisnici: string[] = []
    nesvidjaliKorisnici: string[] = []
}