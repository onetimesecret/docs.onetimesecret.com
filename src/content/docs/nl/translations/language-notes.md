---
title: Nederlands
description: Kritische regels voor de Nederlandse vertaling
---

# Nederlands

## Translation Choices for Dutch Locale

### Key Terminology

### 1. `secret` → `bericht` / `beveiligd bericht` (zelfstandig naamwoord) en `beveiligd` (bijvoeglijk naamwoord)

**Keuze:**
- Als zelfstandig naamwoord: `bericht` of `beveiligd bericht`
- Als bijvoeglijk naamwoord voor algemene communicatie: `beveiligd`
- Vermijd `geheim` en `vertrouwelijk` in algemene UI-tekst

**Rationale:** Native speaker feedback wijst uit dat de keuze tussen deze termen cruciaal is voor professionaliteit en vertrouwen:

- **`bericht` / `beveiligd bericht`** communiceert duidelijk wat de dienst doet - het veilig delen van informatie. Dit is de voorkeurterm voor het zelfstandig naamwoord
- **`beveiligd`** klinkt zakelijker en professioneler voor algemene communicatie over het beschermen van informatie. Het wekt vertrouwen
- **`geheim`** roept in het Nederlands associaties op met de criminele onderwereld in plaats van zakelijke beveiliging - VERMIJD
- **`vertrouwelijk`** klinkt alsof je de gebruiker moet overtuigen dat je betrouwbaar bent - VERMIJD in algemene UI-tekst

**Native speaker perspectief:** "Voor algemene communicatie over het beschermen van informatie, leest 'beveiligd' zakelijker en professioneler. 'Beveiligd' maakt me eerder geneigd je te vertrouwen. 'Vertrouwelijk' maakt me denken dat je me moet overtuigen dat je betrouwbaar bent. 'Geheim' doet denken aan de Duitse onderwereld."

**Context-specifiek gebruik:**
- **UI-elementen (zelfstandig naamwoord):** `bericht` of `beveiligd bericht` (bijv. "Je hebt 3 nieuwe berichten", "Maak een nieuw beveiligd bericht")
- **Beschrijvende context (bijvoeglijk naamwoord):** `beveiligd` (bijv. "beveiligde links", "beveiligd delen")
- **Formele juridische/zakelijke context:** `vertrouwelijk` (alleen waar "confidential" expliciet bedoeld is)

**Voorbeelden:**
- ✓ "Je hebt 3 nieuwe berichten" (You have 3 new secrets - zelfstandig naamwoord)
- ✓ "Maak een nieuw beveiligd bericht" (Create a new secret - zelfstandig naamwoord)
- ✓ "Beveiligd bericht delen" (Share a secure message)
- ✓ "Beveiligde links" (Secure links - bijvoeglijk naamwoord)
- ✓ "Deel beveiligde informatie" (Share secure information - bijvoeglijk naamwoord)
- ✗ "Je hebt 3 nieuwe geheimen" (roept verkeerde associaties op)
- ✗ "Vertrouwelijke links" (te formeel, klinkt alsof je moet overtuigen)

### 2. `password` → `wachtwoord`

**Keuze:** De term `password`, die specifiek verwijst naar inloggegevens voor een account, wordt vertaald als `wachtwoord`.

**Rationale:** `Wachtwoord` is de standaard, universeel begrepen term voor website/account inloggegevens in het Nederlands. Dit is de term die gebruikers verwachten bij het inloggen op een account.

**Voorbeelden:**
- ✓ "Voer je wachtwoord in" (Enter your password)
- ✓ "Wachtwoord vergeten?" (Forgot password?)

### 3. `passphrase` → `wachtwoordzin`

**Keuze:** De term `passphrase`, die verwijst naar de bescherming voor een individueel geheim, wordt vertaald als `wachtwoordzin`.

**Rationale:** Dit volgt de richtlijn om een duidelijk onderscheid te maken met het account `wachtwoord`. `Wachtwoordzin` is een samengesteld Nederlands woord dat het concept communiceert van een langere, op zinnen gebaseerde beveiligingsmaatregel, anders dan een standaard wachtwoord. Dit onderscheid is cruciaal voor gebruikersbegrip.

**Onderscheid behouden:**
- `wachtwoord` = voor accounttoegang
- `wachtwoordzin` = voor geheimbescherming

**Voorbeelden:**
- ✓ "Beveilig met een wachtwoordzin" (Protect with a passphrase)
- ✓ "Voer de wachtwoordzin in om te bekijken" (Enter the passphrase to view)
- ✗ "Beveilig met een wachtwoord" (verwarrend - dit is voor accounts)

### 4. `burn` → `verbranden`

