import express from 'express'
import KorisnikModel from '../models/korisnik'
import bcrypt from 'bcrypt'
import { JavnaNabavkaController } from './javnaNabavka.controller'

const IME_PREZIME_REGEX = /^[A-Za-z]+$/
const TELEFON_REGEX = /^[0-9]+$/
const MEJL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LOZINKA_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z]\S{7,11}$/
const MATICNI_BROJ_REGEX = /^[0-9]{8}$/
const PIB_REGEX = /^[1-9][0-9]{8}$/
const ADRESA_REGEX = /^.+,\s*[A-Za-zČĆŽŠĐčćžšđ]+(\s[A-Za-zČĆŽŠĐčćžšđ]+)*$/



export class KorisnikController {
    private registruj(req: express.Request, res: express.Response) {
        bcrypt.hash(req.body.lozinka, 10).then((hashLozinka) => {
            let korisnik = new KorisnikModel({
                kor_ime: req.body.kor_ime,
                lozinka: hashLozinka,
                uloga: req.body.uloga,
                tip: req.body.tip,
                ime: req.body.ime,
                prezime: req.body.prezime,
                telefon: req.body.telefon,
                mejl: req.body.mejl,
                nazivInstitucije: req.body.nazivInstitucije,
                adresaSedista: req.body.adresaSedista,
                maticniBroj: req.body.maticniBroj,
                pib: req.body.pib,
                profilnaSlika: req.body.profilnaSlika || "default_profile_image.jpg",
                status: "neaktivan"
            })

            korisnik.save().then((ok) => {
                res.json({ uspeh: true, poruka: "Registracija uspešna, čeka odobrenje administratora" })
            }).catch((err) => {
                console.log(err)
                res.json({ uspeh: false, poruka: "Greška pri registraciji" })
            })
        })
    }

    private sacuvajIzmenu(req: express.Request, res: express.Response) {
        const PibMat = req.body.uloga === 'stampar' || (req.body.uloga === 'klijent' && req.body.tip === 'pravno')

        KorisnikModel.findByIdAndUpdate(req.params.id, {
            kor_ime: req.body.kor_ime,
            uloga: req.body.uloga,
            tip: req.body.tip,
            ime: req.body.ime,
            prezime: req.body.prezime,
            telefon: req.body.telefon,
            mejl: req.body.mejl,
            nazivInstitucije: PibMat ? req.body.nazivInstitucije : "",
            adresaSedista: PibMat ? req.body.adresaSedista : "",
            maticniBroj: PibMat ? req.body.maticniBroj : "",
            pib: PibMat ? req.body.pib : "",
            profilnaSlika: req.body.profilnaSlika,
            status: req.body.status
        }).then((ok) => {
            res.json({ uspeh: true, poruka: "Korisnik izmenjen" })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri izmeni" })
        })
    }

    login = (req: express.Request, res: express.Response) => {
        let kor = req.body.kor_ime
        let loz = req.body.lozinka

        KorisnikModel.findOne({ kor_ime: kor }).then((korisnik) => {
            if (!korisnik) {
                return res.json({ poruka: "Korisnicko ime ne postoji" })
            }

            bcrypt.compare(loz, korisnik.lozinka).then(async (poklapa) => {
                if (!poklapa) {
                    return res.json({ poruka: "Pogresna lozinka" })
                }
                if (korisnik.uloga === 'admin') {
                    return res.json({ poruka: "Koristite admin prijavu" })
                }
                if (korisnik.status === 'neaktivan') {
                    return res.json({ poruka: "Nalog ceka odobrenje administratora" })
                }
                if (korisnik.status === 'odbijen') {
                    return res.json({ poruka: "Zahtev za registraciju je odbijen" })
                }

                if (korisnik.uloga === 'klijent' && korisnik.tip === 'pravno') {
                    await new JavnaNabavkaController().zatvoriIstekleZaKlijenta(korisnik.kor_ime)
                }

                res.json(korisnik)
            })
        }).catch((err) => {
            console.log(err)
            res.json({ poruka: "Greska na serveru" })
        })
    }

