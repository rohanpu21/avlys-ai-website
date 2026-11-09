import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Run with Node 22.18+ (native type stripping). Dataset metadata only; no downloads.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { publicDatasets, filterPublicDatasets, licenceGuides, datasetCategories } = await import(pathToFileURL(path.join(root, "app/data/publicDatasetCatalog.ts")));
const privateDatasetAliases = ["Kuzushiji"];
function containsSourceLabel(content, label) {
  const parts = label.split(/[-_\s]+/).filter(Boolean).map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(?:^|[^\\p{L}\\p{N}])${parts.join("[\\s_-]*")}(?:$|[^\\p{L}\\p{N}])`, "iu");
  return pattern.test(content);
}
function containsSerializedFieldValue(content, field, value) {
  const normalized = content.replace(/\\(["'])/g, "$1");
  const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:["']${escapedField}["']|${escapedField})\\s*:\\s*(["'])${escapedValue}\\1`, "iu").test(normalized);
}
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
console.log("PASS: 15 internal source records and licence URLs, modality counts, conditions and search.");

const { toOtsCatalogue } = await import(pathToFileURL(path.join(root, "app/data/otsCataloguePresentation.ts")));
const { toDataPageCatalogue } = await import(pathToFileURL(path.join(root, "app/data/dataPageCatalogue.ts")));
const { filterOtsDatasets, otsCategories } = await import(pathToFileURL(path.join(root, "app/data/otsCatalogueClient.ts")));
const otherDataRoutesDatasets = toOtsCatalogue(publicDatasets);
const otsDatasets = toDataPageCatalogue(toOtsCatalogue(publicDatasets));
assert.equal(otsDatasets.length, 15);
assert.deepEqual(otherDataRoutesDatasets.map((entry) => entry.id), publicDatasets.map((entry) => entry.id), "The /data modality pages keep their existing catalogue IDs");
assert.deepEqual(otsCategories.map((category) => filterOtsDatasets(otsDatasets, category.id, "").length), [6, 6, 3]);
assert.equal(filterOtsDatasets(otsDatasets, "audio", " Hindi ").length, 2);
assert.equal(filterOtsDatasets(otsDatasets, "audio", "multilingual read")[0].id, "audio-01");
assert.equal(filterOtsDatasets(otsDatasets, "image", "unlikely-no-match").length, 0);
assert(otsDatasets.every((entry) => /^(image|audio|video)-\d{2}$/.test(entry.id)), "Public card IDs must not expose internal dataset slugs");
for (const entry of otsDatasets) {
  for (const field of ["publisher", "sourceUrl", "licence", "licenceEvidenceUrl", "reviewNote", "access"]) assert(!(field in entry), `${entry.id}: origin or private rights research field in client props: ${field}`);
  const ordinal = Number(entry.id.slice(entry.id.lastIndexOf("-") + 1)) - 1;
  const original = publicDatasets.filter((record) => record.modality === entry.modality)[ordinal];
  assert(original, `${entry.id}: matching internal reference record`);
  assert.equal(entry.scale, original.scale);
  assert.equal(entry.annotations, original.annotations);
  for (const label of [original.id, original.name, ...privateDatasetAliases]) assert(!containsSourceLabel(JSON.stringify(entry), label), `${entry.id}: original dataset identifier, name or alias leaked into client props`);
  assert(!/\bfree\b|CC BY|CC0|licen[cs]e/i.test([entry.name, entry.description, entry.formats, entry.limitations].join(" ")));
}
console.log("PASS: Avlys OTS names, search, reference scope and client presentation fields.");