**Keuze:** De term `burn` wordt vertaald als `verbranden`.

**Rationale:** `Verbranden` communiceert de permanentie en onherroepelijkheid van de actie. Alternatieven zoals `vernietigen` of `verwijderen` zijn ook correct, maar `verbranden` behoudt de metafoor van het origineel en wordt in de technische context begrepen.

**Voorbeelden:**
- ✓ "Het geheim werd verbrand" (The secret was burned)
- ✓ Status: "Verbrand" (Status: Burned)
- Ook acceptabel: "vernietigen", "verwijderen" (delete/destroy)

### 5. `link` → `link` of `koppeling`

**Keuze:** Beide `link` en `koppeling` zijn acceptabel in het Nederlands.

**Rationale:** `Link` is een geleend Engels woord dat volledig ingeburgerd is in het Nederlands. `Koppeling` is het zuivere Nederlandse equivalent. Voor consistentie raden we aan één term te kiezen en deze consequent te gebruiken.

**Aanbeveling:** Gebruik `link` in UI-elementen voor beknoptheid, en `koppeling` in uitgebreidere documentatie waar dat natuurlijker klinkt.

**Voorbeelden:**
- ✓ "Kopieer de link" (Copy the link - UI)
- ✓ "Geheime koppelingen" (Secret links - documentatie)

## Thinking Behind Changes & Important Examples

### 1. Consistentie van kerntermen

**Rationale:** De richtlijnen benadrukken consistente terminologie om verwarring te voorkomen.

**Voorbeelden:**
- `secret`: Altijd `geheim` (niet wisselen met `bericht` tenzij context het vereist)
- `dashboard`: `Dashboard` (ingeburgerd Engels woord)
- `settings`: `Instellingen`
- `account`: `Account` (ingeburgerd Engels woord)

### 2. Gepaste stem (Actief vs. Passief)

**Rationale:** Richtlijnen specificeren actieve gebiedende wijs voor gebruikersacties (knoppen, links) en passieve/declaratieve stem voor informatieve tekst.

**Voorbeelden:**
- Knoppen (actief):
  - ✓ "Opslaan" (Save)
  - ✓ "Verwijderen" (Delete)
  - ✓ "Aanmaken" (Create)
- Statusberichten (passief):
  - ✓ "Opgeslagen" (Saved)
  - ✓ "Verwijderd" (Deleted)
  - ✓ "Link aangemaakt" (Link created)

### 3. Duidelijkheid en natuurlijke zinsbouw

**Rationale:** Vertalingen moeten natuurlijk klinken voor moedertaalsprekers en niet letterlijk zijn.

**Voorbeelden:**
- ✓ "Gekopieerd naar klembord" (Copied to clipboard)
- ✓ "Veelgestelde vragen" (FAQ)
- ✓ "Laden..." (Loading...)
- ✗ "Kopiëren naar het klembord" (te formeel/lang voor UI)

### 4. Directe aanspraak (je vs. u)

**Rationale:** Nederlandse vertalingen gebruiken de informele aanspreekvorm "je" voor een toegankelijkere, vriendelijkere toon. Dit is standaard in moderne tech-producten en SaaS-applicaties.

**Voorbeelden:**
- ✓ "Je zult het maar één keer kunnen zien" (You will only be able to see it once)
- ✓ "Heb je hulp nodig?" (Do you need help?)
- ✓ "Maak je eerste geheim aan" (Create your first secret)
- ✗ "U zult het maar één keer kunnen zien" (te formeel voor doelgroep)

**Wanneer "u" gebruiken:**
- In zeer formele B2B/enterprise contexten
- Voor overheids- of institutionele toepassingen
- Alleen indien expliciet gevraagd door klant

### 5. Volledigheid

Alle teksten moeten volledig vertaald zijn naar natuurlijk Nederlands, met behoud van de betekenis en toon van het origineel.

## Kritische vertaalregels

