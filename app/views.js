// One render function per route. Each view is plain HTML strings built from
// data.js and charts.js; main.js drops the result into <main id="app">.

import {
  headline, gdpGrowth, populationSeries, inflationMonthly2025, povertySeries,
  hdiSeries, lifeExpectancySeries, trade, gdpBySector2022, islands, labour,
  povertyDetail, economyFacts, topProvinces, provinces, provincesSource,
  latestReleases, searchIndex,
} from './data.js';
import { lineChart, barChart, hbarChart, donutChart, groupedBarChart } from './charts.js';

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">` + headline.map((k) => `
    <article class="kpi">
      <p class="kpi-label">${k.label}</p>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-note">${k.note}</p>
      <p class="kpi-source">${k.source} · ${k.year}</p>
    </article>`).join('') + `</div>`;
}

function tabsBlock() {
  return `
  <section class="card">
    <div class="tab-row" role="tablist" aria-label="Choose a chart">
      <button class="tab active" data-tab="gdp" role="tab" aria-selected="true">GDP growth</button>
      <button class="tab" data-tab="population" role="tab" aria-selected="false">Population</button>
      <button class="tab" data-tab="inflation" role="tab" aria-selected="false">Inflation 2025</button>
    </div>
    <div id="tab-panel">
      <h3>${gdpGrowth.title}</h3>
      ${lineChart({ labels: gdpGrowth.years, values: gdpGrowth.values, yLabel: gdpGrowth.title })}
      ${sourceLine(gdpGrowth.source)}
    </div>
  </section>`;
}

export function home() {
  return `
  <section class="hero">
    <p class="eyebrow">Indonesia · Official statistics, plainly explained</p>
    <h1>Indonesia in numbers.</h1>
    <p class="lede">NusaData gathers the headline figures of the world's fourth most
    populous country — population, economy, work and welfare — from BPS
    (Statistics Indonesia), with the source and year printed next to every number.</p>
    <p class="hero-links"><a class="btn" href="#/economy">Explore the economy →</a>
    <a class="btn ghost" href="#/provinces">Browse provinces →</a></p>
  </section>
  ${kpiCards()}
  ${tabsBlock()}
  <div class="two-col">
    <section class="card">
      <h2>Where Indonesians live</h2>
      <p class="card-sub">Java holds more than half the country.</p>
      ${donutChart({
        parts: islands.rows.map((r) => ({ name: r.name, value: r.population })),
        valueFmt: (v) => `${((v / islands.total) * 100).toFixed(1)}% · ${v.toFixed(2)}m`,
      })}
      ${sourceLine(`${islands.source}. Total ${islands.total.toFixed(2)} million; land area ${islands.landAreaKm2.toLocaleString('en-US')} km², about ${islands.densityPerKm2} people per km².`)}
    </section>
    <section class="card">
      <h2>Latest releases</h2>
      <ul class="releases">
        ${latestReleases.map((r) => `<li><span class="rel-date">${r.date}</span><span class="rel-title">${r.title}</span><span class="rel-source">${r.source}</span></li>`).join('')}
      </ul>
    </section>
  </div>
  <section class="card">
    <h2>Indonesia at a glance</h2>
    <table class="facts">
      <tbody>
        <tr><th>Population (mid-2025)</th><td>284.4 million</td><td>BPS</td></tr>
        <tr><th>GDP 2025</th><td>Rp 23,821.1 trillion · growth 5.11%</td><td>BPS BRS No. 18/02/Th. XXIX</td></tr>
        <tr><th>GDP per capita 2025</th><td>Rp 83.7 million (US$5,083.4)</td><td>BPS BRS No. 18/02/Th. XXIX</td></tr>
        <tr><th>Unemployment (Feb 2025)</th><td>4.76%</td><td>BPS BRS No. 44/05/Th. XXVIII</td></tr>
        <tr><th>Inflation (Oct 2026, yoy)</th><td>3.23%</td><td>BPS consumer price release</td></tr>
        <tr><th>Poverty (Mar 2026)</th><td>8.07% · 22.93 million people</td><td>BPS poverty profile release</td></tr>
        <tr><th>Human Development Index 2025</th><td>75.90</td><td>BPS BRS No. 104/11/Th. XXVIII</td></tr>
        <tr><th>Life expectancy 2025</th><td>74.47 years</td><td>BPS HDI release</td></tr>
      </tbody>
    </table>
  </section>`;
}

export function economy() {
  return `
  <section class="page-head">
    <h1>The economy</h1>
    <p class="lede">Growth, prices, trade and the shape of output — all from BPS national
    accounts and trade statistics.</p>
  </section>
  <section class="card">
    <h2>${gdpGrowth.title}</h2>
    <p class="card-sub">The 2020 contraction (−2.07%) is the only fall in eleven years; growth
    has run above 5% every year since 2022.</p>
    ${lineChart({ labels: gdpGrowth.years, values: gdpGrowth.values, yLabel: gdpGrowth.title })}
    ${sourceLine(gdpGrowth.source)}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>${gdpBySector2022.title}</h2>
      ${donutChart({
        parts: gdpBySector2022.parts.map((p) => ({ name: p.name, value: p.share })),
        valueFmt: (v) => `${v.toFixed(1)}%`,
      })}
      ${sourceLine(gdpBySector2022.source)}
    </section>
    <section class="card">
      <h2>${trade.title}</h2>
      ${groupedBarChart({
        labels: trade.years, seriesA: trade.exports, seriesB: trade.imports,
        labelA: 'Exports', labelB: 'Imports',
      })}
      <p class="card-sub">Trade surplus 2025: <strong>US$${trade.surplus2025} billion</strong>.
      Exports grew ${trade.exportGrowth2025}% in 2025; imports ${trade.importGrowth2025}%.</p>
      ${sourceLine(trade.source)}
    </section>
  </div>
  <section class="card">
    <h2>${inflationMonthly2025.title}</h2>
    <p class="card-sub">Monthly inflation dipped below zero in February 2025 (−0.1%) before
    climbing to 2.92% by December. Full-year 2025 inflation: 2.92%. October 2026:
    3.23% year on year (core 2.56%).</p>
    ${lineChart({ labels: inflationMonthly2025.months, values: inflationMonthly2025.values, color: '#c65b39', yLabel: inflationMonthly2025.title })}
    ${sourceLine(inflationMonthly2025.source)}
  </section>
  <section class="card">
    <h2>Key figures</h2>
    <table class="facts">
      <tbody>
        ${economyFacts.map((f) => `<tr><th>${f.label}</th><td>${f.value}</td><td>${f.source}</td></tr>`).join('')}
      </tbody>
    </table>
  </section>`;
}

export function people() {
  return `
  <section class="page-head">
    <h1>People</h1>
    <p class="lede">284.4 million people across more than 17,000 islands — where they live,
    how long they live, and how developed their lives are.</p>
  </section>
  <section class="card">
    <h2>${populationSeries.title}</h2>
    <p class="card-sub">The population grew by 29 million between 2015 and 2025. The 2020 census
    counted 270.2 million people.</p>
    ${lineChart({ labels: populationSeries.years, values: populationSeries.values, yLabel: populationSeries.title })}
    ${sourceLine(populationSeries.source)}
  </section>
  <div class="two-col">
    <section class="card">
      <h2>Top 10 provinces by population</h2>
      ${hbarChart({
        rows: topProvinces.map((p) => ({ label: p.name, value: p.population })),
        valueFmt: (v) => `${v.toFixed(2)}m`,
      })}
      ${sourceLine('BPS, mid-2025 population estimates')}
    </section>
    <section class="card">
      <h2>${islands.title}</h2>
      ${donutChart({
        parts: islands.rows.map((r) => ({ name: r.name, value: r.population })),
        valueFmt: (v) => `${((v / islands.total) * 100).toFixed(1)}% · ${v.toFixed(2)}m`,
      })}
      <p class="card-sub">Java's share: <strong>55.6%</strong> of the population on about 7% of
      the land. Density nationwide: about ${islands.densityPerKm2} people per km².</p>
      ${sourceLine(islands.source)}
    </section>
  </div>
  <div class="two-col">
    <section class="card">
      <h2>${hdiSeries.title}</h2>
      ${barChart({ labels: hdiSeries.years, values: hdiSeries.values, color: '#5d8a7a', yLabel: hdiSeries.title })}
      ${sourceLine(hdiSeries.source)}
    </section>
    <section class="card">
      <h2>${lifeExpectancySeries.title}</h2>
      ${lineChart({ labels: lifeExpectancySeries.years, values: lifeExpectancySeries.values, color: '#4a7fa5', yLabel: lifeExpectancySeries.title })}
      <p class="card-sub">Expected years of schooling (2024): <strong>13.21</strong>.</p>
      ${sourceLine(lifeExpectancySeries.source)}
    </section>
  </div>`;
}

export function work() {
  return `
  <section class="page-head">
    <h1>Work &amp; welfare</h1>
    <p class="lede">Jobs, pay and poverty — the numbers that describe everyday life.</p>
  </section>
  <div class="kpi-grid">
    <article class="kpi"><p class="kpi-label">Unemployment rate (Feb 2025)</p><p class="kpi-value">${labour.rateFeb2025}%</p><p class="kpi-note">Aug 2024: ${labour.rateAug2024}% · 2020 peak: ${labour.rate2020Peak}%</p><p class="kpi-source">${labour.source}</p></article>
    <article class="kpi"><p class="kpi-label">Labour force</p><p class="kpi-value">${labour.labourForce} million</p><p class="kpi-note">Labour-force participation rate ${labour.lfpr}%</p><p class="kpi-source">${labour.source}</p></article>
    <article class="kpi"><p class="kpi-label">Employed</p><p class="kpi-value">${labour.employed} million</p><p class="kpi-note">${labour.unemployed} million unemployed</p><p class="kpi-source">${labour.source}</p></article>
    <article class="kpi"><p class="kpi-label">Average wage</p><p class="kpi-value">Rp ${labour.averageWage} million / month</p><p class="kpi-note">February 2025</p><p class="kpi-source">${labour.source}</p></article>
  </div>
  <section class="card">
    <h2>${povertySeries.title}</h2>
    <p class="card-sub">The poverty rate has fallen at every release since March 2024.</p>
    ${lineChart({ labels: povertySeries.labels, values: povertySeries.values, color: '#c65b39', yLabel: povertySeries.title })}
    ${sourceLine(povertySeries.source)}
  </section>
  <section class="card">
    <h2>Poverty in detail</h2>
    <table class="facts">
      <tbody>
        <tr><th>Poverty rate, Mar 2026</th><td>${povertyDetail.mar2026.rate}%</td><td>${povertyDetail.mar2026.people} million people</td></tr>
        <tr><th>Poverty line, Mar 2026</th><td>Rp ${povertyDetail.mar2026.line.toLocaleString('en-US')} / capita / month</td><td>BPS poverty profile release</td></tr>
        <tr><th>Poverty rate, Mar 2025</th><td>${povertyDetail.mar2025.rate}%</td><td>${povertyDetail.mar2025.people} million people; line Rp ${povertyDetail.mar2025.line.toLocaleString('en-US')}</td></tr>
        <tr><th>Urban poverty, Mar 2026</th><td>${povertyDetail.urbanMar2026}%</td><td>BPS poverty profile release</td></tr>
        <tr><th>Rural poverty, Mar 2026</th><td>${povertyDetail.ruralMar2026}%</td><td>BPS poverty profile release</td></tr>
        <tr><th>Extreme poverty, Mar 2025</th><td>${povertyDetail.extremeMar2025.rate}%</td><td>${povertyDetail.extremeMar2025.people} million people</td></tr>
        <tr><th>Human Development Index 2025</th><td>75.90</td><td>BPS BRS No. 104/11/Th. XXVIII</td></tr>
      </tbody>
    </table>
    ${sourceLine(povertyDetail.source)}
  </section>`;
}

export function provincesView() {
  return `
  <section class="page-head">
    <h1>Provinces</h1>
    <p class="lede">Population by province, mid-2025. Type to filter, click a column
    heading to sort, or download the table as a CSV file.</p>
  </section>
  <section class="card">
    <h2>Top 10 provinces</h2>
    ${hbarChart({
      rows: topProvinces.map((p) => ({ label: p.name, value: p.population })),
      valueFmt: (v) => `${v.toFixed(2)}m`,
    })}
    ${sourceLine(provincesSource)}
  </section>
  <section class="card">
    <div class="table-tools">
      <label class="filter-label">Filter provinces
        <input id="province-filter" type="search" placeholder="Type a province name…" autocomplete="off">
      </label>
      <button id="csv-download" class="btn" type="button">Download CSV ↓</button>
    </div>
    <p class="table-note" id="province-count"></p>
    <div class="table-wrap">
      <table class="data-table" id="province-table">
        <thead>
          <tr>
            <th><button class="sort-btn" data-sort="rank" type="button"># ↕</button></th>
            <th><button class="sort-btn" data-sort="name" type="button">Province ↕</button></th>
            <th><button class="sort-btn" data-sort="population" type="button">Population (millions) ↕</button></th>
            <th>Share of Indonesia</th>
          </tr>
        </thead>
        <tbody id="province-body"></tbody>
      </table>
    </div>
    <p class="table-note">26 provinces with published mid-2025 figures (${provincesSource});
    the remaining 12 provinces are not shown — their figures were not verified.</p>
  </section>`;
}

export function about() {
  return `
  <section class="page-head">
    <h1>About &amp; sources</h1>
    <p class="lede">How NusaData is built, where every number comes from, and what this
    site deliberately leaves out.</p>
  </section>
  <section class="card">
    <h2>Method</h2>
    <p>Every figure on this site comes from a BPS (Statistics Indonesia) release.
    The release number is printed next to the figure it supports, so any number
    can be checked against the original publication. Figures are shown exactly as
    published; nothing is estimated, modelled or filled in.</p>
    <p>The site is a set of static files. It makes no network requests, stores
    nothing, and runs entirely in your browser — open <code>index.html</code> and
    it works.</p>
  </section>
  <section class="card">
    <h2>Sources</h2>
    <ul class="source-list">
      <li>BPS BRS No. 18/02/Th. XXIX, 5 Feb 2026 — economic growth 2025 (GDP, GDP per capita)</li>
      <li>BPS BRS No. 17/02/Th. XXVIII, 5 Feb 2025 — economic growth 2024</li>
      <li>BPS BRS No. 44/05/Th. XXVIII, 5 May 2025 — labour force situation, Feb 2025 (Sakernas)</li>
      <li>BPS BRS No. 104/11/Th. XXVIII, 5 Nov 2025 — Human Development Index 2025</li>
      <li>BPS consumer price releases — inflation, monthly 2025 and October 2026</li>
      <li>BPS poverty profile releases — poverty, Mar 2024 to Mar 2026</li>
      <li>BPS foreign trade statistics — exports and imports 2021–2025</li>
      <li>BPS national accounts — GDP by sector, 2022</li>
      <li>BPS mid-2025 population estimates — national, island and province figures</li>
      <li>BPS 2020 Population Census — 270.2 million people</li>
    </ul>
  </section>
  <section class="card">
    <h2>What is not here, and why</h2>
    <ul class="source-list">
      <li>Only 26 of 38 provinces appear in the table: the other 12 provinces'
      mid-2025 figures were not verified, so they are left out rather than guessed.</li>
      <li>No forecasts: every number is a published figure, not a projection.</li>
      <li>No district or city data: this site covers the national picture only.</li>
    </ul>
  </section>
  <section class="card">
    <h2>About this site</h2>
    <p><strong>NusaData</strong> — “Indonesia in numbers”. An independent, unofficial
    presentation of public BPS statistics. It is not affiliated with BPS or the
    Government of Indonesia. Figures remain the property of their publisher; the
    site's own text and design are released under the 0BSD licence.</p>
  </section>`;
}

export function searchResults(query) {
  const q = (query || '').trim().toLowerCase();
  const hits = q
    ? searchIndex.filter((e) => e.term.includes(q) || q.split(/\s+/).every((w) => e.term.includes(w)))
    : [];
  const rows = hits.map((h) => `
    <li><a href="${h.page}">${h.term}</a><span>${h.blurb}</span></li>`).join('');
  return `
  <section class="page-head">
    <h1>Search results</h1>
    <p class="lede">${q ? `Matches for “${q}” — ${hits.length} found.` : 'Type a word in the search box above, for example “inflation”, “Java” or “poverty”.'}</p>
  </section>
  <section class="card">
    ${hits.length
      ? `<ul class="search-results">${rows}</ul>`
      : `<p>No matches for “${q}”. Try “inflation”, “GDP”, “poverty”, “provinces” or “Java”.</p>
         <p><a href="#/">← Back to the home page</a></p>`}
  </section>`;
}

export function notFound() {
  return `
  <section class="page-head">
    <h1>Page not found</h1>
    <p class="lede">That address does not exist on NusaData.</p>
    <p><a href="#/">← Back to the home page</a></p>
  </section>`;
}
