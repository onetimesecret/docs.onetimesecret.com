---
title: Je regio wijzigen
---

Onetime Secret gebruikt een [share-nothing-architectuur](/nl/regions) in alle vijf regio's (CA, EU, NZ, UK, US). Elke regio werkt als een volledig apart systeem met een eigen database, eigen accounts en eigen geheimen. We dragen onder geen enkele omstandigheid gegevens over tussen regio's.

Dat betekent dat het wijzigen van je regio minder een "migratie" is en meer een kwestie van opnieuw beginnen in je gewenste regio. Het goede nieuws: het kost ongeveer twee minuten, en je abonnement gaat automatisch mee.

## Gratis accounts

Navigeer rechtstreeks naar je gewenste regio (zie [Beschikbare regio's](/nl/regions#beschikbare-regios) voor de volledige lijst) en maak een nieuw account aan met hetzelfde e-mailadres. Dat is alles — je nieuwe account is direct klaar voor gebruik.

## Betaalde accounts (Identity Plus)

Het proces is hetzelfde als bij gratis accounts, met één extra stap:

1. Ga naar de URL van je gewenste regio (zie [Beschikbare regio's](/nl/regions#beschikbare-regios))
2. Maak een account aan met hetzelfde e-mailadres dat aan je abonnement is gekoppeld
3. Log in en ga naar je accountpagina
4. Je abonnementsstatus wordt automatisch herkend via Stripe

Mogelijk moet je de pagina één keer vernieuwen voordat je abonnement wordt gesynchroniseerd. Dit werkt omdat we gegevens gescheiden houden tussen regio's, terwijl je factureringsrelatie wordt beheerd via Stripe, dat je e-mailadres in alle regio's herkent.

## Wat gebeurt er met je oude account

Je account in de vorige regio blijft volledig functioneel:

- Bestaande geheime links blijven werken totdat ze worden bekeken of verlopen
- Je account blijft actief, mocht je later nog iets nodig hebben
- Je hoeft niets te doen met het oude account, tenzij je het wilt sluiten

## Migratie van een aangepast domein

Als je in je huidige regio een aangepast domein hebt geconfigureerd, vraagt het proces wat meer planning. Omdat je bestaande geheime links gebruikmaken van de DNS-records van je aangepaste domein, kun je het domein niet zomaar naar de nieuwe regio verwijzen zonder links te breken die nog niet zijn bekeken.

### Stap voor stap

1. **Voeg een tijdelijk subdomein toe** aan je account in de nieuwe regio. Als je huidige domein bijvoorbeeld `secrets.example.com` is, voeg dan iets toe zoals `secrets-new.example.com` of `secrets-us.example.com`.

2. **Maak een CNAME-record aan** voor het tijdelijke subdomein dat verwijst naar het juiste regionale identity-endpoint (bijv. `identity.us.onetime.co` voor de US-regio). Raadpleeg de [installatiegids voor aangepaste domeinen](/nl/custom-domains/setup-guide) voor details over de DNS-configuratie.

3. **Gebruik het tijdelijke subdomein** meteen voor nieuwe geheimen.

4. **Na 30 dagen** zijn alle geheimen die op het oude domein zijn aangemaakt, verlopen. Daarna kun je:
   - Het aangepaste domein verwijderen uit je account in de oude regio
   - Je gewenste subdomein (bijv. `secrets.example.com`) toevoegen aan je account in de nieuwe regio
   - Het CNAME-record bijwerken zodat het naar het endpoint van de nieuwe regio verwijst
   - Het domein verifiëren in je accountdashboard

5. **Ruim het tijdelijke subdomein op** zodra je gewenste domein actief en geverifieerd is.

### Waarom 30 dagen?

De maximale levensduur (TTL) van een geheim is 30 dagen. Door deze periode aan te houden, weet je zeker dat alle geheimen die onder de DNS-configuratie van de oude regio zijn aangemaakt, ofwel bekeken zijn ofwel verlopen zijn — waardoor het bijwerken van het CNAME-record geen openstaande links breekt.

Weet je zeker dat al je bestaande geheimen een kortere TTL hebben of al zijn bekeken? Dan kun je eerder overschakelen.

## Accounts zonder aangepast domein

Gebruik je geen aangepast domein, dan is de overstap direct. Je oude links (met de regionale onetimesecret.com-URL's, zoals `eu.onetimesecret.com/secret/abcd1234`) blijven correct werken, ongeacht in welke regio je actieve account zich bevindt.

## Meerdere regio's

Je kunt tegelijkertijd accounts in meerdere regio's aanhouden. Alle accounts met hetzelfde e-mailadres delen dezelfde abonnementsstatus. Dit kan handig zijn als je gebruikers in verschillende geografische gebieden bedient en de latency wilt minimaliseren of aan vereisten voor gegevensresidentie wilt voldoen.

## Dedicated instances

Klanten met een dedicated instance nemen voor regiowijzigingen contact met ons op via [dedicated@onetimesecret.com](mailto:dedicated@onetimesecret.com), aangezien dedicated infrastructuur handmatige herconfiguratie vereist. Je kunt ons ook bereiken via de [feedbackpagina](https://onetimesecret.com/feedback).
