#!/usr/bin/env node
/**
 * import-notion.js
 * ────────────────
 * Converts Notion "Markdown & CSV" exports (zip files) into
 * clean, hydration-safe MDX blog posts for the ADRS site.
 *
 * Usage:
 *   1. In Notion: ··· menu → Export → Markdown & CSV → download .zip
 *   2. Drop the .zip(s) into the  imports/  folder
 *   3. Run:  node scripts/import-notion.js
 *
 * Output:
 *   - content/posts/<slug>.mdx   (blog post with frontmatter)
 *   - public/blog/<slug>/*       (images)
 *   - public/<slug>.png          (hero/card thumbnail)
 *   - imports/done/<file>.zip    (processed zip moved here)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ── Paths ──────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, "..");
const IMPORTS_DIR = path.join(ROOT, "imports");
const DONE_DIR = path.join(IMPORTS_DIR, "done");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const PUBLIC_DIR = path.join(ROOT, "public");
const BLOG_IMAGES_DIR = path.join(PUBLIC_DIR, "blog");

// ── Tag keyword mapping ────────────────────────────────────
const TAG_KEYWORDS = {
  "Case Study": ["case study"],
  "Position Paper": ["position paper", "barbarians at the gate"],
  "AI Systems": ["llm serving", "llm inference", "attention", "prism", "skylight", "llm quer", "multi-agent", "mast", "moe", "load balanc"],
  "Distributed Systems": ["cloud", "spot instance", "cloudcast", "multi-cloud"],
  "GPU Optimization": ["gpu", "tensor", "autocomp", "bitsevolve", "datadog", "cuda"],
  "Databases": ["database", "transaction", "transactional", "sql", "relational", "bauplan"],
  "Industry": ["datadog", "bauplan", "autocomp", "bitsevolve", "industry"],
  "Networking": ["networking", "congestion control"],
};

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════

function slugify(text) {
  // For "Automating Algorithm Discovery: A Case Study in X" titles,
  // extract just the topic for a cleaner slug
  const match = text.match(/case study in (.+)/i);
  const base = match ? match[1] : text;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

/** Parse "January 22th, 2026" → "2026-01-22" */
function parseDate(str) {
  if (!str) return new Date().toISOString().split("T")[0];
  const cleaned = str.replace(/(\d+)(st|nd|rd|th)/gi, "$1").trim();
  const d = new Date(cleaned);
  if (isNaN(d.getTime())) {
    console.warn(`  ⚠ Could not parse date "${str}", using today.`);
    return new Date().toISOString().split("T")[0];
  }
  return d.toISOString().split("T")[0];
}

/** Auto-detect tags from title + body text. */
function detectTags(title, body) {
  const text = (title + " " + body).toLowerCase();
  const tags = [];
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw))) tags.push(tag);
  }
  return tags.length ? tags : ["Case Study"];
}

/** Extract the first real prose paragraph as excerpt (max 250 chars). */
function extractExcerpt(body) {
  for (const line of body.split("\n")) {
    const t = line.trim();
    // Skip non-prose lines
    if (
      !t ||
      t.startsWith("#") ||
      t.startsWith("!") ||
      t.startsWith("<") ||
      t.startsWith(">") ||
      t.startsWith("---") ||
      /^[-*]\s/.test(t)
    ) continue;
    // Skip author-like lines (multiple markdown links)
    if ((t.match(/\[[^\]]+\]\(/g) || []).length >= 2) continue;
    // Need real prose (60+ chars)
    if (t.length < 60) continue;
    let ex = t.replace(/\*\*/g, "").replace(/\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    return ex.length > 250 ? ex.slice(0, 247) + "..." : ex;
  }
  return "";
}

/** Recursively find files, optionally filtered by extension. */
function findFiles(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(full, ext));
    else if (!ext || entry.name.endsWith(ext)) results.push(full);
  }
  return results;
}

// ═══════════════════════════════════════════════════════════
// MARKDOWN CLEANING PIPELINE
// ═══════════════════════════════════════════════════════════

/**
 * Clean raw Notion markdown — minimal fixes only.
 *
 * We intentionally KEEP emojis, bold markers, and original formatting.
 * Only fix things that would break rendering or cause hydration errors:
 *   - Smart quotes → ASCII
 *   - <aside> blocks → blockquotes
 *   - Pipe | separators → middot (pipe = GFM table syntax)
 *   - Bare URLs → markdown links
 *   - Duplicate figure captions
 *   - Trailing whitespace / excessive blank lines
 */