    adminLogin = (req: express.Request, res: express.Response) => {
        let kor = req.body.kor_ime
        let loz = req.body.lozinka

        KorisnikModel.findOne({ kor_ime: kor }).then((korisnik) => {
            if (!korisnik) {
                return res.json({ poruka: "Korisnicko ime ne postoji" })
            }
            bcrypt.compare(loz, korisnik.lozinka).then((poklapa) => {
                if (korisnik.uloga != 'admin') {
                    return res.json({ poruka: "Koristite korisnicku prijavu" })
                }
                if (!poklapa) {
                    return res.json({ poruka: "Pogresna lozinka" })
                }
                res.json(korisnik)
            })
        }).catch((err) => {
            console.log(err)
            res.json({ poruka: "Greska na serveru" })
        })
    }

    
    register = (req: express.Request, res: express.Response) => {
        if (!IME_PREZIME_REGEX.test(req.body.ime)) {
            return res.json({ uspeh: false, poruka: "Ime sme sadrzati samo slova" })
        }
        if (!IME_PREZIME_REGEX.test(req.body.prezime)) {
            return res.json({ uspeh: false, poruka: "Prezime sme sadrzati samo slova" })
        }
        if (!TELEFON_REGEX.test(req.body.telefon)) {
            return res.json({ uspeh: false, poruka: "Telefon sme sadrzati samo brojeve" })
        }
        if (!MEJL_REGEX.test(req.body.mejl)) {
            return res.json({ uspeh: false, poruka: "Email adresa nije ispravnog formata" })
        }
        if (!LOZINKA_REGEX.test(req.body.lozinka)) {
            return res.json({ uspeh: false, poruka: "Lozinka mora imati 8-12 karaktera, pocinje slovom, sadrzi veliko slovo, broj i specijalni znak" })
        }

        const PibMat = req.body.uloga === 'stampar' || (req.body.uloga === 'klijent' && req.body.tip === 'pravno')

        if (PibMat) {
            if (!req.body.nazivInstitucije || req.body.nazivInstitucije.trim() === '') {
                return res.json({ uspeh: false, poruka: "Naziv institucije je obavezan" })
            }
            if (!req.body.adresaSedista || req.body.adresaSedista.trim() === '') {
                return res.json({ uspeh: false, poruka: "Adresa sedišta je obavezna" })
            }
            if (!MATICNI_BROJ_REGEX.test(req.body.maticniBroj)) {
                return res.json({ uspeh: false, poruka: "Maticni broj mora imati tačno 8 cifara" })
            }
            if (!PIB_REGEX.test(req.body.pib)) {
                return res.json({ uspeh: false, poruka: "PIB mora imati 9 cifara i ne sme pocinjati nulom" })
            }
            if (!ADRESA_REGEX.test(req.body.adresaSedista)) {
                return res.json({ uspeh: false, poruka: "Adresa mora biti u formatu 'ulica i broj, grad'" })
            }
        }

        KorisnikModel.findOne({ kor_ime: req.body.kor_ime }).then((postojiKorIme) => {
            if (postojiKorIme) {
                return res.json({ uspeh: false, poruka: "Korisnicko ime vec postoji" })
            }

            KorisnikModel.findOne({ mejl: req.body.mejl }).then((postojiMejl) => {
                if (postojiMejl) {
                    return res.json({ uspeh: false, poruka: "Email adresa je vec registrovana" })
                }

                if (!PibMat) {
                    return this.registruj(req, res)
                }

                KorisnikModel.findOne({ maticniBroj: req.body.maticniBroj }).then((postojiMb) => {
                    if (postojiMb) {
                        return res.json({ uspeh: false, poruka: "Maticni broj vec postoji u sistemu" })
                    }

                    KorisnikModel.findOne({ pib: req.body.pib }).then((postojiPib) => {
                        if (postojiPib) {
                            return res.json({ uspeh: false, poruka: "PIB vec postoji u sistemu" })
                        }
                        this.registruj(req, res)
                    })
                })
            })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska na serveru" })
        })
    }

