# Cross-locale impact audit — general-purpose agent

**Date:** 2026-04-12
**Agent:** general-purpose
**Working directory:** `/Users/d/Projects/dev/onetimesecret/worktrees/i18n-harmonization` (branch `i18n/harmonization`)
**Scope:** 29 "Harmonize X locale" commits on 2026-04-10 touching `locales/content/<loc>/*.json`

The text below is the agent's verbatim report.

---

# Cross-Locale Impact Audit — Harmonization Loop

Scope: 29 "Harmonize X locale" commits on 2026-04-10 touching `locales/content/<loc>/*.json`. Baseline compared against each commit's parent; pre-reorg baseline traced through `be5bdb5ca` (2025-11-15, single-file delete).

## Summary Table

| Locale | Harmonize commit | Severity | T-V flip? | Brand-term drift? | Pre-reorg baseline | Notes |
|---|---|---|---|---|---|---|
| de_AT | b08e59838 | **High** | Yes Sie→du, full | Yes Geheimnis(108)→0, Nachricht(65→201) | be5bdb5ca^ uses Sie/Ihre, mixes Geheimnisse/Nachricht | Index case |
| pt_PT | 3f9d8d3d2 | **High** | Yes você/seu→tu/teu, full | Minor (segredo 1→2) | be5bdb5ca^ empty; populated 44b3c3352 (2026-03-15) mixed-formal | EU register lost, imperatives now 2sg (Verifica/Repõe) |
| uk | 5c7d5c362 | **High** | Yes Ви/Вас/Ваш→ти/тобі, email F=65→0 I=0→23 | No (таємниця stable) | be5bdb5ca^ uses Ви/ваша, formal imperatives | Full formal-imperative loss |
| hu | bea7e1b7e | **High** | Yes Ön/Önnek→te/neked/titkod | Minor (new "titkod" 10x — informal possessive) | be5bdb5ca^ empty; populated 44b3c3352 clean formal Ön | Adds informal 2sg possessive suffix throughout |
| da_DK | 6c1b55c16 | **Med** | N/A (Danish only uses du) | **Yes inverse**: besked(115)→besked(42), hemmelighed(7)→(103) | be5bdb5ca^ | Not T-V but massive brand-term replacement besked→hemmelighed. May be a correction toward brand; same pipeline |
| zh | 311537d04 | **Med** | Mild: 您 dropped (formal pronoun) in email F=4→0 | 消息(18→35) doubled | be5bdb5ca^ | Formal address 您 eroded; message-term inflated |
| it_IT | fd2e76af6 | **Low/None** | No (already tu) | Minor (+4 segreto) | be5bdb5ca^ | Already informal Italian; no regression |
| fr_FR / fr_CA | 9cda6c953 / 49f89b392 | **None** | No, vous stable F=24/22 both sides | No | be5bdb5ca^ uses vous | Struct changes only |
| es / pt_BR / nl / ca_ES / vi / sl_SI / tr / ru / ja / ko / el_GR / bg / cs / pl / de / sv_SE | — | **None** | No measurable flip | No | — | See notes below |

Notes on "None":
- **es, pt_BR, ca_ES, vi, nl, cs, pl, de, sv_SE, da_DK (for T-V)**: languages already informal/neutral in baseline; no register to flip.
- **ru, el_GR, sl_SI, tr, bg**: formal markers preserved or (bg) slightly strengthened.
- **ja**: masu/desu count rose 20→25 / 23→28 — slight reinforcement of polite form.
- **ko**: hamnida/haeyo mix stable (F 14→18, I 25→24).
- **pl**: was already 2sg informal ("Ci/Twojego"). No pan/pani in either side.
- **bg**: session-auth moved formal→more formal (Въведете → Запомни remains; добавлено "Забравили сте").
- **cs**: no Vy markers found; always 2sg.

## HIGH Severity Concrete Examples

