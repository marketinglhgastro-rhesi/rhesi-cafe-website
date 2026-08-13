# Rhesi Café & Restaurant — Audit (Stand: 2026-08-13)

Kurzes Re-Audit nach Favicon-Erstellung (Prompt 16) und -Verlinkung
(Prompt 17). Zwei Commits seit dem letzten Audit (`a5ef42a` → `6f0fb6c`).
Alle Angaben basieren auf einem frischen `npm run build`, `npx astro check`,
Codebase-Greps und Playwright-Checks gegen den laufenden Dev-Server.

---

## Fertig

- **Favicon jetzt vollständig verlinkt und erreichbar.** War beim letzten
  Audit noch kritisch (404), jetzt behoben: `favicon.svg`,
  `favicon-32x32.png` und `apple-touch-icon.png` liefern alle **200** mit
  korrektem `content-type`, alle vier `<head>`-Tags (SVG-Icon, PNG-Icon,
  Apple-Touch-Icon, `theme-color`) rendern im HTML. Das Motiv wurde dabei
  auch sinnvoll von der vollen Wortmarke auf ein reduziertes
  **"R"-Monogramm** umgestellt – bei 16×16/32×32 jetzt tatsächlich lesbar
  (visuell geprüft), anders als die ursprüngliche filigrane Wortmarke.
- **Build & Types**: `npm run build` weiterhin fehlerfrei, 8 Seiten, keine
  Warnungen. `npx astro check`: 0 Fehler/Warnungen/Hinweise (24 Dateien).
- **Kein Web-Manifest/Android-Icon-Referenz im HTML** – wie in Prompt 17
  gewollt, bewusst nicht eingebunden. Bestätigt: keine Treffer für
  `android-chrome` oder `manifest` in `src/`.
- **Voller Seiten-Sweep weiterhin sauber**: alle 8 Seiten liefern 200,
  keine 404-Requests, keine Konsolenfehler (Playwright-Sweep wiederholt).
- Alle bereits im letzten Audit als "Fertig" bestätigten Punkte
  (Header-Logo, Partner-Logos, Über-uns-Layout, Kontakt-Iframe-Entfernung,
  Impressum/Datenschutz-Inhalte, kein verstecktes Tracking, robots.txt/
  Sitemap/JSON-LD, Meta-Title/-Description, astro:assets-Bilder, Alt-Texte,
  Heading-Hierarchie, Fokus-Styles/Skip-Link) wurden stichprobenartig
  erneut verifiziert und sind weiterhin unverändert in Ordnung.

---

## Offen/fehlt

**Unverändert seit dem letzten Audit** (nochmals geprüft, keine
Bewegung – siehe letztes Audit für Details, hier nur Kurzfassung):

1. **Speisekarte hat weiterhin keinen Kaffee-/Getränke-Bereich.**
   `menu.json` hat unverändert nur 4 Kategorien, die `_note` behauptet
   weiterhin fälschlich, "Kaffee & Heißgetränke" und "Getränke" seien als
   Beispieldaten vorhanden.
2. **Footer-Logo weiterhin nicht umgesetzt** – nur der TODO-Kommentar aus
   einer früheren Runde steht noch da, der Footer zeigt nach wie vor
   reinen Text statt Logo.
3. **"Du"/"Sie"-Stilbruch weiterhin nur auf Über-uns** – restliche Seiten
   bleiben bei "Sie". **Neuer Zusatzbefund:** Sogar *innerhalb* von
   `ueber-uns.astro` selbst ist es inkonsistent – die (unsichtbare)
   Meta-Description der Seite lautet noch "**Erfahren Sie mehr** über das
   Rhesi Café..." (Sie-Form), während der sichtbare Seiteninhalt
   durchgängig "Du" verwendet. Google-Suchergebnis-Snippet und Seiteninhalt
   sprechen die Nutzerin also unterschiedlich an, bevor sie überhaupt
   geklickt hat.
4. **Card-Grid weiterhin 5 statt 4/6 Cards**, letzte Zeile bei 3-Spalten
   (Desktop) und 2-Spalten (Tablet) unausgeglichen – unverändert.
5. **Terracotta-Kontrastproblem unverändert**: weiterhin 27 Stellen mit
   `text-terracotta` (3.24:1, fällt AA-Normaltext durch) gegenüber 14
   Stellen mit der bereits vorhandenen, saubereren `text-terracotta-dark`
   (4.87:1 auf Weiß). CTA-Button-Hintergrund (`bg-terracotta`, 5 Stellen)
   ebenfalls unverändert bei 3.24:1.
