---
Titel: Leitfaden zur Sicherheitskonfiguration
Beschreibung: Härtung von OneTimeSecret für den Produktionseinsatz
---

Dieser Leitfaden behandelt sicherheitskritische Konfigurationseinstellungen und bewährte Verfahren für die Bereitstellung von OneTimeSecret in Produktionsumgebungen.

## Kritische Sicherheitseinstellungen

### Bewerbung Geheimnis

Das `site.secret` wird für alle kryptographischen Operationen verwendet. **Dies muss vor dem Produktionseinsatz geändert werden.

``yaml
site:
  secret: <%= ENV['SECRET'] || 'CHANGEME' %>
```

Erzeugen Sie ein starkes Geheimnis:

```bash
# OpenSSL verwenden
openssl rand -hex 32

# Ruby verwenden
ruby -rsecurerandom -e 'setzt SecureRandom.hex(32)'

# Einstellung in der Umgebung
export SECRET=Ihre-generierte-64-Zeichen-Hex-Zeichenfolge
```

**Wichtig**: Einmal festgelegt, sollte dieses Geheimnis niemals geändert werden. Eine Änderung macht bestehende Geheimnisse unwiederbringlich.

### Authentifizierungsschutz

Konfigurieren Sie den Anti-Bot-Schutz für Formulare:

``yaml
Seite:
  Authentizität:
    type: altcha
    secret_key: <%= ENV['AUTHENTICITY_SECRET_KEY'] || '<REPLACE_WITH_STRONG_HMAC_KEY>' %>
```

HMAC-Schlüssel generieren:

```bash
export AUTHENTICITY_SECRET_KEY=$(openssl rand -hex 32)
```

### Administrator-Zugang

Konfigurieren Sie die Oberstkonten (Admin-Konten) sorgfältig:

``yaml
Seite:
  Authentifizierung:
    colonels:
      - <%= ENV['COLONEL'] || 'CHANGEME@example.com' %>
      - security-team@company.com
```

Die Obersten haben Zugang zu:
- Systemstatistiken
- Übersicht über die Konfiguration
- Leistungsmetriken

## Sicherheits-Middleware

### Produktionskonfiguration

Aktivieren Sie alle Sicherheits-Middleware in der Produktion:

``yaml
experimentell:
  middleware:
    # Wesentliche Schutzmaßnahmen
    utf8_sanitizer: true # Verhindert Kodierungsangriffe
    path_traversal: true # Blockiert Verzeichnis-Traversal
    ip_spoofing: true # Überprüfung der Client-IPs

    # HTTPS-Durchsetzung
    strict_transport: true # HSTS-Kopfzeilen

    # Zusätzliche Schutzmaßnahmen
    http_origin: true # CSRF-Schutz
    escaped_params: true # XSS-Schutz
    xss_header: true # Browser XSS-Filterung
    frame_options: true # Schutz vor Clickjacking
    cookie_tossing: true # Schutz vor Sitzungsfixierung
```

### Hinter einem Proxy

Beim Betrieb hinter einem Sicherheitsproxy (nginx, CloudFlare) kann einige Middleware deaktiviert werden:

``yaml
experimentell:
  middleware:
    # Proxy behandelt diese
    strict_transport: false # Proxy fügt HSTS hinzu
    xss_header: false # Proxy fügt X-XSS-Schutz hinzu
    frame_options: false # Proxy fügt X-Frame-Options hinzu

    # Anwendung muss diese verarbeiten
    utf8_sanitizer: wahr
    path_traversal: wahr
    ip_spoofing: wahr
    http_origin: wahr
    escaped_params: wahr
    cookie_tossing: wahr
```

## Redis-Sicherheit

### Verbindungssicherheit

``yaml
Speicherung:
  db:
    connection:
      # Passwort-Authentifizierung verwenden
      url: redis://:<Passwort>@localhost:6379/0

      # Für Redis 6+ mit ACL
      url: redis://benutzername:passwort@localhost:6379/0
```

### Netzwerksicherheit

1. **Binden an localhost** in der Redis-Konfiguration:
   ```
   bind 127.0.0.1 ::1
   ```

2. **Authentifizierung** in redis.conf aktivieren:
   ```
   requirepass ihr-strong-redis-passwort
   ```

3. **Gefaehrliche Befehle abschalten**:
   ```
   umbenennen-Befehl FLUSHDB ""
   umbenennen-Befehl FLUSHALL ""
   umbenennen-Befehl CONFIG ""
   ```

## Mail Security

### SMTP-Konfiguration

``yaml
mail:
  connection:
    # TLS-Verschlüsselung verwenden
    tls: wahr
    port: 587
    auth: Anmeldung

    # Sichere Anmeldedaten
    Benutzer: <%= ENV['SMTP_USERNAME'] %>
    pass: <%= ENV['SMTP_PASSWORT'] %>

    # Gültige Absenderadresse
    von: <%= ENV['FROM_EMAIL'] || 'noreply@company.com' %>
