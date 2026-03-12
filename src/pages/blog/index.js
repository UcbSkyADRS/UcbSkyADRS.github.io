import { useState, useMemo } from "react";
import Link from "next/link";
import { FaSearch, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import SEO from "../../components/SEO";
import AuthorList from "../../components/AuthorList";
import { getAllPosts } from "../../lib/posts";

/* ── Cross-posted external entries ── */
const CROSS_POSTS = [
  {
    slug: "skydiscover-framework",
    title: "SkyDiscover: A Flexible Framework for AI-Driven Scientific and Algorithmic Discovery",
    author: "Shu Liu, Mert Cemri, Shubham Agarwal, Alexander Krentsel, Ion Stoica, SkyDiscover Team",
    date: "2026-03-03",
    tags: ["AI Systems", "Case Study"],
    image: "/skydiscover-framework.png",
    excerpt: "SkyDiscover is a modular, open-source framework for LLM-driven evolutionary search — achieving new state-of-the-art on Frontier-CS, ADRS systems benchmarks, and 200+ optimization tasks spanning competitive programming, circle packing, MoE load balancing, and GPU model placement.",
    href: "https://skydiscover-ai.github.io/blog.html",
    external: true,
  },
];

/* ── Tag colours ── */
const TAG_STYLE = {
  "Case Study":          "bg-blue-50 text-blue-700 border-blue-100",
  "Position Paper":      "bg-purple-50 text-purple-700 border-purple-100",
  "Distributed Systems": "bg-cyan-50 text-cyan-700 border-cyan-100",
  Databases:             "bg-amber-50 text-amber-700 border-amber-100",
  Networking:            "bg-teal-50 text-teal-700 border-teal-100",
  "AI Systems":          "bg-indigo-50 text-indigo-700 border-indigo-100",
  "GPU Optimization":    "bg-orange-50 text-orange-700 border-orange-100",
  Industry:              "bg-rose-50 text-rose-700 border-rose-100",
};

const ALL_TAGS = Object.keys(TAG_STYLE);

/* ── Helpers ── */
function formatDate(d) {
  const dateStr = String(d || "").trim();
  const asLocalNoon = dateStr && !dateStr.includes("T") ? dateStr + "T12:00:00" : dateStr;
  return new Date(asLocalNoon).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

function getYear(d) {
  return new Date(d).getFullYear();
}

function Tag({ tag }) {
  const cls = TAG_STYLE[tag] || "bg-gray-50 text-gray-600 border-gray-100";
  return (
    <span className={`inline-block border rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {tag}
    </span>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function Blog({ mdxPosts }) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const toggle = (tag) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const allPosts = useMemo(() => {
    const posts = [
      ...mdxPosts.map((p) => ({ ...p, href: `/blog/${p.slug}/` })),
      ...CROSS_POSTS,
    ];
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return posts;
  }, [mdxPosts]);

  /* Filter */
  const filtered = useMemo(() => {
    let out = allPosts;
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTags.length)
      out = out.filter((p) => selectedTags.every((t) => p.tags.includes(t)));
    return out;
  }, [query, selectedTags, allPosts]);

  const years = [...new Set(filtered.map((p) => getYear(p.date)))].sort(
    (a, b) => b - a
  );

  return (
    <>
      <SEO
        title="Blog"
        description="Insights and case studies from AI-Driven Research Systems (ADRS) — exploring how AI discovers better algorithms for cloud scheduling, LLM serving, GPU optimization, and more."
        url="/blog"
      />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-2xl md:text-[2rem] font-bold tracking-tight text-primary">
            Blog
          </h1>
          <p className="mt-2 text-gray-400 text-[15px]">
            Insights and case studies on AI-Driven Research for Systems.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            {filtered.length} total post{filtered.length !== 1 ? "s" : ""}.
            {filtered.length !== allPosts.length && ` (filtered from ${allPosts.length})`}
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-5">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-berkeleyBlue/20 focus:border-berkeleyBlue/40 transition-all shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ALL_TAGS.map((tag) => {
            const on = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggle(tag)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                  on
                    ? "bg-berkeleyBlue text-white border-berkeleyBlue shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700 hover:shadow-sm"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all"
            >
              Clear
            </button>
          )}
        </div>

        {/* Empty state */}
        {years.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No posts match your search.</p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedTags([]);
              }}
              className="mt-2 text-sm text-berkeleyBlue hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Posts by year */}
        {years.map((year) => {
          const yp = filtered.filter((p) => getYear(p.date) === year);
          return (
            <section key={year} className="mb-10 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-semibold text-gray-400 tabular-nums">
                  {year}
                </h2>
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400">
                  {yp.length} post{yp.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-4">
                {yp.map((post) => {
                  const Wrapper = post.external ? "a" : Link;
                  const wrapperProps = post.external
                    ? { href: post.href, target: "_blank", rel: "noopener noreferrer" }
                    : { href: post.href };
                  return (
                    <Wrapper key={post.slug} {...wrapperProps} className="block">
                      <div className="group flex flex-col sm:flex-row rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer">
                        {/* Thumb */}
                        <div className="h-44 sm:h-auto sm:w-64 md:w-72 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center p-3">
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-contain object-center scale-[1.02] group-hover:scale-[1.05] transition-transform duration-300"
                          />
                        </div>
                        {/* Body */}
                        <div className="flex-1 min-w-0 px-6 py-5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-primary leading-snug group-hover:text-berkeleyBlue transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            {post.external && (
                              <FaExternalLinkAlt className="flex-shrink-0 text-[10px] text-gray-300" />
                            )}
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                            <AuthorList author={post.author} className="font-medium text-gray-500" link={false} />
                            <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <p className="mt-2.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {post.tags.map((t) => (
                              <Tag key={t} tag={t} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

/* ═══════════════ DATA FETCHING ═══════════════ */

export async function getStaticProps() {
  const mdxPosts = getAllPosts();
  return { props: { mdxPosts } };
}