**de_AT email.json (b08e59838)**
- pre: `"Willkommen bei %{product_name} - Bitte verifizieren Sie Ihre E-Mail"`
- post: `"Willkommen bei %{product_name} - Bitte verifiziere deine E-Mail"`
- pre: `"Oder kopieren Sie diesen Link:"`
- post: uses "du klickst" / "deine E-Mail-Adresse"
- pre session-auth: `"Geben Sie Ihre Anmeldedaten ein"`
- post session-auth: `"Gib deine Anmeldedaten ein"`
- Brand collapse: 108 Geheimnis → 0; TITLES.incoming `"Eingehende Geheimnisse"` lost.

**pt_PT email.json (3f9d8d3d2)**
- pre: `"A tua mensagem confidencial foi visualizada"` (mixed)
- post: `"Bem-vindo ao %{product_name} - Verifica o teu e-mail"` / `"Repor a tua palavra-passe"` / `"Repõe a tua palavra-passe"` — imperative 2sg throughout, "você" zeroed out in email.

**uk email.json (5c7d5c362)**
- pre: `"Ласкаво просимо до %{product_name} - Будь ласка, підтвердіть Вашу електронну адресу"`
- post: `"%{sender_email} надіслав тобі таємницю"` / `"надіслав тобі таємницю:"` — formal "Ваш" + 2pl imperative ("підтвердіть") replaced by 2sg "тобі" and "надіслав". Session-auth: `"Зареєструватися" → "Зареєструйся"`, `"Забули пароль?" → "Забув пароль?"`, `"Введіть" → "Введи"`.

**hu email.json (bea7e1b7e)**
- pre: `"%{sender_email} titkot küldött Önnek"` / `"Valaki biztonságos üzenetet küldött Önnek a %{display_domain} oldalon keresztül."`
- post: `"%{sender_email} titkot küldött neked"` / `"…küldött neked…"` / `"A titkodat megtekintették"` (introduces informal possessive suffix "-d").

## Pre-Reorg Baselines (single-file era, all deleted at `be5bdb5ca` 2025-11-15)

| Locale | Baseline SHA | Register at baseline |
|---|---|---|
| de_AT | be5bdb5ca^ | Sie/Ihre throughout, mixed Geheimnis/Nachricht — clean formal |
| uk | be5bdb5ca^ | Ви/ваша throughout — clean formal |
| pt_PT | be5bdb5ca^ | Mostly empty strings at reorg; first populated in `44b3c3352` (2026-03-15 i18n harmonize WIP) where it held mixed você+tu leaning formal |
| hu | be5bdb5ca^ | Empty at reorg; first populated `44b3c3352` with clean formal Ön |

For de_AT and uk, `be5bdb5ca^` is a usable revert source. For hu and pt_PT, the usable baseline is `d8834a021` or earlier (just before April 10 re-harmonize but after March translation pass) — hu `d8834a021` = 16 formal / 0 informal in email.json.

## Pipeline Note (secondary)

No live sync. `locales/guides/for-translators/<locale>.md` files carry a footer: `This guide was generated from ... /<lang>/translations/glossary.md ... /<lang>/translations/language-notes.md ... Generated: 2026-01-20`. That is a one-shot bootstrap from the docs project on 2026-01-20, not a continuous sync. No generator script in this repo references `for-translators/`; `locales/TRANSLATION_PROTOCOL.md` describes the guides as hand-authored context. Consequence: fixing the corrupted guidance in `docs.onetimesecret.com` will NOT auto-propagate. After fixing docs, the app-repo guides must be re-generated (reuse whatever produced the 2026-01-20 snapshot) or patched by hand before the next harmonize pass; otherwise future agents read the same corrupted `for-translators/hu.md`, `de_AT.md`, etc. and repeat the flip.

## Repair Scope

Four locales need the revert+replay treatment identical to de_AT: **de_AT, pt_PT, uk, hu**. Secondary attention on **da_DK** (brand-term swap besked→hemmelighed via same commit) and **zh** (mild formal 您 erosion plus 消息 inflation) — probably fixable in place without a full replay. Everything else is clean.
