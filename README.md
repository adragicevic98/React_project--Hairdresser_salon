
## Napomena:
Prije samog pokretanja potrebno je poziconirati se u foldere backend i frontend zasebno te izvršiti naredbu "npm install" kako bi se instalirali potrebni node modules paketi, te u backend dodati .env file u kojem ćete navesti slijedeće:
ATLAS_PASS= _________ pišete  lozinku dodjeljenu vašem useru za mongodb ATLAS
ATLAS_USER=__________ pišete definirano ime korisnika (usera) iz mongodb-a
PORT=5000 ili svoj proizvoljni(slobodni) port
SECRET=__________ tajna riječ koju definirate za generiranje tokena
Također,u backend -> utils -> config.js potrebno je izmjeniti DB_URI tako što ćete dodati svoj connection string iz mongodb-a, te prilagoditi prema postojećem.


## Opis projekta

--Frizerski salon - online rezarvacije--
Aplikacija koja nudi online mogućnost rezervacije termina. Potrebna je registracija korisnika kako bi frizeru bili dostupni potrebni podaci o korisniku kao što su br. mobitela, mail i slično. Korisnik bira jedan od više mogućih tretmana, kalendar će biti prilagođen vremenskom trajanju tretmana, te će omogućavati odabir slobodnog termina. Princip rezervacija se svodi na "tko prije njegovo".  Korisnik će u svakom trenutku imati mogućnost otkazivanja, kao i pregleda zakazanih osobnih termina. Frizer će imati uvid u sve zakazane termine, njihove vlasnike i kontakt brojeve kako bi ih mogao obavjestiti u slučaju nemogućnosti održavanja tretmana i sl. U skladu s tim korisnici će imati i osobni profil, te mogućnost uređivanja osobnih podataka, kako bi frizeru bile dostupne najnovije informacije u slučaju da promjene broj mobitela i sl.

## Tehnologije

1. Frontend
2. Backend
3. Baza

## Popis funkcionalnosti
1. registracija korisnika (stvaranje novog korisnika)
2. prijava korisnika
3. pregled, stvaranje, brisanje rezervacija (korisnik)
4. pregled i uređivanje osobnih informacija (korisnik)
5. uvid u zakazane termine (admin)
