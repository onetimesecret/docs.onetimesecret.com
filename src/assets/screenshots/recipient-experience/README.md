# Recipient experience screenshots

Used by `src/content/docs/en/share/what-recipients-see.md`.

- Captured: 2026-10-20 (America/Vancouver).
- Instance: `https://ca.onetimesecret.com`, the hosted Canada region. These are not custom-domain or self-hosted captures. The footer in the original full-page captures read “Powered by Onetime Secret”.
- Application version: not recorded at capture time; the deployed version is unknown.
- Capture size: 1280 × 1000 CSS pixels at 1× scale, in light and dark mode.
- Published crops: x=320, y=136, width=640 for every frame; heights are 256 (before reveal), 304 (passphrase), 448 (revealed), and 384 (unavailable). This keeps the recipient card and its nearby instructions, removing surrounding whitespace and the distant footer.
- Format: lossless WebP crops made from the original JPEG captures. The conversion avoids further lossy encoding; it does not restore detail lost in the originals. For future captures, use lossless PNG or WebP from the start when supported.
- Example content: a fictional guest Wi-Fi password, `example-only-not-a-real-password`.

## Regenerate

1. Create two new example secrets on the intended instance with the fictional content above. Set a passphrase on one and leave the other without one. Record the deployed app version if available.
2. Use a 1280 × 1000 viewport at 1× scale. Scroll to the top before capturing so fixed page elements remain in their normal position.
3. Capture the plain confirmation page as `before-reveal-light` and `before-reveal-dark`, then the protected confirmation page with its passphrase field empty as `passphrase-light` and `passphrase-dark`.
4. Reveal a secret once. Capture the displayed fictional content as `revealed-light` and `revealed-dark`, switching themes without reloading the page.
5. Reopen the consumed link and capture `unavailable-light` and `unavailable-dark`.
6. Crop around the complete card and adjacent instructions in both themes. Use identical crop bounds for each pair; adjust the recorded bounds if the layout changes. Preserve all relevant UI text and controls.
7. Export lossless WebP variants, retaining the existing filenames. Keep secret URLs and passphrases out of repository files and screenshots.
8. Build the docs and inspect all four figures in both themes and print preview. Verify that only one variant appears per figure and that printing uses the light variants even when the page is dark.