function cleanMarkdown(md) {
  // 1. Smart quotes → ASCII (prevents Next.js hydration mismatches)
  md = md.replace(/[\u2018\u2019\u2032]/g, "'");
  md = md.replace(/[\u201C\u201D]/g, '"');
  md = md.replace(/\u2014/g, "--");
  md = md.replace(/\u2013/g, "-");
  md = md.replace(/\u00A0/g, " ");

  // 2. Notion <aside> blocks → blockquotes
  md = md.replace(/<aside>\s*\n?([\s\S]*?)<\/aside>/gi, (_, content) => {
    const lines = content.trim().split("\n");
    // Strip leading emoji-only line (💡, ⚠️, etc.) and blank lines at start
    const filtered = [];
    let started = false;
    for (const l of lines) {
      const t = l.trim();
      if (!started && (!t || /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE0F}]+$/u.test(t))) continue;
      started = true;
      filtered.push(l);
    }
    return filtered.map((l) => `> ${l}`).join("\n");
  });

  // 3. Pipe separators between links → middot (pipe = GFM table syntax)
  md = md.replace(/\]\s*\|\s*\[/g, "] · [");
  md = md.replace(/([\w)])\s+\|\s+([\w(])/g, "$1 · $2");

  // 4. Bare URLs (not already in a markdown link) → [short-label](url)
  md = md.replace(
    /(?<![(\["])(?<!\]\()(?<!=\s)(https?:\/\/[^\s<>)\],]+)/g,
    (match, _url, offset, str) => {
      // Don't touch if already inside [text](HERE) or [text](url "HERE")
      const before30 = str.substring(Math.max(0, offset - 30), offset);
      if (/\]\(\s*$/.test(before30)) return match;
      if (/\([^)]*$/.test(before30)) return match;
      const label = match.replace(/^https?:\/\//, "").replace(/\/$/, "");
      const short = label.length > 40 ? label.split("/").slice(0, 2).join("/") : label;
      return `[${short}](${match})`;
    }
  );

  // 5. Duplicate figure captions (Notion puts alt text as a paragraph after the image)
  md = md.replace(/!\[([^\]]+)\]\(([^)]+)\)\n\n\1\s*\n/g, "![$1]($2)\n\n");
  md = md.replace(/!\[([^\]]+)\]\(([^)]+)\)\n\n\1\s*$/gm, "![$1]($2)");

  // 6. Fix broken bold links: [**text](url)** → [text](url)
  md = md.replace(/\[\*\*([^\]]+)\]\(([^)]+)\)\*\*/g, "[$1]($2)");

  // 7. Strip trailing whitespace on every line
  md = md.replace(/[ \t]+$/gm, "");

  // 8. Collapse 3+ blank lines into 2
  md = md.replace(/\n{3,}/g, "\n\n");

  return md;
}

/**
 * Remove the header section (title, date, author lines) from the body.
 * Returns the cleaned body.
 */
function removeHeader(md, authorLine) {
  // Remove title (first # heading)
  md = md.replace(/^#\s+.+\n/, "");
  // Remove "Posted:" line
  md = md.replace(/^.*(?:🗓️\s*)?Posted:\s*.+\n/im, "");
  // Remove author line (contains multiple [Name](url) links)
  md = md.replace(/^\s*(\[[^\]]+\]\([^)]+\)[,\s]*)+.*(?:ADRS|team).*\n?/mi, "");
  // Fallback: remove the specific author line we detected
  if (authorLine) {
    md = md.replace(authorLine.trim(), "");
  }
  // Clean up leading blank lines
  md = md.replace(/^\n+/, "");
  return md;
}

// ═══════════════════════════════════════════════════════════
// MAIN PROCESSING
// ═══════════════════════════════════════════════════════════

