// NusaData router and interactions (hash routes, no framework, no network).
//
//   #/              home          #/work        work & welfare
//   #/economy       economy       #/provinces   provinces
//   #/people        people        #/about       about & sources
//   #/search?q=…    search results
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  gdpGrowth, populationSeries, inflationMonthly2025, provinces, searchIndex,
} from './data.js';
import { lineChart } from './charts.js';
import {
  home, economy, people, work, provincesView, about, searchResults, notFound,
} from './views.js';

const app = document.getElementById('app');
const searchBox = document.getElementById('site-search');
const searchDrop = document.getElementById('search-drop');
const TOTAL_POP = 284.44;

const PAGES = {
  '/': { title: 'NusaData — Indonesia in numbers', view: home },
  '/economy': { title: 'The economy | NusaData', view: economy },
  '/people': { title: 'People | NusaData', view: people },
  '/work': { title: 'Work & welfare | NusaData', view: work },
  '/provinces': { title: 'Provinces | NusaData', view: provincesView },
  '/about': { title: 'About & sources | NusaData', view: about },
};

function readRoute() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  return { path: pathPart === '' ? '/' : pathPart, query: new URLSearchParams(queryPart || '') };
}

function render() {
  window.__shotReady = false;
  const { path, query } = readRoute();
  if (path === '/search') {
    document.title = 'Search | NusaData';
    app.innerHTML = searchResults(query.get('q') || '');
  } else if (PAGES[path]) {
    document.title = PAGES[path].title;
    app.innerHTML = PAGES[path].view();
  } else {
    document.title = 'Not found | NusaData';
    app.innerHTML = notFound();
  }
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('current', a.getAttribute('href') === `#${path}`);
  });
  if (path === '/') wireHomeTabs();
  if (path === '/provinces') wireProvinceTable();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// --- Home chart tabs -------------------------------------------------------

const TAB_CHARTS = {
  gdp: {
    heading: gdpGrowth.title,
    svg: lineChart({ labels: gdpGrowth.years, values: gdpGrowth.values, yLabel: gdpGrowth.title }),
    source: gdpGrowth.source,
  },
  population: {
    heading: populationSeries.title,
    svg: lineChart({ labels: populationSeries.years, values: populationSeries.values, yLabel: populationSeries.title }),
    source: populationSeries.source,
  },
  inflation: {
    heading: inflationMonthly2025.title,
    svg: lineChart({ labels: inflationMonthly2025.months, values: inflationMonthly2025.values, color: '#c65b39', yLabel: inflationMonthly2025.title }),
    source: inflationMonthly2025.source,
  },
};

function wireHomeTabs() {
  const panel = document.getElementById('tab-panel');
  if (!panel) return;
  app.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      app.querySelectorAll('.tab').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const chart = TAB_CHARTS[btn.dataset.tab];
      panel.innerHTML = `<h3>${chart.heading}</h3>${chart.svg}<p class="source">Source: ${chart.source}</p>`;
    });
  });
}

// --- Provinces table: filter, sort, CSV ------------------------------------

let sortKey = 'rank';
let sortDir = 1;
let filterText = '';

function rankedRows() {
  const rows = provinces
    .map((p, i) => ({ ...p, rank: i + 1 }))
    .filter((p) => p.name.toLowerCase().includes(filterText));
  const key = sortKey === 'rank' ? 'rank' : sortKey;
  rows.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return cmp * sortDir;
  });
  return rows;
}

function paintProvinceRows() {
  const body = document.getElementById('province-body');
  const count = document.getElementById('province-count');
  if (!body) return;
  const rows = rankedRows();
  body.innerHTML = rows.map((p) => `
    <tr>
      <td>${p.rank}</td>
      <td>${p.name}</td>
      <td class="num">${p.population.toFixed(3)}</td>
      <td class="num">${((p.population / TOTAL_POP) * 100).toFixed(2)}%</td>
    </tr>`).join('') || `<tr><td colspan="4">No province matches “${filterText}”.</td></tr>`;
  if (count) count.textContent = `Showing ${rows.length} of ${provinces.length} provinces.`;
}

function downloadCsv() {
  const lines = ['rank,province,population_millions,share_percent'];
  provinces.forEach((p, i) => {
    lines.push(`${i + 1},"${p.name}",${p.population.toFixed(3)},${((p.population / TOTAL_POP) * 100).toFixed(2)}`);
  });
  const blob = new Blob([lines.join('\n') + '\n'], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nusadata-provinces-mid-2025.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function wireProvinceTable() {
  const filter = document.getElementById('province-filter');
  const csvBtn = document.getElementById('csv-download');
  if (filter) {
    filter.addEventListener('input', () => {
      filterText = filter.value.trim().toLowerCase();
      paintProvinceRows();
    });
  }
  if (csvBtn) csvBtn.addEventListener('click', downloadCsv);
  app.querySelectorAll('.sort-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (sortKey === key) sortDir *= -1;
      else { sortKey = key; sortDir = 1; }
      paintProvinceRows();
    });
  });
  paintProvinceRows();
}

// --- Header search: live dropdown + results page ----------------------------

function goSearch(q) {
  const term = (q || '').trim();
  if (term) location.hash = `#/search?q=${encodeURIComponent(term)}`;
}

function paintDropdown(q) {
  const term = (q || '').trim().toLowerCase();
  if (term.length < 2) {
    searchDrop.innerHTML = '';
    searchDrop.hidden = true;
    return;
  }
  const hits = searchIndex
    .filter((e) => e.term.includes(term))
    .slice(0, 6);
  if (!hits.length) {
    searchDrop.innerHTML = `<div class="drop-empty">No matches — press Enter to search anyway.</div>`;
  } else {
    searchDrop.innerHTML = hits.map((h) => `<a href="${h.page}">${h.term}<span>${h.blurb}</span></a>`).join('');
  }
  searchDrop.hidden = false;
}

if (searchBox) {
  searchBox.addEventListener('input', () => paintDropdown(searchBox.value));
  searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchDrop.hidden = true;
      goSearch(searchBox.value);
    }
    if (e.key === 'Escape') {
      searchDrop.hidden = true;
      searchBox.blur();
    }
  });
  searchBox.addEventListener('focus', () => paintDropdown(searchBox.value));
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) searchDrop.hidden = true;
  });
  searchDrop.addEventListener('click', () => { searchDrop.hidden = true; });
}

window.addEventListener('hashchange', render);
render();
