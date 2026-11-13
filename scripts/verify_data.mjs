import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const rootDir = path.resolve(import.meta.dirname, "..");

const DATA = require(path.join(rootDir, "docs", "data.js"));
const ENGINE = require(path.join(rootDir, "docs", "engine.js"));

const climRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "data", "power_climatology.json"), "utf8"));
const dailyRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "data", "power_daily_2024.json"), "utf8"));
const soilRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "data", "soilgrid.json"), "utf8"));

// 1. Verify exact NASA POWER climatology & 2024 daily parity
const mNums = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const daysClim = [31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dp = dailyRaw.properties.parameter;
const cp = climRaw.properties.parameter;

let calcAnnual2024 = 0;
let calcWet2024 = 0;
let calcNovFeb2024 = 0;
let calcAbsMax = -Infinity;
let calcAbsMin = Infinity;
let days35 = 0;
let days40 = 0;

for (const d of Object.keys(dp.PRECTOTCORR)) {
  const rain = dp.PRECTOTCORR[d];
  const tmax = dp.T2M_MAX[d];
  const tmin = dp.T2M_MIN[d];
  const m = d.slice(4, 6);
  calcAnnual2024 += rain;
  if (["05", "06", "07", "08", "09", "10"].includes(m)) calcWet2024 += rain;
  if (["11", "12", "01", "02"].includes(m)) calcNovFeb2024 += rain;
  if (tmax > calcAbsMax) calcAbsMax = tmax;
  if (tmin < calcAbsMin) calcAbsMin = tmin;
  if (tmax >= 35) days35++;
  if (tmax >= 40) days40++;
}

assert.equal(DATA.monthly.length, 12, "Must have 12 months");
DATA.monthly.forEach((m, idx) => {
  assert.equal(m.climRainPerDay, cp.PRECTOTCORR[m.key], `Climatology rain/day mismatch ${m.key}`);
  assert.equal(m.climTemp, cp.T2M[m.key], `Climatology temp mismatch ${m.key}`);
  const expectedClimMonth = +(cp.PRECTOTCORR[m.key] * daysClim[idx]).toFixed(1);
  assert.equal(m.climRainMonth, expectedClimMonth, `Climatology monthly mm mismatch ${m.key}`);

  const monthKeys = Object.keys(dp.PRECTOTCORR).filter((k) => k.slice(4, 6) === mNums[idx]);
  const sumRain = +monthKeys.reduce((acc, k) => acc + dp.PRECTOTCORR[k], 0).toFixed(1);
  assert.equal(m.d2024RainMonth, sumRain, `2024 monthly rain mismatch ${m.key}`);
});

assert.equal(DATA.summary.annual2024Mm, +calcAnnual2024.toFixed(1), "Annual 2024 rain mismatch");
assert.equal(DATA.summary.wet2024Mm, +calcWet2024.toFixed(1), "Wet 2024 rain mismatch");
assert.equal(DATA.summary.novFeb2024Mm, +calcNovFeb2024.toFixed(1), "Nov-Feb 2024 rain mismatch");
assert.equal(DATA.summary.maxTemp2024C, calcAbsMax, "Max temp mismatch");
assert.equal(DATA.summary.minTemp2024C, calcAbsMin, "Min temp mismatch");
assert.equal(DATA.summary.daysOver35C2024, days35, "Days >= 35C mismatch");
assert.equal(DATA.summary.daysOver40C2024, days40, "Days >= 40C mismatch");

// 2. Verify SoilGrids parity
const soilMap = Object.fromEntries(soilRaw.properties.layers.map((l) => [l.name, l.depths]));
assert.equal(DATA.soil.surface0to5.siltPct, soilMap.silt[0].values.mean / 10);
assert.equal(DATA.soil.surface0to5.clayPct, soilMap.clay[0].values.mean / 10);
assert.equal(DATA.soil.surface0to5.sandPct, soilMap.sand[0].values.mean / 10);
assert.equal(DATA.soil.surface0to5.ph, soilMap.phh2o[0].values.mean / 10);
assert.equal(DATA.soil.surface0to5.socPct, soilMap.soc[0].values.mean / 100);
assert.equal(DATA.soil.sub5to15.socPct, soilMap.soc[1].values.mean / 100);

// 3. Verify Slice 3 ranking & sensitivity logic
const balanced = ENGINE.rankStrategies({ yield: 3, water: 3, income: 3, soil: 3, risk: 3 }, DATA);
assert.equal(balanced.isTied, true, "Equal weights should show B/C tie");

const cash = ENGINE.rankStrategies(ENGINE.PRESETS.find((p) => p.id === "cash").weights, DATA);
assert.equal(cash.isTied, false);
assert.equal(cash.winnerId, "B", "Cash preset should rank B #1");

const drought = ENGINE.rankStrategies(ENGINE.PRESETS.find((p) => p.id === "drought").weights, DATA);
assert.equal(drought.isTied, false);
assert.equal(drought.winnerId, "A", "Zero-irrigation risk-averse preset should rank A #1");

const soilPrio = ENGINE.rankStrategies(ENGINE.PRESETS.find((p) => p.id === "soil").weights, DATA);
assert.equal(soilPrio.isTied, false);
assert.equal(soilPrio.winnerId, "C", "Soil-priority preset should rank C #1");

const flipsFromCash = ENGINE.findSingleSliderFlips(ENGINE.PRESETS.find((p) => p.id === "cash").weights, DATA);
assert.ok(flipsFromCash.singleSliderFlips.length > 0, "Cash preset should expose sensitivity flip insights");

// 4. Static hygiene & no runtime external fetch / no leaked keys
const webFiles = ["index.html", "app.js", "data.js", "engine.js", "styles.css"];
for (const fname of webFiles) {
  const txt = fs.readFileSync(path.join(rootDir, "docs", fname), "utf8");
  assert.equal(/fetch\s*\(|XMLHttpRequest/i.test(txt), false, `${fname} must not make runtime API calls`);
  assert.equal(/(AIza|ghp_|gho_|sk-[A-Za-z0-9]{20}|ed25519:)/i.test(txt), false, `${fname} must not contain tokens/keys`);
}

console.log("FIELDSHIFT_VERIFY_OK:", {
  months: DATA.monthly.length,
  annual2024Mm: DATA.summary.annual2024Mm,
  wet2024Mm: DATA.summary.wet2024Mm,
  novFeb2024Mm: DATA.summary.novFeb2024Mm,
  balancedTied: balanced.isTied,
  winners: { cash: cash.winnerId, drought: drought.winnerId, soil: soilPrio.winnerId },
  cashFlips: flipsFromCash.singleSliderFlips.length
});
