# oracle

Tento projekt je webová aplikace postavená na Vue 3 a Vite, která umožňuje interaktivní práci s kartami (archetypy, minulost, budoucnost). Obsahuje logiku pro tahání, umisťování a nahrazování karet, včetně restartu s možností omezení.

## Doporučené vývojové prostředí

Použijte [VSCode](https://code.visualstudio.com/) s rozšířením [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (nezapomeňte vypnout Vetur).

## Nastavení projektu

1. Naklonujte repozitář a přejděte do složky projektu.
2. Nainstalujte závislosti:

```sh
npm install
```

## Spuštění vývojového serveru

```sh
npm run dev
```

Aplikace poběží na adrese, kterou vypíše terminál (obvykle http://localhost:5173).

## Build pro produkci

```sh
npm run build
```

Výstup najdete ve složce `dist/`.

## Lintování kódu

Pro kontrolu kvality kódu spusťte:

```sh
npm run lint
```

## Struktura projektu

- `src/components/` – Vue komponenty (např. CardSlot, CardPlacementArea, RestartButton)
- `src/lib/` – logika hry a stav (useCardGame.js)
- `src/data/` – data karet (archetypy, minulost, budoucnost)
- `public/` – statické soubory (např. obrázky)

## Další informace

- Konfigurace Vite: [Vite Dokumentace](https://vite.dev/config/)
- Projekt využívá moderní Vue 3 setup (`<script setup>`) a kompozici stavů pomocí vlastních hooků.

---
