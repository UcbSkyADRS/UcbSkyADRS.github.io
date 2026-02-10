import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Get all post slugs (for getStaticPaths).
 */
export function getAllPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/**
 * Get a single post's frontmatter + raw MDX source by slug.
 */
export function getPostBySlug(slug) {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: {
      title: data.title || slug,
      author: data.author || "ADRS Team",
      date: data.date ? String(data.date) : "",
      tags: data.tags || [],
      image: data.image || "/ADRS.png",
      excerpt: data.excerpt || "",
    },
    content,
  };
}

/**
 * Get all posts with frontmatter (for the blog index).
 * Sorted newest first.
 */
export function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const { frontmatter } = getPostBySlug(slug);
    return { slug, ...frontmatter };
  });

  posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date) - new Date(a.date);
  });

  return posts;
}