| Regel | Correct | Incorrect | Voorbeeld |
|-------|---------|-----------|---------|
| Secret vertaling (zelfstandig naamwoord) | bericht / beveiligd bericht | geheim | ✓ Je hebt 3 nieuwe berichten; ✓ Beveiligd bericht delen; ✗ Je hebt 3 nieuwe geheimen |
| Secret vertaling (bijvoeglijk naamwoord) | beveiligd | vertrouwelijk/geheim | ✓ Beveiligde links; ✗ Vertrouwelijke links; ✗ Geheime links |
| Geheim | VERMIJD ALTIJD | In algemene UI-tekst | ✗ Geheime berichten; ✗ Maak een geheim (roept criminele associaties op) |
| Vertrouwelijk | Alleen in formele juridische context | In algemene UI-tekst | ✓ Vertrouwelijk document (juridisch); ✗ Vertrouwelijke gegevens delen (UI) |
| Wachtwoord vs. wachtwoordzin | wachtwoord (account), wachtwoordzin (geheim) | Beide als "wachtwoord" | ✓ Voer je wachtwoord in (login); ✓ Voeg een wachtwoordzin toe (secret) |
| Actief vs. passief | Actief (knoppen/acties), passief (status/meldingen) | Gemengde vormen | ✓ Opslaan (knop); ✓ Opgeslagen (status) |
| Informele aanspraak | je (informeel) | u (formeel) tenzij vereist | ✓ Je kunt je geheim aanmaken; ✗ U kunt uw geheim aanmaken |
| Getallenformaat | Komma (decimaal), punt (duizendtallen) | Engels formaat | ✓ 1.234,56; ✗ 1,234.56 |
| Valuta | € 19,99 of €19,99 | $19.99 | ✓ € 19,99; ✗ $19.99 |
| Datum | dd-mm-jjjj of jjjj-mm-dd | mm/dd/yyyy | ✓ 14-11-2025; ✓ 2025-11-14; ✗ 11/14/2025 |
| Tijd | 24-uursnotatie | 12-uursnotatie met AM/PM | ✓ 14:30; ✗ 2:30 PM |
| Colonel rol | beheerder/administrator | letterlijke vertaling | ✓ Alleen beheerders hebben toegang; ✗ Alleen colonels hebben toegang |

## Geleende Engelse woorden

Het Nederlands accepteert veel geleende Engelse woorden, vooral in technische contexten. Gebruik ze waar ze natuurlijk en algemeen begrepen zijn.

**Acceptabele geleende woorden:**
- link
- e-mail (met koppelteken)
- dashboard
- account
- feedback
- settings (hoewel "instellingen" de voorkeur heeft)
- API
- token

**Nederlandse voorkeur:**
- ✓ instellingen (niet settings)
- ✓ gebruiker (niet user)
- ✓ klant (niet customer)
- ✓ delen (niet sharen)

## Cijfers en symbolen

### Decimalen en duizendtallen
- Decimaal scheidingsteken: komma (,)
- Duizendtal scheidingsteken: punt (.) of spatie ( )
- Voorbeelden: 1,23 of 1.234,56 of 1 234,56

### Valuta
- Symbool: €
- Positie: Voor of na het bedrag met spatie
- Voorbeelden: € 19,99 of €19,99 (beide acceptabel)

### Percentages
- Symbool: %
- Positie: Direct na het getal
- Voorbeeld: 99,95%

## Datum en tijd formaten

### Datum
- Kort formaat: dd-mm-jjjj (14-11-2025)
- ISO formaat: jjjj-mm-dd (2025-11-14) - voorkeur voor technische contexten
- Lang formaat: 14 november 2025

### Tijd
- Altijd 24-uursnotatie: 14:30 (niet 2:30 PM)
- Seconden indien nodig: 14:30:45

## Adresformaat

Nederlands adresformaat volgt deze structuur:

```
[Naam ontvanger]
[Straatnaam] [Huisnummer][Toevoeging]
[Postcode] [Plaats]
[LAND]
```

Voorbeeld:
```
Jan de Vries
Keizersgracht 123A
1015 CJ Amsterdam
NEDERLAND
```

## Regionale overwegingen

### Nederlands (Nederland) - nl

**Kenmerken:**
- Informele "je" aanspreekvorm als standaard
- Moderne, toegankelijke toon
- Gangbaar in tech en SaaS-producten
- Direct en efficiënt in communicatie

**Alternatieve varianten:**
- Nederlands (België) zou kleine verschillen kunnen hebben in woordkeuze
- Vlaams Nederlands kan andere voorkeurstermen hebben
- Standaard Nederlands (Nederland) wordt aanbevolen voor internationale producten

## Testen van vertaalkeuses

Voordat vertalingen worden gefinaliseerd:

1. **Native speaker review:** Laat moedertaalsprekers uit Nederland de teksten beoordelen
2. **Contextcontrole:** Zorg ervoor dat toon en formaliteit passen bij merkpositionering
3. **Consistentie audit:** Verifieer dat terminologie consistent wordt gebruikt
4. **Gebruikerstest:** Test met echte Nederlandse gebruikers voor natuurlijkheid

## Gerelateerde gidssecties

- Zie "Merkstem" voor toonrichtlijnen
- Zie "Grammatica- en stijlrichtlijnen" voor stemgebruik
- Zie Woordenlijst voor specifieke termvertalingen
