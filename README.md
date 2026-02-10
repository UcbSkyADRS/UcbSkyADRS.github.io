# ADRS — AI-Driven Research for Systems

UC Berkeley Sky Computing Lab

## Dev Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Import a Blog Post from Notion

1. In Notion, open the post → `···` menu → **Export** → **Markdown & CSV** → download the `.zip`
2. Drop the `.zip` into the `imports/` folder
3. Run:

```bash
node scripts/import-notion.js
```

The script auto-extracts title, date, authors, tags, and images, then writes a ready-to-go `.mdx` file to `content/posts/`. Processed zips move to `imports/done/`.

## Deploy

```bash
npm run build && npm run export
```

Static output goes to `docs/` for GitHub Pages.