6. **Philosophie-Highlights weiterhin `<p>` statt `<h3>`** auf Über-uns.
7. **Speisekarte-Beispieldaten**: unverändert, s. Punkt 1.

**Neu seit dem letzten Audit:**

8. **Favicon-Farbe weicht leicht von der Marke ab.** `public/favicon.svg`
   nutzt `fill="#493123"`, das definierte Kaffeebraun ist aber `#4A3428`
   (`--color-brown` in `global.css`). Der Unterschied ist auf den ersten
   Blick kaum sichtbar (beide sehr dunkles Braun, Delta wenige RGB-Stufen
   pro Kanal), aber technisch nicht die exakte Markenfarbe. Bereits beim
   Review der Favicon-Dateien selbst aufgefallen und hier nochmals
   festgehalten, da es bisher nicht korrigiert wurde.
9. **Uncommitteter Arbeitsstand hat sich vergrößert.** `git status` zeigt
   aktuell 6 geänderte/gelöschte und 2 neue, nicht getrackte Dateien im
   Favicon-/Bilder-Bereich (`favicon.svg`, alle Favicon-PNGs erneut
   modifiziert, `android-chrome-*.png` neu, `public/images/betriebe/
   rhesi.svg` gelöscht vs. `rhesi-logo.svg` neu, `gastgarten-eingang.webp`
   weiterhin unbenutzt) sowie die laufende wöchentliche
   Mittagsmenü-Aktualisierung (`mittagsmenue.json`) und kleinere
   Text-Feinschliffe (`ueber-uns.astro`). Nichts davon ist inhaltlich
   falsch, aber der Arbeitsstand wächst über mehrere Sessions uncommittet
   – empfehlenswert, das in überschaubaren Schritten zu committen, bevor
   der Überblick verloren geht.
10. **`android-chrome-192x192.png` / `android-chrome-512x512.png` sind
    tote Dateien.** Sie liegen in `public/`, werden aber laut Prompt 17
    bewusst nirgends verlinkt (kein Manifest gewollt) – bestätigt: keine
    Referenz im Code. Sie werden im Build mitkopiert und blähen `dist/`
    unnötig auf (zusammen ca. 30–40 KB, gering, aber unnötig). _Entweder
    behalten für eine spätere Manifest-Ergänzung, oder jetzt löschen, um
    das Repo sauber zu halten – aktuell ist es weder-noch._

---

## Kritisch vor Launch

1. **Rechtliche Daten (Impressum) weiterhin unverifiziert.** Unverändert
   seit mehreren Audits: Firmenbuchnummer, UID, Geschäftsführung etc.
   stammen aus Drittquellen-Recherche und müssen vor Launch gegen einen
   aktuellen Firmenbuchauszug oder mit dem Steuerberater abgeglichen
   werden.
2. **Speisekarte ohne Getränke-Sektion** (s. "Offen/fehlt" #1) – bleibt
   kritisch eingestuft, weil für ein Café die Kaffeepreise fehlen, nicht
   nur ein Nice-to-have-Detail.

_Das Favicon-Problem aus dem letzten Audit ist raus aus dieser Liste –
sauber behoben._

---

## Gesamteinschätzung

Seit dem letzten Audit wurde gezielt genau ein Punkt bearbeitet – das
Favicon – und das sauber und vollständig, inklusive einer sinnvollen
Design-Korrektur (Monogramm statt unlesbarer Wortmarke bei kleinen
Größen). Alle anderen beim letzten Mal aufgezeigten Punkte (Getränkekarte,
Footer-Logo, Kontrast, Grid, Stilbruch) sind unverändert liegen geblieben
– das ist an sich in Ordnung für ein fokussiertes Zwischen-Audit, sollte
aber nicht dazu führen, dass sie aus dem Blick geraten. Die wachsende
Menge uncommitteter Änderungen ist der einzige neue, eigenständig
handlungsrelevante Punkt: nichts Kaputtes, aber es lohnt sich, das
bald in klar benannte Commits zu überführen, bevor der Überblick
schwieriger wird. Launch-Bereitschaft hängt weiterhin an denselben zwei
kritischen Punkten wie zuletzt: Getränkekarte und Impressum-Verifizierung.
