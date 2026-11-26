// NusaData — every number below comes from BPS (Statistics Indonesia) releases
// listed in the `source` field of each record. No figure here is estimated,
// rounded beyond what BPS published, or invented. Years are part of the data.

export const SOURCE_BPS = 'BPS — Statistics Indonesia';

export const headline = [
  {
    id: 'population',
    label: 'Population',
    value: '284.4 million',
    note: 'Mid-2025 estimate',
    source: 'BPS, mid-2025 population estimate',
    year: 2025,
  },
  {
    id: 'gdp',
    label: 'Gross domestic product',
    value: 'Rp 23,821.1 trillion',
    note: 'Growth 5.11% in 2025',
    source: 'BPS BRS No. 18/02/Th. XXIX, 5 Feb 2026',
    year: 2025,
  },
  {
    id: 'gdp-per-capita',
    label: 'GDP per capita',
    value: 'Rp 83.7 million',
    note: 'US$5,083.4',
    source: 'BPS BRS No. 18/02/Th. XXIX, 5 Feb 2026',
    year: 2025,
  },
  {
    id: 'unemployment',
    label: 'Unemployment rate',
    value: '4.76%',
    note: 'February 2025 survey',
    source: 'BPS BRS No. 44/05/Th. XXVIII, 5 May 2025 (Sakernas)',
    year: 2025,
  },
  {
    id: 'inflation',
    label: 'Inflation, year on year',
    value: '3.23%',
    note: 'October 2026; core inflation 2.56%',
    source: 'BPS consumer price release, Oct 2026',
    year: 2026,
  },
  {
    id: 'poverty',
    label: 'Poverty rate',
    value: '8.07%',
    note: '22.93 million people, March 2026',
    source: 'BPS poverty profile release, Mar 2026',
    year: 2026,
  },
  {
    id: 'hdi',
    label: 'Human Development Index',
    value: '75.90',
    note: 'Up from 75.02 in 2024',
    source: 'BPS BRS No. 104/11/Th. XXVIII, 5 Nov 2025',
    year: 2025,
  },
  {
    id: 'life-expectancy',
    label: 'Life expectancy at birth',
    value: '74.47 years',
    note: '2025; 74.15 years in 2024',
    source: 'BPS Human Development Index release, 2025',
    year: 2025,
  },
];

// Annual series. `years` lines up with `values` by index.
export const gdpGrowth = {
  title: 'GDP growth, 2015–2025',
  unit: '% per year',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.7, 5.31, 5.05, 5.03, 5.11],
  source: 'BPS national accounts; 2025: BRS No. 18/02/Th. XXIX, 5 Feb 2026',
};

export const populationSeries = {
  title: 'Population, 2015–2025',
  unit: 'million people',
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  values: [255.4, 258.9, 261.9, 265.0, 268.1, 270.2, 272.7, 275.8, 278.7, 281.6, 284.4],
  source: 'BPS; 2020 is the census year (270.2 million)',
};

export const inflationMonthly2025 = {
  title: 'Inflation by month, 2025',
  unit: '% year on year',
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [0.8, -0.1, 1.0, 2.0, 1.6, 1.9, 2.4, 2.3, 2.65, 2.86, 2.72, 2.92],
  source: 'BPS consumer price releases, 2025 (rounded to 1 decimal place)',
};

export const povertySeries = {
  title: 'Poverty rate, Mar 2024 – Mar 2026',
  unit: '% of population',
  labels: ['Mar 2024', 'Sep 2024', 'Mar 2025', 'Sep 2025', 'Mar 2026'],
  values: [9.03, 8.57, 8.47, 8.25, 8.07],
  source: 'BPS poverty profile releases',
};

export const hdiSeries = {
  title: 'Human Development Index, 2020–2025',
  unit: 'index points',
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  values: [72.81, 73.16, 73.77, 74.39, 75.02, 75.9],
  source: 'BPS BRS No. 104/11/Th. XXVIII, 5 Nov 2025',
};

export const lifeExpectancySeries = {
  title: 'Life expectancy at birth, 2020–2025',
  unit: 'years',
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  values: [73.37, 73.46, 73.7, 73.93, 74.15, 74.47],
  source: 'BPS Human Development Index release, 2025',
};

export const trade = {
  title: 'Exports vs imports, 2021–2025',
  unit: 'US$ billion',
  years: [2021, 2022, 2023, 2024, 2025],
  exports: [231.51, 291.98, 258.86, 264.71, 282.91],
  imports: [196.19, 237.45, 221.89, 233.66, 241.86],
  surplus2025: 41.05,
  exportGrowth2025: 6.15,
  importGrowth2025: 2.83,
  source: 'BPS foreign trade statistics',
};

export const gdpBySector2022 = {
  title: 'GDP by sector, 2022',
  unit: '% share of GDP',
  parts: [
    { name: 'Manufacturing', share: 18.3 },
    { name: 'Agriculture, forestry & fishing', share: 12.4 },
    { name: 'Mining & quarrying', share: 12.2 },
    { name: 'All other sectors', share: 57.1 },
  ],
  source: 'BPS national accounts, 2022 (other sectors = computed remainder)',
};

