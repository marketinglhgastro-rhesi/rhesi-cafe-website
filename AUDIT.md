# Rhesi Café & Restaurant — Audit (Stand: 2026-08-07)

Vollständiges Re-Audit nach Logo (2e/2f), Partner-Logos (3e), überarbeiteter
Über-uns-Seite (3f/13), Impressum (10), Datenschutz + Maps-Link-out (11) und
Gastgarten-Fotos (12). Alle Angaben basieren auf einem frischen
`npm run build`, `npx astro check`, Codebase-Greps und Playwright-Checks
gegen den laufenden Dev-Server — keine Annahmen ohne Beleg.

---

## Fertig

- **Build & Types**: `npm run build` läuft fehlerfrei, 8 Seiten, keine
  Warnungen. `npx astro check`: 0 Fehler, 0 Warnungen, 0 Hinweise (24 Dateien).
  dist/ gesamt **3.0 MB**, 120 Dateien (`_astro/` 2.1 MB, `images/` 368 KB
  [Partner-Logos, unoptimiert als SVG kopiert], Rest verteilt auf 8 Seiten
  je 60–72 KB HTML).
- **Header-Logo**: Inline-SVG (`?raw`-Import + `<Fragment set:html>`), rendert
  korrekt in Kaffeebraun (`currentColor` via `fill: currentColor` in
  scoped Style), Höhe exakt an `h-10` gebunden, kein Verzerren. Geprüft auf
  Mobile (390px) und Desktop (1280px) sowie im geöffneten mobilen Menü –
  überall sauber.
- **Partner-Logos ("Weitere Betriebe")**: Alle 5 Einträge (Rio, TacoTaco,
  Mr. French, Schmugglar, Piazza Azzurra & iTaly) haben ein `logo`-Feld
  gesetzt und die zugehörigen SVG-Dateien liegen tatsächlich unter
  `public/images/betriebe/*.svg` (26–164 KB, echte SVGs, kein JPG
  verifiziert). Der Anfangsbuchstaben-Fallback ist aktuell **nirgends**
  mehr sichtbar, weil kein `logo: null` mehr vorkommt.
- **Über-uns-Seite**: Zweispaltiges Layout mit echtem Gastgarten-Foto
  (`gastgarten-weit.webp`) vorhanden, Lead-Absatz optisch abgesetzt
  (größere Schrift + Terracotta-Randlinie), Philosophie als 3 Icon-Highlights
  (Frühstück/Mittagsmenü/Konditorei) statt Fließtext. Durchgängig
  "Du"-Anrede. → **Stilbruch-Hinweis siehe unten unter "Offen/fehlt".**
- **Kontaktseite**: Kein `<iframe>` mehr im HTML (verifiziert: 0 iframes im
  DOM), stattdessen Karte mit Adresse + Button "In Google Maps öffnen"
  (`target="_blank" rel="noopener noreferrer"`). Zusätzlich
  `gastgarten-detail.webp` als kleines Foto unterhalb von
  Adresse/Öffnungszeiten vorhanden.
- **Startseite**: Highlight-Card-Grid enthält jetzt "Gastgarten" (Foto
  `gastgarten-weit.webp`, Text wie vorgegeben, Link zu `/kontakt`) – siehe
  aber Layout-Hinweis unten (5 statt 4 Cards, Grid nicht immer ausgeglichen).
- **Bild-Herkunft**: Codebase-weite Suche nach `IMG_` und den genannten
  Guest-Foto-Namen (IMG_4448/4459/4508) ergab **keine Treffer** – weder als
  Datei im Repo noch als Referenz im Code. Nur `gastgarten-weit.webp`,
  `gastgarten-detail.webp` und (unbenutzt, siehe unten) `gastgarten-eingang.webp`
  sind vorhanden.