if (process.argv.includes("--metadata-only")) process.exit(0);
const runtimeModules = process.env.AVLYS_QA_NODE_MODULES;
if (!runtimeModules) throw new Error("Set AVLYS_QA_NODE_MODULES to the installed runtime node_modules path for browser checks.");
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(runtimeModules, "playwright"));
const baseURL = process.env.AVLYS_QA_BASE_URL || "http://127.0.0.1:3002";
const output = process.env.AVLYS_QA_OUTPUT || path.join(root, "output/data-catalogue-qa");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
async function currentPublicScripts() {
  return page.evaluate(async () => {
    const urls = [...document.scripts].map((script) => script.src).filter((url) => url && new URL(url).origin === location.origin);
    return (await Promise.all(urls.map(async (url) => {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not inspect public script ${url}: ${response.status}`);
      return response.text();
    }))).join("\n");
  });
}
function assertNoDatasetSources(route, html, scripts) {
  for (const entry of publicDatasets) {
    assert(!html.includes(entry.publisher), `${route}: dataset publisher name leaked into public HTML (${entry.id})`);
    assert(!html.includes(entry.sourceUrl), `${route}: dataset source URL leaked into public HTML (${entry.id})`);
    assert(!html.includes(entry.licenceEvidenceUrl), `${route}: rights-research URL leaked into public HTML (${entry.id})`);
    assert(!scripts.includes(entry.sourceUrl), `${route}: dataset source URL leaked into a public script (${entry.id})`);
    assert(!scripts.includes(entry.licenceEvidenceUrl), `${route}: rights-research URL leaked into a public script (${entry.id})`);
    assert(!containsSerializedFieldValue(scripts, "publisher", entry.publisher), `${route}: dataset publisher metadata leaked into a public script (${entry.id})`);
    for (const label of [entry.id, entry.name, ...privateDatasetAliases]) {
      assert(!containsSourceLabel(html, label), `${route}: original dataset identifier, name or alias leaked into public HTML (${entry.id})`);
      assert(!containsSourceLabel(scripts, label), `${route}: original dataset identifier, name or alias leaked into a public script (${entry.id})`);
    }
  }
  for (const field of ["sourceUrl", "licenceEvidenceUrl", "reviewNote"]) {
    assert(!html.includes(field), `${route}: internal dataset source field leaked into public HTML (${field})`);
    assert(!scripts.includes(field), `${route}: internal dataset source field leaked into a public script (${field})`);
  }
}
try {
  await page.goto(`${baseURL}/data#datasets`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.locator("#datasets-image").waitFor({ state: "visible" });
  const publicHtml = await page.content();
  assertNoDatasetSources("/data", publicHtml, await currentPublicScripts());
  await page.locator("#datasets").scrollIntoViewIfNeeded();
  assert.equal(await page.locator("#dataset-results article").count(), 6);
  assert.equal(await page.locator("#datasets-image").getAttribute("aria-pressed"), "true");
  assert.equal(await page.locator("#dataset-results").getByText("Reference option", { exact: true }).count(), 6);
  assert.equal(await page.getByText("15 reference options", { exact: true }).count(), 1);
  const cardIds = await page.locator("#dataset-results article").evaluateAll((cards) => cards.map((card) => card.querySelector("h3, h4")?.id ?? ""));
  assert(cardIds.every((id) => /^dataset-(image|audio|video)-\d{2}$/.test(id)), "Rendered card IDs must use neutral labels");
  await page.locator("#datasets").screenshot({ path: path.join(output, "catalogue-desktop.png") });
  await page.getByRole("button", { name: "Synthetic scenes", exact: true }).click();
  assert.equal(await page.locator("#dataset-results article").count(), 1);
  assert.equal(await page.getByRole("button", { name: "Synthetic scenes", exact: true }).getAttribute("aria-pressed"), "true");
  await page.locator("#clear-dataset-filters").click();
  assert.equal(await page.locator("#dataset-results article").count(), 6);

  await page.locator("#datasets-audio").focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelector("#datasets-audio")?.getAttribute("aria-pressed") === "true");
  assert.equal(await page.locator("#datasets-audio").getAttribute("aria-pressed"), "true");
  await page.getByRole("button", { name: "Hindi speech", exact: true }).click();
  assert.equal(await page.locator("#dataset-results article").count(), 2);
  await page.getByLabel("Filter by use case").selectOption({ label: "Indian-language ASR" });
  assert.equal(await page.locator("#dataset-results article").count(), 1);
  await page.getByLabel("Filter by collection type").selectOption({ label: "Indian-language speech" });
  await page.locator("#dataset-search").fill("Tamil");
  assert.equal(await page.locator("#dataset-results article").count(), 1);
  assert.match(await page.locator("#dataset-results h4").textContent(), /Indian-language speech/i);
  await page.locator("#clear-dataset-filters").click();
  assert.equal(await page.locator("#dataset-results article").count(), 6);
  await page.locator("#dataset-search").fill("Hindi");
  await page.waitForFunction(() => document.querySelectorAll("#dataset-results article").length === 2);
  await page.locator("#dataset-search").fill("multilingual read");
  await page.waitForFunction(() => document.querySelectorAll("#dataset-results article").length === 1);
  await page.locator("#dataset-results summary").click();
  assert.equal(await page.locator("#dataset-results details").getAttribute("open"), "");
  assert(await page.locator("#dataset-results").getByText("Formats & labels", { exact: true }).isVisible());
  assert.equal(await page.locator('#dataset-results a[href^="https:"]').count(), 0, "Dataset cards must not link to collection sources");
  assert.equal(await page.locator("#dataset-results").getByText("Original source", { exact: true }).count(), 0);
  assert(!/\bfree\b|CC BY|CC0/i.test(await page.locator("#datasets").innerText()));
  const mailto = await page.locator('#dataset-results a[href^="mailto:"]').getAttribute("href");
  assert(mailto.includes(encodeURIComponent("Multilingual read speech")));
  assert.equal(await page.locator("#dataset-results").getByRole("link", { name: /Check availability & pricing/ }).count(), 1);
  assert.equal(new URL(mailto).protocol, "mailto:");

  await page.locator("#dataset-search").fill("unlikely-no-match");
  await page.waitForFunction(() => document.querySelectorAll("#dataset-results article").length === 0);
  await page.locator("#clear-dataset-filters").click();
  assert.equal(await page.locator("#dataset-results article").count(), 6);
  await page.locator("#datasets-video").click();
  assert.equal(await page.locator("#dataset-results article").count(), 3);
  assert.equal(await page.locator("#dataset-search").inputValue(), "");
  await page.getByRole("button", { name: "Robot actions", exact: true }).click();
  assert.equal(await page.locator("#dataset-results article").count(), 2);
  await page.locator("#clear-dataset-filters").click();
  assert.equal(await page.locator("#dataset-results article").count(), 3);
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
  for (const category of datasetCategories) {
    const route = `/data/${category.id}`;
    await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded", timeout: 120000 });
    assertNoDatasetSources(route, await page.content(), await currentPublicScripts());
  }
  await page.goto(`${baseURL}/data#data-faq`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const languageFaq = page.locator("#data-faq details").filter({ hasText: "Can you support specific languages, accents, or rare scenarios?" });
  assert.equal(await languageFaq.count(), 1);
  await languageFaq.locator("summary").click();
  assert.match(await languageFaq.innerText(), /Hindi, Bengali, Tamil/);
  await languageFaq.screenshot({ path: path.join(output, "language-faq-detail.png") });
  const textFaq = page.locator("#data-faq details").filter({ hasText: "Does Avlys offer text and document training data?" });
  assert.equal(await textFaq.count(), 1);
  await textFaq.locator("summary").click();
  assert.match(await textFaq.innerText(), /retrieval-augmented generation \(RAG\)/);
  assert.match(await textFaq.innerText(), /separate from the current off-the-shelf image, audio and video catalogue/);
  await textFaq.screenshot({ path: path.join(output, "text-data-faq-detail.png") });
  const syntheticFaq = page.locator("#data-faq details").filter({ hasText: "Does Avlys offer synthetic AI training data?" });
  assert.equal(await syntheticFaq.count(), 1);
  await syntheticFaq.locator("summary").click();
  assert.match(await syntheticFaq.innerText(), /Not as a confirmed Avlys-generated stock offering/);
  await syntheticFaq.screenshot({ path: path.join(output, "synthetic-data-faq-detail.png") });
  assert.deepEqual(errors, [], "Browser runtime errors");
  await writeFile(path.join(output, "results.json"), JSON.stringify({ date: new Date().toISOString().slice(0, 10), metadata: "passed", interaction: "passed", languageFaq: "passed", textFaq: "passed", syntheticFaq: "passed", pageErrors: errors, layouts: layout }, null, 2));
  console.log("PASS: /data and all modality guides are source-free in HTML/scripts; categories, suggested searches, keyboard, search, combined filters, availability/pricing contact, FAQs, empty state, specifications, hash reload and 18 responsive layouts.");
} finally {
  await browser.close();
}