```

### E-Mail-Validierung

Konfigurieren Sie eine strenge Validierung für die Produktion:

``yaml
mail:
  validation:
    Empfänger:
      # Vollständige SMTP-Prüfung
      default_validation_type: :smtp

      # Sicherheit erhöhen
      connection_attempts: 1
      smtp_fail_fast: true

      # Beschränkung auf bekannte Domains
      allowed_domains_only: true
      allowed_domains:
        - firma.de
        - vertrauensvoller-partner.de
```

## Ratenbegrenzung

### Produktionsgrenzwerte

Konservative Grenzen für die öffentliche Bereitstellung:

``yaml
Grenzen:
  # Kernoperationen
  create_secret: 100 # Alle 20 Minuten
  show_secret: 200
  burn_secret: 200

  # Authentifizierung
  create_account: 2
  authenticate_session: 10
  failed_passphrase: 5

  # Wiederherstellung
  passwort_vergessen_anfordern: 2
  vergessen_passwort_zurücksetzen: 3
```

### Interne Bereitstellung

Gelockerte Grenzwerte für den internen Gebrauch:

``yaml
Grenzen:
  create_secret: 1000
  zeige_geheimnis: 2000
  authenticate_session: 50
  fehlgeschlagene_passphrase: 10
```

## SSL/TLS-Konfiguration

### Anwendungseinstellungen

``yaml
site:
  ssl: true
  host: secrets.firma.com
```

### Nginx SSL-Konfiguration

``nginx
Server {
    listen 443 ssl http2;
    server_name secrets.firma.com;

    # Moderne SSL-Konfiguration
    ssl_certificate /pfad/zu/cert.pem;
    ssl_zertifikat_schlüssel /pfad/zu/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers aus;

    # Sicherheits-Header
    add_header Strict-Transport-Security "max-age=63072000" immer;
    add_header X-Frame-Options "SAMEORIGIN" immer;
    add_header X-Content-Type-Options "nosniff" immer;
    add_header X-XSS-Schutz "1; mode=block" immer;
    add_header Referrer-Policy "strict-origin-when-cross-origin" immer;

    Standort / {
        proxy_pass http://localhost:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
    }
}
```

## Überwachung und Warnungen

### Fehlerverfolgung

``yaml
Diagnose:
  sentry:
    defaults:
      dsn: <%= ENV['SENTRY_DSN'] %>
      sampleRate: 0.10
      maxBreadcrumbs: 5
      logErrors: false # Protokollrauschen reduzieren
```

### Sicherheitswarnungen

Monitor für:
1. **Fehlgeschlagene Authentifizierungsversuche**, die Ratengrenzen überschreiten
2. **Ungewöhnliche Muster bei der Erstellung von Geheimnissen**
3. **Redis-Verbindungsfehler**
4. **Ablauf von SSL-Zertifikaten**

## Checkliste für den Einsatz

### Einsatzvorbereitung

- Erzeugen und Sichern des `SECRET`-Wertes
- `AUTHENTICITY_SECRET_KEY` erzeugen
- Konfigurieren Sie gültige `COLONEL`-E-Mails
- [ ] Redis-Authentifizierung einrichten
- [ ] SSL-Zertifikate konfigurieren
- [ ] Geeignete Ratenlimits einstellen
- [ ] Mail-Zustellung konfigurieren
- [ ] Fehlerverfolgung einschalten

### Post-Einsatz

- SSL-Konfiguration überprüfen (SSL Labs)
- [ ] E-Mail-Zustellung testen
- [ ] Bestätigung, dass die Ratenbegrenzung funktioniert
- [ ] Sicherheits-Header prüfen
- [ ] Fehlerraten überwachen
- [ ] Zugriffsprotokolle überprüfen

## Geheime Rotation

Wenn Sie das Anwendungsgeheimnis drehen müssen:

1. **Altes Geheimnis zur Rotationsliste hinzufügen**:
   ``yaml
   experimentell:
     rotated_secrets:
       - alter-geheimnis-wert
   ```

2. **Neues Primärgeheimnis setzen**:
   ``yaml
   Standort:
     secret: new-secret-value
   ```

3. **Alte Geheimnisse** nach Ablauf der maximalen TTL entfernen

## Sicherheitskopfzeilen

Empfohlene Sicherheits-Header (über Proxy oder Middleware):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
```

## Reaktion auf Vorfälle

Wenn ein Sicherheitsvorfall eintritt:

1. **Geheimnisse sofort umdrehen**:
   - Anwendungsgeheimnis
   - Redis-Kennwort
   - SMTP-Anmeldeinformationen
   - API-Schlüssel

2. **Prüfen Sie die Protokolle** auf:
   - Unerlaubte Zugriffsversuche
   - Ungewöhnliche Muster bei der Erstellung von Geheimnissen
   - Verstöße gegen die Ratenbegrenzung

3. **Nutzer** benachrichtigen, wenn ihre Daten betroffen sein könnten

4. **Konfiguration aktualisieren**, um ein erneutes Auftreten zu verhindern
