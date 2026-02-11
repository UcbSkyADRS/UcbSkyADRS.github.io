# ADRS — AI-Driven Research for Systems

UC Berkeley Sky Computing Lab

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Requires Node.js 18+.** The site uses Next.js 16 with React 19.

## Project Structure

```
content/posts/     # MDX blog posts (frontmatter + markdown)
public/            # Static assets (images, logos)
src/
  components/      # Nav, Footer, SEO, Layout
  lib/posts.js     # MDX post loading helpers
  pages/           # Next.js pages (index, blog, leaderboard, about)
  styles/          # Global CSS + Tailwind
```

## Adding a Blog Post

1. Create a new `.mdx` file in `content/posts/` with frontmatter:

```yaml
---
title: "Your Post Title"
author: "Author Name"
date: "2026-01-15"
tags: ["Case Study", "AI Systems"]
image: "/your-image.png"
excerpt: "A short summary..."
---
```

2. Add images to `public/` or `public/blog/<slug>/`
3. The post will appear automatically at `/blog/<slug>/`

### Import from Notion (optional)

1. In Notion, export the page as **Markdown & CSV** (`.zip`)
2. Drop the `.zip` into `imports/`
3. Run `node scripts/import-notion.js`

## Deploy

```bash
npm run export
```

This builds the site and outputs static files to `docs/` for GitHub Pages.

## Tech Stack

- **Next.js 16** with static export (`output: 'export'`)
- **React 19** + Tailwind CSS
- **MDX** blog posts with `next-mdx-remote`
- **GitHub Pages** deployment from `docs/`
