---
title: Szójegyzék
description: Útmutató az Onetime Secret kulcsfontosságú kifejezéseinek, felhasználói felület elemeinek és műszaki szókincsének fordításához a konzisztencia megőrzése érdekében
---

# Onetime Secret fordítási szójegyzék

Ez a szójegyzék szabványosított fordításokat biztosít a kulcsfontosságú kifejezésekhez, hogy biztosítsa a konzisztenciát az Onetime Secret alkalmazásban. A fordítási irányelvek és a magyar nyelv igényei alapján készült.

## Alapvető terminológia

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| secret (noun) | titok | Az alkalmazás központi fogalma |
| secret (adj) | titkos/biztonságos | |
| passphrase | hozzáférési mondat | Hitelesítési módszer titkokhoz |
| burn | végleges törlés | Titok törlése megtekintés előtt |
| view/reveal | megtekintés/felfedés | Titokhoz való hozzáférés művelete |
| link | hivatkozás | URL, amely hozzáférést biztosít egy titokhoz |
| encrypt/encrypted | titkosítás/titkosított | Biztonsági módszer |
| secure | biztonságos | Védelem állapota |

## Felhasználói felület elemei

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| Share a secret | Titok megosztása | Fő művelet |
| Create Account | Fiók létrehozása | Regisztráció |
| Sign In | Bejelentkezés | Hitelesítés |
| Dashboard | Vezérlőpult | Felhasználó főoldala |
| Settings | Beállítások | Konfigurációs oldal |
| Privacy Options | Adatvédelmi beállítások | Titkok beállításai |
| Feedback | Visszajelzés | Felhasználói megjegyzések |

## Állapot kifejezések

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| received | megkapva | A titok megtekintésre került |
| burned | véglegesen törölve | Titok törölve megtekintés előtt |
| expired | lejárt | A titok már nem érhető el az idő miatt |
| created | létrehozva | A titok létrejött |
| active | aktív | A titok elérhető |
| inactive | inaktív | A titok nem érhető el |

## Idővel kapcsolatos kifejezések

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| expires in | lejár | Idő, amíg a titok elérhetetlenné válik |
| day/days | nap/nap | Időegység |
| hour/hours | óra/óra | Időegység |
| minute/minutes | perc/perc | Időegység |
| second/seconds | másodperc/másodperc | Időegység |

## Biztonsági funkciók

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| one-time access | egyszeri hozzáférés | Fő biztonsági funkció |
| passphrase protection | hozzáférési mondattal való védelem | További biztonság |
| encrypted in transit | átvitel közben titkosítva | Adatvédelmi módszer |
| encrypted at rest | tároláskor titkosítva | Tárolási védelem |

## Fiókkal kapcsolatos kifejezések

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| email | e-mail | Felhasználói azonosító |
| password | jelszó | Fiók hitelesítés |
| account | fiók | Felhasználói profil |
| subscription | előfizetés | Fizetős szolgáltatás |
| customer | ügyfél | Fizető felhasználó |

## Doménnel kapcsolatos kifejezések

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| custom domain | egyéni domén | Prémium funkció |
| domain verification | domén ellenőrzés | Beállítási folyamat |
| DNS record | DNS rekord | Konfiguráció |
| CNAME record | CNAME rekord | DNS konfiguráció |

## Hibaüzenetek

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| error | hiba | Problémaértesítés |
| warning | figyelmeztetés | Figyelmeztető értesítés |
| oops | hoppá | Barátságos bevezetés hibához |

## Gombok és műveletek

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| submit | küldés | Űrlap művelet |
| cancel | mégse | Negatív művelet |
| confirm | megerősítés | Pozitív művelet |
| copy to clipboard | másolás vágólapra | Segítő művelet |
| continue | folytatás | Navigáció |
| back | vissza | Navigáció |

## Marketing kifejezések

| English | Magyar (HU) | Context |
|---------|-------------|---------|
| secure links | biztonságos hivatkozások | Termék funkció |
| privacy-first design | adatvédelem-központú tervezés | Tervezési filozófia |
| custom branding | egyéni márkajelzés | Prémium funkció |

## Fordítási irányelvek

1. **Konzisztencia**: Ugyanazon fordítás használata a kifejezéshez az egész alkalmazásban
2. **Kontextus**: Figyelembe venni, hogyan használják a kifejezést az alkalmazásban
3. **Kulturális adaptáció**: Kifejezések helyi konvenciókhoz igazítása szükség esetén
4. **Műszaki pontosság**: Biztosítani a biztonsági kifejezések pontos fordítását
5. **Hangnem**: Professzionális, de közvetlen hangnem fenntartása

## Különleges megfontolások

- A magyar agglutináló nyelv 18+ esetet használ (eset ragokkal kifejezve)
- Magánhangzó-harmónia kötelező: házban, kertben (nem "házben")
- Ékezetek nélkülözhetetlenek és megváltoztatják a jelentést: á, é, í, ó, ö, ő, ú, ü, ű
- Nincs nyelvtani nem a magyarban (ellentétben sok más nyelvvel)
- Fontos különbség: "jelszó" fiókokhoz vs "hozzáférési mondat" egyedi titkok védelméhez
- Határozott (a, az) és határozatlan (egy) névelők használata: a titok, az e-mail, egy hivatkozás
- Tárgyragozás: látom a titkot, látok egy titkot (különböző igealak)
