export function decodeHtml(s) {
  return s
    .replace(/\\u003d/g, "=")
    .replace(/\\u0026/g, "&")
    .replace(/\\u003c/g, "<")
    .replace(/\\u003e/g, ">")
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(s) {
  return decodeHtml(s.replace(/<a[^>]*>Plus<\/a>/gi, "").replace(/<[^>]+>/g, " "));
}

function parseRating(block) {
  const label = block.match(/aria-label="([^"]*(?:étoile|star|Star|toile)[^"]*)"/i)?.[1];
  if (!label) return 5;
  const m = label.match(/(\d)/);
  return m ? parseInt(m[1], 10) : 5;
}

function parseAuthor(block) {
  return (
    block.match(/class="PhaUTe">([^<]+)/)?.[1] ??
    block.match(/aria-label="Lire d(?:&#39;|')autres avis de ([^"]+)"/)?.[1] ??
    block.match(/class="d4r55"[^>]*>([^<]+)/)?.[1] ??
    "Google reviewer"
  );
}

export function countReviewsOnPage(source) {
  const counts = [];
  for (const m of source.matchAll(/(\d[\d\s.,]{0,6})\s*(?:avis|reviews)\b/gi)) {
    const n = parseInt(m[1].replace(/[\s.,]/g, ""), 10);
    if (n >= 5 && n <= 2000) counts.push(n);
  }
  if (counts.length === 0) return null;
  counts.sort((a, b) => b - a);
  return counts[0];
}

export function parseReviewsFromHtml(source, limit = 15) {
  const reviews = [];
  const seen = new Set();

  function add(author, text, rating = 5) {
    const clean = decodeHtml(text).replace(/…$/, "").trim();
    if (clean.length < 20 || seen.has(clean)) return;
    if (/google|javascript|function|aria-|class=/i.test(clean)) return;
    if (/propriétaire|owner/i.test(decodeHtml(author))) return;
    seen.add(clean);
    reviews.push({ author: decodeHtml(author).trim() || "Google reviewer", text: clean, rating });
  }

  const marker = 'class="bwb7ce"';
  let pos = 0;
  while ((pos = source.indexOf(marker, pos)) !== -1) {
    const block = source.slice(pos, pos + 15000);
    pos += marker.length;

    const author = parseAuthor(block);
    if (/propriétaire|owner/i.test(decodeHtml(author))) continue;

    const textMatch = block.match(/class="OA1nbd"[^>]*>([\s\S]*?)<\/div>/);
    if (!textMatch) continue;

    add(author, stripTags(textMatch[1]), parseRating(block));
  }

  for (const m of source.matchAll(/data-review-id="[^"]+"[\s\S]{0,4000}?<span[^>]*class="[^"]*wiI7pd[^"]*"[^>]*>([\s\S]*?)<\/span>/gi)) {
    const block = m[0];
    add(parseAuthor(block), decodeHtml(m[1].replace(/<[^>]+>/g, " ")), parseRating(block));
  }

  for (const m of source.matchAll(/class=\\"wiI7pd\\"[^>]*>([^<\\]+)/g)) {
    add("Google reviewer", decodeHtml(m[1]), 5);
  }

  for (const m of source.matchAll(/"reviewText"\s*:\s*"([^"]{20,800})"/g)) {
    add("Google reviewer", decodeHtml(m[1]), 5);
  }

  return reviews.slice(0, limit);
}

export function parseReviewsFromDom() {
  const reviews = [];
  const seen = new Set();

  function add(author, text, rating = 5) {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length < 20 || seen.has(clean)) return;
    if (/propriétaire|owner/i.test(author)) return;
    seen.add(clean);
    reviews.push({ author: author.trim() || "Google reviewer", text: clean, rating });
  }

  for (const block of document.querySelectorAll(".bwb7ce")) {
    const author =
      block.querySelector(".PhaUTe")?.textContent?.trim() ??
      block.querySelector('[aria-label*="autres avis de"]')?.getAttribute("aria-label")?.replace(/^.*autres avis de /i, "") ??
      "Google reviewer";

    const textEl = block.querySelector(".OA1nbd");
    if (!textEl) continue;

    const clone = textEl.cloneNode(true);
    clone.querySelectorAll("a").forEach((a) => a.remove());
    const text = clone.textContent?.replace(/\s+/g, " ").trim() ?? "";

    const starsLabel =
      block.querySelector('[aria-label*="étoile"], [aria-label*="star"], [aria-label*="Star"]')?.getAttribute("aria-label") ??
      "";
    const rating = starsLabel.match(/(\d)/)?.[1] ?? "5";

    add(author, text, parseInt(rating, 10));
  }

  for (const block of document.querySelectorAll("div[data-review-id], .jftiEf")) {
    const author =
      block.querySelector(".d4r55")?.textContent?.trim() ??
      block.querySelector("button[aria-label]")?.getAttribute("aria-label")?.trim() ??
      "Google reviewer";
    const text =
      block.querySelector('span[class*="wiI7pd"]')?.textContent?.trim() ??
      block.querySelector(".MyEned")?.textContent?.trim() ??
      "";
    const starsLabel =
      block.querySelector('[aria-label*="étoile"], [aria-label*="star"]')?.getAttribute("aria-label") ?? "";
    const rating = starsLabel.match(/(\d)/)?.[1] ?? "5";
    add(author, text, parseInt(rating, 10));
  }

  return reviews;
}