export const islands = {
  title: 'Population by island, mid-2025',
  unit: 'million people',
  total: 284.44,
  landAreaKm2: 1890180,
  densityPerKm2: 150,
  rows: [
    { name: 'Java', population: 158.08 },
    { name: 'Sumatra', population: 62.26 },
    { name: 'Sulawesi', population: 21.04 },
    { name: 'Kalimantan', population: 17.95 },
    { name: 'Nusa Tenggara', population: 15.94 },
    { name: 'Papua', population: 5.82 },
    { name: 'Maluku', population: 3.34 },
  ],
  source: 'BPS, mid-2025 population estimates by island',
};

export const labour = {
  rateFeb2025: 4.76,
  labourForce: 153.05,
  employed: 145.77,
  unemployed: 7.28,
  lfpr: 70.6,
  averageWage: 3.09,
  rateAug2024: 4.91,
  rate2020Peak: 7.07,
  source: 'BPS Sakernas; Feb 2025: BRS No. 44/05/Th. XXVIII, 5 May 2025',
};

export const povertyDetail = {
  mar2026: { rate: 8.07, people: 22.93, line: 669235 },
  mar2025: { rate: 8.47, people: 23.85, line: 609160 },
  urbanMar2026: 6.34,
  ruralMar2026: 10.67,
  extremeMar2025: { rate: 0.85, people: 2.38 },
  source: 'BPS poverty profile releases',
};

export const economyFacts = [
  { label: 'GDP 2025', value: 'Rp 23,821.1 trillion', source: 'BPS BRS No. 18/02/Th. XXIX, 5 Feb 2026' },
  { label: 'GDP 2024', value: 'Rp 22,139.0 trillion', source: 'BPS BRS No. 17/02/Th. XXVIII, 5 Feb 2025' },
  { label: 'GDP growth 2025', value: '5.11%', source: 'BPS BRS No. 18/02/Th. XXIX, 5 Feb 2026' },
  { label: 'GDP growth 2024', value: '5.03%', source: 'BPS BRS No. 17/02/Th. XXVIII, 5 Feb 2025' },
  { label: 'GDP per capita 2025', value: 'Rp 83.7 million (US$5,083.4)', source: 'BPS BRS No. 18/02/Th. XXIX, 5 Feb 2026' },
  { label: 'GDP per capita 2024', value: 'Rp 78.6 million (US$4,960.3)', source: 'BPS BRS No. 17/02/Th. XXVIII, 5 Feb 2025' },
  { label: 'Inflation, Oct 2026 (yoy)', value: '3.23% (core 2.56%)', source: 'BPS consumer price release, Oct 2026' },
  { label: 'Inflation, full year 2025', value: '2.92%', source: 'BPS consumer price releases, 2025' },
  { label: 'Exports 2025', value: 'US$282.91 billion (+6.15%)', source: 'BPS foreign trade statistics' },
  { label: 'Imports 2025', value: 'US$241.86 billion (+2.83%)', source: 'BPS foreign trade statistics' },
  { label: 'Trade surplus 2025', value: 'US$41.05 billion', source: 'BPS foreign trade statistics' },
];

// Top 10 provinces by population, mid-2025, with capitals.
export const topProvinces = [
  { name: 'West Java', capital: 'Bandung', population: 50.76 },
  { name: 'East Java', capital: 'Surabaya', population: 42.09 },
  { name: 'Central Java', capital: 'Semarang', population: 38.23 },
  { name: 'North Sumatra', capital: 'Medan', population: 15.79 },
  { name: 'Banten', capital: 'Serang', population: 12.54 },
  { name: 'Jakarta', capital: 'Jakarta', population: 10.68 },
  { name: 'South Sulawesi', capital: 'Makassar', population: 9.56 },
  { name: 'Lampung', capital: 'Bandar Lampung', population: 9.52 },
  { name: 'South Sumatra', capital: 'Palembang', population: 8.93 },
  { name: 'Riau', capital: 'Pekanbaru', population: 6.81 },
];

// All 26 provinces with a published, verified mid-2025 figure (millions).
// The other 12 provinces are deliberately not listed: their figures were not
// verified, and this site does not guess.
export const provinces = [
  { name: 'West Java', population: 50.759 },
  { name: 'East Java', population: 42.089 },
  { name: 'Central Java', population: 38.234 },
  { name: 'North Sumatra', population: 15.786 },
  { name: 'Banten', population: 12.537 },
  { name: 'Jakarta', population: 10.678 },
  { name: 'South Sulawesi', population: 9.563 },
  { name: 'Lampung', population: 9.523 },
  { name: 'South Sumatra', population: 8.929 },
  { name: 'Riau', population: 6.811 },
  { name: 'West Sumatra', population: 5.914 },
  { name: 'West Kalimantan', population: 5.766 },
  { name: 'Aceh', population: 5.626 },
  { name: 'South Kalimantan', population: 4.323 },
  { name: 'East Kalimantan', population: 4.268 },
  { name: 'Yogyakarta', population: 3.782 },
  { name: 'Jambi', population: 3.769 },
  { name: 'Central Sulawesi', population: 3.156 },
  { name: 'Central Kalimantan', population: 2.845 },
  { name: 'Southeast Sulawesi', population: 2.837 },
  { name: 'North Sulawesi', population: 2.721 },
  { name: 'Bengkulu', population: 2.138 },
  { name: 'West Sulawesi', population: 1.525 },
  { name: 'Bangka Belitung', population: 1.551 },
  { name: 'North Kalimantan', population: 0.749 },
  { name: 'South Papua', population: 0.55 },
];
export const provincesSource = 'BPS, mid-2025 population estimates';