function processZip(zipPath) {
  const zipName = path.basename(zipPath, ".zip");
  console.log(`\n📦 Processing: ${zipName}`);

  const tmpDir = path.join(IMPORTS_DIR, `_tmp_${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    // Unzip (handle nested zips from Notion's "Export block" format)
    execSync(`unzip -o -q "${zipPath}" -d "${tmpDir}"`);

    // If the outer zip only contains another zip, extract that too
    const innerZips = findFiles(tmpDir, ".zip");
    for (const iz of innerZips) {
      console.log(`  📦 Extracting nested zip: ${path.basename(iz)}`);
      execSync(`unzip -o -q "${iz}" -d "${tmpDir}"`);
      fs.unlinkSync(iz);
    }

    // Find the .md file
    const mdFiles = findFiles(tmpDir, ".md");
    if (mdFiles.length === 0) {
      console.error("  ❌ No .md file found in zip!");
      return false;
    }
    const mdFile = mdFiles[0];
    console.log(`  📄 Found: ${path.basename(mdFile)}`);

    let md = fs.readFileSync(mdFile, "utf-8");

    // ── Extract metadata before cleaning ──

    const titleMatch = md.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : zipName;

    const dateMatch = md.match(/(?:🗓️\s*)?Posted:\s*(.+)/i);
    const date = parseDate(dateMatch ? dateMatch[1] : null);

    const authorMatch = md.match(/(?:🗓️\s*)?Posted:.*\n\n(.+)/i);
    let author = "ADRS Team";
    if (authorMatch) {
      const line = authorMatch[1].trim();
      if (line.includes("[")) {
        const names = [...line.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);
        author = line.toLowerCase().includes("adrs")
          ? [...names, "ADRS Team"].join(", ")
          : names.join(", ");
      } else if (line.length < 200 && !line.startsWith("<") && !line.startsWith("#")) {
        author = line;
      }
    }

    const slug = slugify(title);
    const tags = detectTags(title, md);

    console.log(`  📌 Title: ${title}`);
    console.log(`  📅 Date:  ${date}`);
    console.log(`  👤 Author: ${author}`);
    console.log(`  🔗 Slug:  ${slug}`);
    console.log(`  🏷️  Tags:  ${tags.join(", ")}`);

    // ── Remove header, then clean ──

    md = removeHeader(md, authorMatch ? authorMatch[1] : null);
    md = cleanMarkdown(md);

    // ── Handle images ──

    const imageDir = path.join(BLOG_IMAGES_DIR, slug);
    fs.mkdirSync(imageDir, { recursive: true });

    // Collect all images from the export (md dir + sibling dirs)
    const imageFiles = [];
    imageFiles.push(...findFiles(path.dirname(mdFile), null).filter((f) => /\.(png|jpe?g|gif|webp|svg)$/i.test(f)));
    for (const entry of fs.readdirSync(tmpDir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        imageFiles.push(...findFiles(path.join(tmpDir, entry.name), null).filter((f) => /\.(png|jpe?g|gif|webp|svg)$/i.test(f)));
      }
    }
    const uniqueImages = [...new Set(imageFiles)];

    // Copy and rename images
    const imageMap = {};
    let figNum = 0;
    for (const imgPath of uniqueImages) {
      const origName = path.basename(imgPath);
      let cleanName = origName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "").toLowerCase();
      // UUID filenames → figure-N
      if (/^[a-f0-9-]{30,}\./.test(cleanName)) {
        figNum++;
        cleanName = `figure-${figNum}${path.extname(cleanName)}`;
      }
      fs.copyFileSync(imgPath, path.join(imageDir, cleanName));
      imageMap[origName] = cleanName;
      console.log(`  🖼️  ${origName} → ${cleanName}`);
    }

    // Rewrite image paths in markdown
    md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, ref) => {
      const orig = path.basename(decodeURIComponent(ref));
      const clean = imageMap[orig];
      return clean ? `![${alt}](/blog/${slug}/${clean})` : match;
    });

    // ── Hero image (for blog listing card) ──

    const firstImg = md.match(/!\[[^\]]*\]\((\/blog\/[^)]+)\)/);
    let heroImage = "/ADRS.png";
    if (firstImg) heroImage = firstImg[1];

    const heroSlugName = `${slug}.png`;
    if (heroImage.startsWith("/blog/")) {
      const src = path.join(PUBLIC_DIR, heroImage.slice(1));
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(PUBLIC_DIR, heroSlugName));
      }
    }

    // ── Excerpt ──

    const excerpt = extractExcerpt(md);
    console.log(`  📝 Excerpt: ${excerpt.slice(0, 80)}...`);

    // ── Ensure no trailing newline issues ──
    md = md.trim() + "\n";

    // ── Build frontmatter + write ──

    const esc = (s) => s.replace(/"/g, '\\"');
    const frontmatter = [
      "---",
      `title: "${esc(title)}"`,
      `author: "${esc(author)}"`,
      `date: "${date}"`,
      `tags: [${tags.map((t) => `"${t}"`).join(", ")}]`,
      `image: "/${heroSlugName}"`,
      `excerpt: "${esc(excerpt)}"`,
      "---",
      "",
    ].join("\n");

    const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
    if (fs.existsSync(mdxPath)) console.log(`  ⚠ Overwriting: ${slug}.mdx`);
    fs.writeFileSync(mdxPath, frontmatter + md, "utf-8");
    console.log(`  ✅ Written: content/posts/${slug}.mdx`);

    // ── Move zip to done/ ──

    fs.mkdirSync(DONE_DIR, { recursive: true });
    fs.renameSync(zipPath, path.join(DONE_DIR, path.basename(zipPath)));
    console.log(`  📂 Moved zip → imports/done/`);

    return true;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

// ═══════════════════════════════════════════════════════════
// ENTRY POINT
// ═══════════════════════════════════════════════════════════

function main() {
  console.log("═══════════════════════════════════════");
  console.log("  ADRS Notion → MDX Importer");
  console.log("═══════════════════════════════════════");

  fs.mkdirSync(IMPORTS_DIR, { recursive: true });
  fs.mkdirSync(POSTS_DIR, { recursive: true });

  const zips = fs.readdirSync(IMPORTS_DIR).filter((f) => f.endsWith(".zip"));
  if (zips.length === 0) {
    console.log("\n  No .zip files found in imports/");
    console.log("  Drop your Notion exports there and re-run.\n");
    return;
  }

  console.log(`\n  Found ${zips.length} zip file(s) to process.\n`);

  let ok = 0, fail = 0;
  for (const zip of zips) {
    try {
      processZip(path.join(IMPORTS_DIR, zip)) ? ok++ : fail++;
    } catch (err) {
      console.error(`  ❌ Error processing ${zip}:`, err.message);
      fail++;
    }
  }

  console.log("\n═══════════════════════════════════════");
  console.log(`  Done! ${ok} imported, ${fail} failed.`);
  console.log("═══════════════════════════════════════\n");
}

main();
