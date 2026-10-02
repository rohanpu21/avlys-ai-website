import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Run with Node 22.18+ (native type stripping). Dataset metadata only; no downloads.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { publicDatasets, filterPublicDatasets, licenceGuides, datasetCategories } = await import(pathToFileURL(path.join(root, "app/data/publicDatasetCatalog.ts")));
assert.equal(publicDatasets.length, 15);
assert.equal(new Set(publicDatasets.map((entry) => entry.id)).size, 15);
for (const entry of publicDatasets) {
  assert(licenceGuides[entry.licence]);
  for (const field of ["description", "coverage", "formats", "annotations", "limitations", "access"]) assert(entry[field]?.length > 15, `${entry.id}: ${field}`);
  for (const url of [entry.sourceUrl, entry.licenceEvidenceUrl, licenceGuides[entry.licence].url]) assert.equal(new URL(url).protocol, "https:");
}
assert.deepEqual(datasetCategories.map((category) => filterPublicDatasets(category.id, "", "all").length), [6, 6, 3]);
assert.deepEqual(datasetCategories.map((category) => filterPublicDatasets(category.id, "", "additional").length), [3, 2, 1]);
assert.equal(filterPublicDatasets("audio", " FLEURS ", "all")[0].id, "fleurs");
assert.equal(filterPublicDatasets("audio", "Hindi", "all").length, 2);
assert.equal(filterPublicDatasets("image", "unlikely-no-match", "all").length, 0);
console.log("PASS: 15 source records, licence/source URLs, modality counts, conditions and search.");

const { toOtsCatalogue, filterOtsDatasets, otsCategories } = await import(pathToFileURL(path.join(root, "app/data/otsCataloguePresentation.ts")));
const otsDatasets = toOtsCatalogue(publicDatasets);
assert.equal(otsDatasets.length, 15);
assert.deepEqual(otsCategories.map((category) => filterOtsDatasets(otsDatasets, category.id, "").length), [6, 6, 3]);
assert.equal(filterOtsDatasets(otsDatasets, "audio", " Hindi ").length, 2);
assert.equal(filterOtsDatasets(otsDatasets, "audio", "multilingual read")[0].id, "fleurs");
assert.equal(filterOtsDatasets(otsDatasets, "image", "unlikely-no-match").length, 0);
for (const entry of otsDatasets) {
  for (const field of ["publisher", "sourceUrl", "licence", "licenceEvidenceUrl", "reviewNote", "access"]) assert(!(field in entry), `${entry.id}: private research field in client props: ${field}`);
  const original = publicDatasets.find((record) => record.id === entry.id);
  assert.equal(entry.scale, original.scale);
  assert.equal(entry.annotations, original.annotations);
  assert(!/\bfree\b|CC BY|CC0|licen[cs]e/i.test([entry.name, entry.description, entry.formats, entry.limitations].join(" ")));
}
console.log("PASS: Avlys OTS names, search, reference scope and client presentation fields.");

if (process.argv.includes("--metadata-only")) process.exit(0);
const runtimeModules = process.env.AVLYS_QA_NODE_MODULES;
if (!runtimeModules) throw new Error("Set AVLYS_QA_NODE_MODULES to the installed runtime node_modules path for browser checks.");
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(runtimeModules, "playwright"));
const baseURL = process.env.AVLYS_QA_BASE_URL || "http://127.0.0.1:3002";
const output = path.join(root, "output/data-catalogue-qa");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  await page.goto(`${baseURL}/data#datasets`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.locator("#datasets-image").waitFor({ state: "visible" });
  await page.locator("#datasets").scrollIntoViewIfNeeded();
  assert.equal(await page.locator("#dataset-results article").count(), 6);
  assert.equal(await page.locator("#datasets-image").getAttribute("aria-pressed"), "true");
  await page.locator("#datasets").screenshot({ path: path.join(output, "catalogue-desktop.png") });

  await page.locator("#datasets-audio").focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("#datasets-audio").getAttribute("aria-pressed"), "true");
  await page.locator("#dataset-search").fill("Hindi");
  await page.waitForFunction(() => document.querySelectorAll("#dataset-results article").length === 2);
  await page.locator("#dataset-search").fill("multilingual read");
  await page.waitForFunction(() => document.querySelectorAll("#dataset-results article").length === 1);
  await page.locator("#dataset-results summary").click();
  assert.equal(await page.locator("#dataset-results details").getAttribute("open"), "");
  assert(await page.locator("#dataset-results").getByText("Formats & labels", { exact: true }).isVisible());
  assert.equal(await page.locator('#datasets a[href^="https:"]').count(), 0);
  assert(!/\bfree\b|licen[cs]e|publisher/i.test(await page.locator("#datasets").innerText()));
  const mailto = await page.locator('#dataset-results a[href^="mailto:"]').getAttribute("href");
  assert(mailto.includes(encodeURIComponent("Multilingual read speech")));
  assert.equal(new URL(mailto).protocol, "mailto:");

  await page.locator("#dataset-search").fill("unlikely-no-match");
  await page.waitForFunction(() => document.querySelectorAll("#dataset-results article").length === 0);
  await page.getByRole("button", { name: "Show all audio datasets" }).click();
  assert.equal(await page.locator("#dataset-results article").count(), 6);
  await page.locator("#datasets-video").click();
  assert.equal(await page.locator("#dataset-results article").count(), 3);
  assert.equal(await page.locator("#dataset-search").inputValue(), "");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#datasets-video")?.getAttribute("aria-pressed") === "true");
  assert.equal(await page.locator("#dataset-results article").count(), 3);

  const layout = [];
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const category of datasetCategories) {
      await page.locator(`#datasets-${category.id}`).click();
      const size = await page.evaluate(() => ({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth }));
      assert(size.scrollWidth <= size.width, `Overflow: ${category.id} at ${width}: ${size.scrollWidth}`);
      layout.push({ width, category: category.id, overflow: false });
    }
    if (width === 390) {
      await page.locator("#datasets-image").click();
      await page.locator("#datasets").scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, "catalogue-mobile.png") });
      assert(await page.getByRole("navigation", { name: "Data page", exact: true }).getByRole("link", { name: "Catalogue", exact: true }).isVisible());
    }
  }
  assert.deepEqual(errors, [], "Browser runtime errors");
  await writeFile(path.join(output, "results.json"), JSON.stringify({ date: "2026-10-02", metadata: "passed", interaction: "passed", pageErrors: errors, layouts: layout }, null, 2));
  console.log("PASS: categories, keyboard, search, empty state, specifications, OTS presentation, email link, hash reload and 18 responsive layouts.");
} finally {
  await browser.close();
}
