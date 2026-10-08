# Valmex.md v3 — Ghid de implementare

## Ce e nou
- Toate imaginile sunt LOCALE in assets/img/ (zero linkuri externe de imagini)
- Design system nou: animatii (hero ken-burns, reveal on scroll, text rotativ), carduri profesionale
- Texte rotative: H1 din hero + oferte in banner (app.js)
- SEO: meta-uri rescrise, JSON-LD, sitemap.xml cu lastmod, og:image local
- Conversie: exit-intent -5%, bara mobila fixa, butoane openLeadModal peste tot

## Inlocuieste pozele stand-in cu originalele tale
assets/img/ contine imagini profesionale tematice (stand-in). Pentru pozele reale de proiect,
descarca-le din i.ibb.co si salveaza-le cu ACELEASI nume:
- acoperis-la-cheie.jpg         -> Acoperis-finisat2
- proiect-acoperis-negureni.jpg -> Acoperis-Negureni-dupa-editat
- proiect-acoperis-inainte.jpg  -> Acoperis-negureni-pina-la
- proiect-amk-fatada.jpg        -> Fatade-AMK-proiect-finisat-5
- amk-01.jpg ... amk-15.jpg     -> cele 15 poze AMK de pe i.ibb.co
- proiect-gard-telenesti.jpg, porti-metalice.jpg, echipa-valmex.jpg, banner-renovari.jpg

## Deploy pe GitHub
1. Inlocuieste continutul repo-ului cu fisierele din acest folder (fara README-IMPLEMENTARE.md)
2. Push -> GitHub Pages publica automat (CNAME pastrat)
3. Search Console: Sitemapuri -> adauga sitemap.xml
4. Indexeaza manual paginile din url-list-search-console.txt

## Verificare
DevTools > Network > filtreaza "http": trebuie sa ramana doar jivosite, onesignal,
google maps, three.js (calculator 3D). ZERO imagini externe.