- **Impressum**: Alle Daten aus Prompt 10 vollständig eingetragen (L&H
  Gastro GmbH, Sitz, FN 285704d, Landesgericht Feldkirch, UID, Geschäftsführung,
  Unternehmensgegenstand, GISA-Zahl, Gewerbebehörde, Kammer, anwendbare
  Rechtsvorschriften). Verifizierungs-Kommentar ("Daten aus Drittquellen...
  vor Launch verifizieren") ist im Code vorhanden.
- **Datenschutzerklärung**: Alle 11 Abschnitte aus Prompt 11 vollständig
  vorhanden (Verantwortlicher, Allgemeines, Hosting/Cloudflare, Cookies,
  Google Fonts selbst gehostet, Google-Maps-Link-out, Kontaktaufnahme,
  Social-Media-Links, Rechte, TLS, Aktualität).
- **Kein undokumentiertes Tracking**: Codebase-weite Suche nach
  `gtag|google-analytics|googletagmanager|fbq|hotjar|clarity|plausible|umami`
  ergab keine Treffer. Die einzigen `<script>`-Blöcke im Projekt sind
  JSON-LD (Seo.astro, mittagsmenues.astro), das Burger-Menü-Toggle
  (Header.astro) und das Scroll-Reveal-Script (BaseLayout.astro) – die
  Aussage "keine Tracking-Cookies" in der Datenschutzerklärung ist damit
  **wahrheitsgemäß**.
- **robots.txt / Sitemap**: `robots.txt` erlaubt alles und verweist korrekt
  auf `https://rhesi-cafe.at/sitemap-index.xml`; `astro.config.mjs` hat
  `site: 'https://rhesi-cafe.at'` gesetzt, Sitemap wird korrekt mit allen
  8 URLs generiert.
- **JSON-LD**: Jede Seite hat mindestens einen `application/ld+json`-Block
  (CafeOrCoffeeShop). Die Mittagsmenü-Seite hat zusätzlich einen zweiten
  Block vom Typ `Menu`/`MenuSection` mit den Tagesgerichten.
- **Meta-Title/-Description**: Alle 8 Seiten haben individuelle,
  themenrelevante Title (42–59 Zeichen, alle unter 60) und Descriptions
  (79–150 Zeichen, alle unter 155) – rechnerisch geprüft nach
  HTML-Entity-Decodierung, nicht nur Rohzeichen gezählt.
- **Bilder / astro:assets**: Alle Content-Fotos (Hero, Cards, Über-uns,
  Kontakt, AtmosphereStrip) laufen über `astro:assets` mit `<Image />`,
  liegen in `src/assets/images/`, haben `width`/`height`, `format="webp"`,
  `quality`, `loading="lazy"` (Hero: `eager` wo above-the-fold) und
  Alt-Texte. Keine `<img src="/images/...">`-Referenz auf rohe
  `public/`-Content-Fotos mehr gefunden.
- **Alt-Texte**: Jedes `<img>`/`<Image>` im Code hat ein `alt`-Attribut
  (verifiziert für alle 7 Fundstellen in Komponenten/Seiten).
- **Heading-Hierarchie**: Jede Seite hat genau ein `<h1>` (index.astro
  bezieht seins aus der Hero-Komponente). `MenuCategory` (h2→h3),
  `Card` (h3), `ContactInfo` (h2) fügen sich sauber ohne Level-Sprünge ein.
- **Fokus-Styles & Skip-Link**: `:focus-visible` ist global mit sichtbarem
  Terracotta-Outline definiert (`outline: 2px solid var(--color-terracotta)`),
  ein funktionierender Skip-Link ("Zum Inhalt springen") springt zu
  `#main-content`, das `<main>` trägt diese ID auch tatsächlich.
- **Keine kaputten internen Links/Requests**: Alle 8 Seiten liefern beim
  Aufruf HTTP 200, keine 404-Requests für Bilder/Skripte, keine
  Konsolen-Fehler (Playwright-Sweep über alle Seiten).
- **Git-Hygiene**: Ein Branch (`main`), sauber lineare Commit-Historie mit
  aussagekräftigen Messages. Kleinere offene Arbeitsstände siehe unten.

---

## Offen/fehlt

1. **Speisekarte hat aktuell KEINEN Kaffee-/Getränke-Bereich mehr.**
   `menu.json` enthält nur noch 4 Kategorien (Suppen & Salate, Hauptspeisen,
   Speisen für den kleinen Hunger, Frühstück) – "Kaffee & Heißgetränke" und
   "Getränke" wurden aus dem `categories`-Array entfernt, live auf
   `/speisekarte` erscheint dazu **nichts**. Der `_note`-Kommentar in der
   Datei behauptet aber weiterhin, diese beiden Kategorien seien als
   Beispieldaten vorhanden ("Kaffee & Heißgetränke sowie Getränke sind
   weiterhin BEISPIELDATEN... müssen noch durch die echte Karte ersetzt
   werden") – das ist inzwischen schlicht falsch, die Kategorien existieren
   nicht mehr. Für ein Café ist eine Speisekarte ganz ohne Getränkeabschnitt
   ein auffälliger Lücke. _Empfehlung: entweder die zwei Kategorien wieder
   einfügen (auch nur als Platzhalter) oder bewusst entscheiden, Getränke
   separat zu führen – aber die `_note` in jedem Fall korrigieren, damit sie
   den tatsächlichen Stand beschreibt._
2. **Footer-Logo nicht umgesetzt.** Prompt 2f wurde in einer früheren Runde
   nur als Kommentar vorbereitet ("TODO: Bei Bedarf durch das echte Logo
   ersetzen..."), aber nie tatsächlich implementiert – der Footer zeigt
   weiterhin reinen Text ("Rhesi Café & Restaurant"), kein Logo. Falls
   Prompt 2f als erledigt gilt, ist das ein Rückschritt gegenüber der
   Erwartung; falls es bewusst zurückgestellt wurde, ist das in Ordnung,
   sollte aber nicht als "fertig" geführt werden.
3. **"Du"-Anrede erzeugt einen spürbaren Stilbruch.** Wie angefordert:
   ausschließlich `ueber-uns.astro` spricht die Besucher:in direkt mit "Du"
   an ("dich", "dir", "Komm vorbei..."). Alle anderen Seiten (Startseite,
   Speisekarte, Mittagsmenüs, Kontakt, Footer/Header) bleiben durchgängig
   in der distanzierteren "Sie"-Form bzw. neutralen Formulierungen ("Wir
   freuen uns über Ihre Nachricht..."). Das ist im direkten Seitenwechsel
   spürbar – eine Besucher:in, die von der Startseite ("Sie") zu Über uns
   ("Du") und dann zu Kontakt ("Ihre Nachricht") klickt, erlebt einen
   Tonalitätswechsel hin und zurück. Das wirkt uneinheitlich, wenn es nicht
   explizit als Zwischenschritt zu einer künftigen Website-weiten
   Du-Umstellung kommuniziert ist. _Das ist kein Bug, sondern eine
   Design-Entscheidung, die ich hiermit ausdrücklich zur Bestätigung
   vorlege, statt sie stillschweigend durchzuwinken._
4. **Card-Grid mit 5 statt 4 Cards, Layout nicht immer ausgeglichen.** Die
   "Gastgarten"-Card wurde in einer früheren Runde nicht als 4. sondern
   6.-Card-Kandidat *in eine bestehende Card* ("Terrasse") integriert –
   macht inhaltlich Sinn (keine Redundanz), führt aber dazu, dass das Grid
   weiterhin 5 Cards zeigt (`sm:grid-cols-2 lg:grid-cols-3`), nicht 4. Bei
   3 Spalten (Desktop) ergibt das eine unausgeglichene letzte Zeile mit nur
   2 von 3 Plätzen belegt (rechts leer); bei 2 Spalten (Tablet) eine letzte
   Zeile mit nur 1 von 2 Plätzen. Visuell nicht kaputt, aber sichtbar
   asymmetrisch – per Screenshot verifiziert auf 1280px und 820px Breite.
   _Empfehlung: sechste Card ergänzen (z. B. "Über uns" wieder aufnehmen)
   oder Grid für 5 Elemente gestalten (z. B. 5 Spalten auf sehr breiten
   Screens, oder bewusst asymmetrisches Layout mit größerer erster Card)._
5. **Farbkontrast: mehrere Terracotta-Kombinationen unter WCAG-AA-Minimum
   für Fließtext.** Rechnerisch geprüft (WCAG-Kontrastformel):
   - `text-terracotta` (#C87B4A) auf Weiß/Creme: **3.24:1** – fällt durch
     AA-Normaltext (braucht 4.5:1), besteht nur AA-Large. Betrifft alle 27
     verbleibenden Stellen, die noch die helle Terracotta-Textfarbe nutzen
     (u. a. Card-Links wie "Zur Speisekarte →").
   - `bg-terracotta` + weißer Text (primäre CTA-Buttons, 5 Stellen):
     ebenfalls **3.24:1** – fällt bei 14px/semibold-Text durch AA-Normaltext,
     die Buttons sind knapp unter der "Large Text"-Schwelle (18.66px bold).
   - `text-espresso/50` (dezente Fußnoten wie der Maps-Datenschutzhinweis,
     Footer-Kleingedrucktes): **3.24:1** – fällt für die üblicherweise
     kleine Schriftgröße, in der diese Klasse eingesetzt wird.
   - Es existiert bereits eine dunklere Variante `--color-terracotta-dark`
     (#A35F37), die auf Weiß mit 4.87:1 besteht, auf Creme mit 4.26:1 aber
     **knapp** durchfällt. Sie wird bereits an 14 Stellen verwendet, aber
     eben nicht überall – die Migration ist unvollständig.
   _Empfehlung: `text-terracotta` durchgängig durch `text-terracotta-dark`
   ersetzen (Card-Links, MenuCategory-Preise etc.), für Creme-Hintergründe
   ggf. eine noch dunklere Variante definieren, und die Button-Textfarbe
   auf CTA-Buttons separat prüfen (evtl. Terracotta für Buttons dunkler
   ziehen oder Schriftgröße/-gewicht erhöhen)._
6. **Philosophie-Highlights auf Über-uns sind keine echten Überschriften.**
   "Frühstück"/"Mittagsmenü"/"Konditorei" sind als `<p class="font-heading
   ...">` ausgezeichnet, nicht als `<h3>` – anders als z. B. `Card.astro`,
   das für vergleichbare Karten-Titel konsequent `<h3>` nutzt. Für
   Screenreader-Nutzer:innen, die per Überschriften-Navigation browsen,
   sind diese drei Themenblöcke dadurch unsichtbar. Kleines, aber leicht
   behebbares Detail.
7. **Zwei unbenutzte Dateien im Arbeitsverzeichnis** (nicht committet):
   `src/assets/images/gastgarten-eingang.webp` (im Code nirgends
   referenziert) und `public/images/betriebe/rhesi-logo.svg` (Duplikat,
   ebenfalls nirgends referenziert; das eigentlich genutzte Logo liegt
   unter `src/assets/logo/rhesi-logo.svg`). Harmlos, aber verwaist –
   entweder verwenden oder aufräumen.
8. **Speisekarte-Beispieldaten**: Wie erwartet stehen in `menu.json`
   weiterhin keine 100 % finalen Daten für alle Bereiche – s. Punkt 1
   oben, der über das reine "isPlaceholder"-Flag hinausgeht (die
   Getränke-Sektion fehlt komplett statt nur als Platzhalter markiert zu
   sein).

---

## Kritisch vor Launch

1. **Favicon fehlt komplett.** `BaseLayout.astro` referenziert
   `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`, aber
   **es existiert keine `favicon.svg`-Datei irgendwo im Projekt** (weder in
   `public/` noch sonstwo) – per Playwright-Request bestätigt: `GET
   /favicon.svg` liefert **404**. Es gibt auch keinen PNG-Fallback für
   Browser/Kontexte ohne SVG-Favicon-Support (z. B. manche
   Bookmark-/Share-Vorschauen, ältere Safari-Versionen). Die Frage "ist das
   Logo bei 16×16/32×32 noch erkennbar" lässt sich dadurch **nicht einmal
   beurteilen** – es gibt schlicht nichts zu beurteilen. Das ist der einzige
   Punkt in diesem Audit, der über "unschön" hinausgeht: ein Browser-Tab
   ohne jedes Icon (Standard-Weltkugel/leeres Icon) wirkt bei einer sonst
   fertigen Seite unfertig und unprofessionell.
   _Empfehlung: Aus dem vorhandenen `rhesi-logo.svg` ein quadratisches
   Favicon ableiten (ggf. nur das Icon-/Signet-Element, falls das Logo eine
   Wort-Bild-Marke ist – volle Wortmarken wirken bei 16px meist nicht
   mehr), als `public/favicon.svg` UND `public/favicon-32x32.png` /
   `favicon-16x16.png` (PNG-Fallback per `<link rel="icon"
   type="image/png" sizes="32x32">`) ablegen, dann bei 16px/32px visuell
   gegenchecken._
2. **Speisekarte ohne Getränke-Sektion** (Details siehe "Offen/fehlt" #1) –
   ich stufe das hier zusätzlich als kritisch ein, weil es kein reines
   Content-Detail ist, sondern eine für ein Café zentrale Information
   (Kaffeepreise!) komplett fehlt, nicht nur unvollständig ist.
3. **Rechtliche Daten (Impressum) weiterhin unverifiziert.** Wie bereits in
   Prompt 10 dokumentiert: Firmenbuchnummer, UID, Geschäftsführung etc.
   stammen aus Drittquellen-Recherche und tragen einen Verifizierungs-Hinweis
   im Code – dieser Punkt bleibt bis zur Bestätigung durch
   Steuerberater/Firmenbuchauszug offen. Kein neuer Fund, aber weiterhin
   nicht erledigt und daher hier erneut aufgeführt, damit er vor Launch
   nicht untergeht.

---

## Gesamteinschätzung

Die Seite ist inhaltlich und technisch spürbar weiter als beim letzten
Audit – Logo, Partner-Logos, Rechtstexte und die Über-uns-Seite wirken
jetzt wie eine echte Website und nicht mehr wie ein Gerüst. Der Datenschutz-
und Maps-Teil ist sauber und ehrlich umgesetzt, keine versteckten
Tracking-Widersprüche gefunden. Trotzdem ist sie **nicht launch-bereit**:
das fehlende Favicon ist ein müheloser, aber peinlicher Fix, die fehlende
Getränkekarte ist für ein Café ein echtes Content-Loch, und die
Kontrast-/Grid-/Stilbruch-Punkte sollten vor einem öffentlichen Launch
bewusst entschieden statt übersehen werden. Realistisch: ein bis zwei
fokussierte Sessions trennen den aktuellen Stand von "bereit für echte
Besucher:innen".