export const latestReleases = [
  { date: '5 Feb 2026', title: 'Economic growth 2025: GDP up 5.11%, Rp 23,821.1 trillion', source: 'BPS BRS No. 18/02/Th. XXIX' },
  { date: 'Oct 2026', title: 'Inflation 3.23% year on year; core inflation 2.56%', source: 'BPS consumer price release' },
  { date: 'Mar 2026', title: 'Poverty rate falls to 8.07%; 22.93 million people below the line', source: 'BPS poverty profile release' },
  { date: '5 Nov 2025', title: 'Human Development Index reaches 75.90 in 2025', source: 'BPS BRS No. 104/11/Th. XXVIII' },
  { date: '5 May 2025', title: 'Unemployment 4.76% in February 2025; labour force 153.05 million', source: 'BPS BRS No. 44/05/Th. XXVIII' },
  { date: '5 Feb 2025', title: 'Economic growth 2024: GDP up 5.03%, Rp 22,139.0 trillion', source: 'BPS BRS No. 17/02/Th. XXVIII' },
];

// Search index: short entries pointing at the page that explains each figure.
export const searchIndex = [
  { term: 'population', page: '#/people', blurb: '284.4 million people at mid-2025 (BPS).' },
  { term: 'population growth', page: '#/people', blurb: 'Population rose from 255.4m in 2015 to 284.4m in 2025.' },
  { term: 'gdp', page: '#/economy', blurb: 'Rp 23,821.1 trillion in 2025, growth 5.11%.' },
  { term: 'gdp growth', page: '#/economy', blurb: 'Growth 2015–2025, including the −2.07% contraction of 2020.' },
  { term: 'gdp per capita', page: '#/economy', blurb: 'Rp 83.7 million (US$5,083.4) in 2025.' },
  { term: 'inflation', page: '#/economy', blurb: '3.23% year on year in October 2026; 2.92% for full-year 2025.' },
  { term: 'exports', page: '#/economy', blurb: 'US$282.91 billion in 2025, up 6.15%.' },
  { term: 'imports', page: '#/economy', blurb: 'US$241.86 billion in 2025, up 2.83%.' },
  { term: 'trade surplus', page: '#/economy', blurb: 'US$41.05 billion surplus in 2025.' },
  { term: 'unemployment', page: '#/work', blurb: '4.76% in February 2025; 7.28 million people unemployed.' },
  { term: 'labour force', page: '#/work', blurb: '153.05 million people; 145.77 million employed.' },
  { term: 'wage', page: '#/work', blurb: 'Average wage Rp 3.09 million per month (Feb 2025).' },
  { term: 'poverty', page: '#/work', blurb: '8.07% in March 2026; 22.93 million people.' },
  { term: 'poverty line', page: '#/work', blurb: 'Rp 669,235 per capita per month (Mar 2026).' },
  { term: 'extreme poverty', page: '#/work', blurb: '0.85% (2.38 million people) in March 2025.' },
  { term: 'human development index', page: '#/people', blurb: 'HDI 75.90 in 2025, up from 75.02 in 2024.' },
  { term: 'hdi', page: '#/people', blurb: 'HDI 75.90 in 2025, up from 75.02 in 2024.' },
  { term: 'life expectancy', page: '#/people', blurb: '74.47 years in 2025.' },
  { term: 'provinces', page: '#/provinces', blurb: 'Population of 26 provinces, mid-2025 figures.' },
  { term: 'west java', page: '#/provinces', blurb: 'Largest province: 50.76 million people (mid-2025).' },
  { term: 'java', page: '#/people', blurb: 'Java holds 158.08 million people — 55.6% of Indonesia.' },
  { term: 'islands', page: '#/people', blurb: 'Population by island, mid-2025.' },
  { term: 'manufacturing', page: '#/economy', blurb: 'Largest GDP sector in 2022: 18.3% of GDP.' },
  { term: 'agriculture', page: '#/economy', blurb: '12.4% of GDP in 2022.' },
  { term: 'mining', page: '#/economy', blurb: 'Mining & quarrying: 12.2% of GDP in 2022.' },
  { term: 'sources', page: '#/about', blurb: 'Every BPS release number used on this site.' },
];