    sviKor = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ uloga: { $ne: 'admin' } }).then((korisnici) => {
            res.json(korisnici)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    neodobreni = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ status: 'neaktivan' }).then((korisnici) => {
            res.json(korisnici)
        }).catch((err) => {
            console.log(err)
            res.json([])
        })
    }

    odobri = (req: express.Request, res: express.Response) => {
        KorisnikModel.findByIdAndUpdate(req.params.id, { status: 'aktivan' }).then((ok) => {
            res.json({ uspeh: true, poruka: "Korisnik odobren" })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri odobravanju" })
        })
    }

    odbij = (req: express.Request, res: express.Response) => {
        KorisnikModel.findByIdAndUpdate(req.params.id, { status: 'odbijen' }).then((ok) => {
            res.json({ uspeh: true, poruka: "Korisnik odbijen" })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri odbijanju" })
        })
    }

    dohvKor = (req: express.Request, res: express.Response) => {
        KorisnikModel.findById(req.params.id).then((korisnik) => {
            res.json(korisnik)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }

    obrisiKor = (req: express.Request, res: express.Response) => {
        KorisnikModel.findByIdAndDelete(req.params.id).then((ok) => {
            res.json({ uspeh: true, poruka: "Korisnik obrisan" })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska pri brisanju" })
        })
    }

    izmeniKor = (req: express.Request, res: express.Response) => {
        if (!IME_PREZIME_REGEX.test(req.body.ime)) {
            return res.json({ uspeh: false, poruka: "Ime sme sadrzati samo slova" })
        }
        if (!IME_PREZIME_REGEX.test(req.body.prezime)) {
            return res.json({ uspeh: false, poruka: "Prezime sme sadrzati samo slova" })
        }
        if (!TELEFON_REGEX.test(req.body.telefon)) {
            return res.json({ uspeh: false, poruka: "Telefon sme sadrzati samo brojeve" })
        }
        if (!MEJL_REGEX.test(req.body.mejl)) {
            return res.json({ uspeh: false, poruka: "Email adresa nije ispravnog formata" })
        }

        const PibMat = req.body.uloga === 'stampar' || (req.body.uloga === 'klijent' && req.body.tip === 'pravno')

        if (PibMat) {
            if (!req.body.nazivInstitucije || req.body.nazivInstitucije.trim() === '') {
                return res.json({ uspeh: false, poruka: "Naziv institucije je obavezan" })
            }
            if (!req.body.adresaSedista || req.body.adresaSedista.trim() === '') {
                return res.json({ uspeh: false, poruka: "Adresa sedišta je obavezna" })
            }
            if (!MATICNI_BROJ_REGEX.test(req.body.maticniBroj)) {
                return res.json({ uspeh: false, poruka: "Maticni broj mora imati tačno 8 cifara" })
            }
            if (!PIB_REGEX.test(req.body.pib)) {
                return res.json({ uspeh: false, poruka: "PIB mora imati 9 cifara i ne sme pocinjati nulom" })
            }
            if (!ADRESA_REGEX.test(req.body.adresaSedista)) {
                return res.json({ uspeh: false, poruka: "Adresa mora biti u formatu 'ulica i broj, grad'" })
            }
        }
        KorisnikModel.findOne({ kor_ime: req.body.kor_ime, _id: { $ne: req.params.id } }).then((postojiKorIme) => {
            if (postojiKorIme) {
                return res.json({ uspeh: false, poruka: "Korisnicko ime vec postoji" })
            }
            KorisnikModel.findOne({ mejl: req.body.mejl, _id: { $ne: req.params.id } }).then((postojiMejl) => {
                if (postojiMejl) {
                    return res.json({ uspeh: false, poruka: "Email adresa je vec registrovana" })
                }

                if (!PibMat) {
                    return this.sacuvajIzmenu(req, res)
                }

                KorisnikModel.findOne({ maticniBroj: req.body.maticniBroj, _id: { $ne: req.params.id } }).then((postojiMb) => {
                    if (postojiMb) {
                        return res.json({ uspeh: false, poruka: "Maticni broj vec postoji u sistemu" })
                    }

                    KorisnikModel.findOne({ pib: req.body.pib, _id: { $ne: req.params.id } }).then((postojiPib) => {
                        if (postojiPib) {
                            return res.json({ uspeh: false, poruka: "PIB vec postoji u sistemu" })
                        }
                        this.sacuvajIzmenu(req, res)
                    })
                })
            })
        }).catch((err) => {
            console.log(err)
            res.json({ uspeh: false, poruka: "Greska na serveru" })
        })
    }

    brStamp = (req: express.Request, res: express.Response) => {
        KorisnikModel.countDocuments({ uloga: 'stampar', status: 'aktivan' }).then((br) => {
            res.json({ broj: br })
        }).catch((err) => {
            console.log(err)
            res.json({ broj: 0 })
        })
    }

    dohvKorIme = (req: express.Request, res: express.Response) => {
        KorisnikModel.findOne({ kor_ime: req.params.ime }).then((korisnik) => {
            res.json(korisnik)
        }).catch((err) => {
            console.log(err)
            res.json(null)
        })
    }
}