[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/akosimamora/makefun-best-stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/akosimamora/makefun-best-stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# NusaData — Indonesia in numbers

A static, offline national statistics site for Indonesia, built for the
[make.fun competition “Make the best national statistics site”](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

Every figure comes from BPS (Statistics Indonesia) and is printed with its
source and year — population, GDP, inflation, trade, jobs, poverty, human
development and the provinces. No figure is estimated or invented, and the
site makes no network requests at all.

## What is inside

- **Home** — 8 headline KPIs, a switchable chart (GDP growth / population /
  inflation), an island population donut, latest BPS releases, an at-a-glance table.
- **Economy** — GDP growth 2015–2025, GDP by sector, exports vs imports,
  monthly inflation 2025, key-figures table.
- **People** — population 2015–2025, top-10 provinces, population by island,
  HDI and life expectancy.
- **Work & welfare** — unemployment, labour force, wages, poverty in detail.
- **Provinces** — searchable, sortable table of 26 provinces with verified
  mid-2025 figures, plus a CSV download.
- **About & sources** — method, every BPS release number used, and what is
  deliberately left out.
- **Search** — live dropdown in the header and a results page.

All charts are hand-written SVG. The layout is phone-friendly, and the first
load is just a few small local files.

## Run it

```sh
node serve.ts        # serves app/ on http://localhost:8080
```

Or open `app/index.html` directly in a browser — no build step, no server
required.

## Build the entry

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies `app/` and `screenshots/` into the output directory and writes
`dossier.json` with the vendored make.fun library.

## Licence

0BSD — see [LICENSE](LICENSE).
