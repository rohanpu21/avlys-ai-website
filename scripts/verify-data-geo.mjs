import assert from "node:assert/strict";

// HTTP-only checks: prove discovery works without client-side JavaScript.
// Run against a local preview or an explicitly supplied deployment origin.
const origin = process.env.AVLYS_QA_URL ?? "http://127.0.0.1:3002";
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const plain = (value) => decode(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")).trim();
async function get(path) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(90000) });
  return { status: response.status, text: await response.text() };
}

for (const [path, expectedCards, expectedFaqs] of [["/data", 6, 18], ["/data/image", 6, 2], ["/data/audio", 6, 2], ["/data/video", 3, 2]]) {
  const { status, text } = await get(path);
  assert.equal(status, 200, `${path}: HTTP status`);
  const html = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  assert.match(html, new RegExp(`<link rel="canonical" href="https://avlysai.com${path}"`));
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one H1`);
  assert.equal([...html.matchAll(/<article[^>]+aria-labelledby="dataset-/g)].length, expectedCards, `${path}: server-rendered dataset descriptions`);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/);
  const graphs = [...text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
    const parsed = JSON.parse(match[1]);
    return parsed["@graph"] ?? [parsed];
  });
  const faq = graphs.find((item) => item["@type"] === "FAQPage" && item["@id"] === `https://avlysai.com${path}#data-faq`);
  assert.equal(faq?.mainEntity.length, expectedFaqs, `${path}: FAQ schema`);
  const pageText = plain(html);
  for (const item of faq.mainEntity) {
    assert.ok(pageText.includes(item.name), `${path}: schema question also visible`);
    assert.ok(pageText.includes(item.acceptedAnswer.text), `${path}: schema answer also visible`);
  }
  const service = graphs.find((item) => item["@type"] === "Service");
  assert.equal(service?.provider["@id"], "https://avlysai.com/#organization");
  assert.ok(graphs.some((item) => item["@type"] === "BreadcrumbList"));
  for (const modality of ["image", "audio", "video"]) {
    assert.ok(html.includes(`href="/data/${modality}"`), `${path}: real link to ${modality}`);
  }
  assert.ok(html.includes('href="https://wa.me/919937730039?'), `${path}: WhatsApp contact`);
  assert.ok(html.includes("sales@avlysai.com"), `${path}: business email`);
  if (path === "/data") {
    assert.match(html, /<canvas\b/, "Animated hero canvas is rendered");
    assert.ok(html.includes('href="#data-brief"'));
    assert.ok(html.includes('href="tel:+919937730039"'));
  }
  console.log(`PASS ${path}: ${expectedCards} SSR cards; ${expectedFaqs} matching FAQs; canonical, service, breadcrumbs, links and contacts.`);
}
const invalid = await get("/data/not-a-modality");
assert.equal(invalid.status, 404, "Unknown data category must return 404");
const robots = await get("/robots.txt");
assert.equal(robots.status, 200);
assert.match(robots.text, /User-Agent: OAI-SearchBot\s+Allow: \//i);
const sitemap = await get("/sitemap.xml");
assert.equal(sitemap.status, 200);
for (const path of ["/data", "/data/image", "/data/audio", "/data/video"]) {
  assert.ok(sitemap.text.includes(`<loc>https://avlysai.com${path}</loc>`));
}
const discovery = await get("/llms.txt");
assert.equal(discovery.status, 200);
assert.ok(discovery.text.includes("https://avlysai.com/data/audio"));
console.log("PASS: unknown category 404, OAI-SearchBot allowed, sitemap and supplemental discovery links.");
