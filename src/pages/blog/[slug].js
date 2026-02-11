import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { FaArrowLeft, FaTwitter } from "react-icons/fa";
import SEO from "../../components/SEO";
import { getAllPostSlugs, getPostBySlug } from "../../lib/posts";

/* ── Tag styling ── */
const TAG_STYLE = {
  "Case Study": "bg-blue-50 text-blue-700 border-blue-200",
  "Position Paper": "bg-purple-50 text-purple-700 border-purple-200",
  "AI Systems": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Distributed Systems": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "GPU Optimization": "bg-orange-50 text-orange-700 border-orange-200",
  Databases: "bg-amber-50 text-amber-700 border-amber-200",
  Industry: "bg-rose-50 text-rose-700 border-rose-200",
  Networking: "bg-teal-50 text-teal-700 border-teal-200",
};

/* ── Custom MDX components ── */
const components = {
  h1: (props) => (
    <h1
      className="text-[1.6rem] md:text-[1.85rem] font-bold text-primary tracking-tight mt-12 mb-4 leading-tight"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-[1.3rem] md:text-[1.5rem] font-bold text-primary tracking-tight mt-10 mb-4 leading-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-[1.1rem] md:text-lg font-semibold text-primary mt-8 mb-3 leading-snug"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-[15px] md:text-base text-gray-700 leading-[1.8] mb-5"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-berkeleyBlue font-medium hover:underline underline-offset-2 decoration-berkeleyBlue/30"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc pl-6 mb-5 space-y-1.5 text-gray-700 text-[15px] md:text-base leading-[1.8]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-6 mb-5 space-y-1.5 text-gray-700 text-[15px] md:text-base leading-[1.8]"
      {...props}
    />
  ),
  li: (props) => <li className="leading-[1.8] pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-[3px] border-berkeleyGold bg-amber-50/50 pl-5 py-4 pr-5 my-6 rounded-r-xl text-gray-600 text-[15px] leading-[1.75] [&>p]:mb-2 [&>p:last-child]:mb-0"
      {...props}
    />
  ),
  code: (props) => {
    if (!props.className) {
      return (
        <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[13px] font-mono border border-gray-200/60">
          {props.children}
        </code>
      );
    }
    return <code {...props} />;
  },
  pre: (props) => (
    <pre className="bg-gray-950 text-gray-100 rounded-xl p-5 mb-5 overflow-x-auto text-[13px] font-mono leading-relaxed border border-gray-800">
      {props.children}
    </pre>
  ),
  img: (props) => (
    <figure className="my-8">
      <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-3 overflow-hidden">
        <img
          className="w-full rounded-lg"
          {...props}
          alt={props.alt || ""}
        />
      </div>
      {props.alt && props.alt !== "" && !props.alt.startsWith("Screenshot") && (
        <figcaption className="mt-2.5 text-center text-[13px] text-gray-400 leading-snug">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-gray-200">
      <table className="min-w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="bg-gray-50 px-4 py-2.5 text-left font-semibold text-gray-700 border-b border-gray-200 text-sm"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-4 py-2.5 border-b border-gray-100 text-gray-600 text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
  strong: (props) => (
    <strong className="font-semibold text-primary" {...props} />
  ),
  em: (props) => <em className="italic text-gray-600" {...props} />,
};

/* ═══════════════ PAGE ═══════════════ */

export default function BlogPost({ frontmatter, mdxSource }) {
  const { title, author, date, formattedDate, tags, image, excerpt } = frontmatter;

  return (
    <>
      <SEO
        title={title}
        description={excerpt}
        image={`https://ucbskyadrs.github.io${image}`}
        url={`/blog/${frontmatter.slug || ""}`}
        type="article"
      />

      <article className="max-w-3xl mx-auto px-6 py-10 md:py-16">
        {/* Back link */}
        <Link href="/blog">
          <a className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-berkeleyBlue mb-10 transition-colors group">
            <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />{" "}
            All posts
          </a>
        </Link>

        {/* Header */}
        <header className="mb-10">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => {
                const cls =
                  TAG_STYLE[tag] || "bg-gray-50 text-gray-600 border-gray-200";
                return (
                  <span
                    key={tag}
                    className={`inline-block border rounded-full px-3 py-0.5 text-xs font-medium ${cls}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

          <h1 className="text-[1.6rem] md:text-[2rem] font-bold text-primary tracking-tight leading-[1.25]">
            {title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
            <span className="font-medium text-gray-500">{author}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </header>

        {/* Hero image */}
        {image && (
          <div className="mb-10 rounded-xl border border-gray-200 bg-gray-50/50 p-6 md:p-8 flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-72 object-contain"
            />
          </div>
        )}

        {/* MDX Content */}
        <div className="prose-custom">
          <MDXRemote {...mdxSource} components={components} />
        </div>

        {/* Bottom share / back */}
        <div className="mt-14 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Link href="/blog">
            <a className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-berkeleyBlue transition-colors group">
              <FaArrowLeft className="text-xs group-hover:-translate-x-0.5 transition-transform" />{" "}
              Back to blog
            </a>
          </Link>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(
              `https://ucbskyadrs.github.io/blog/${frontmatter.slug || ""}/`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg text-gray-400 hover:text-berkeleyBlue hover:bg-gray-50 flex items-center justify-center transition-colors"
            aria-label="Share on Twitter"
          >
            <FaTwitter className="text-base" />
          </a>
        </div>
      </article>
    </>
  );
}

/* ═══════════════ DATA FETCHING ═══════════════ */

export async function getStaticPaths() {
  const slugs = getAllPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { frontmatter, content } = getPostBySlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });

  // Format date at build time to avoid hydration mismatches
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date(frontmatter.date + "T12:00:00");
  const formattedDate = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  return {
    props: {
      frontmatter: { ...frontmatter, slug, formattedDate },
      mdxSource,
    },
  };
}
