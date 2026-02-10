import { useState, useMemo } from "react";
import Link from "next/link";
import { FaSearch, FaTimes } from "react-icons/fa";
import SEO from "../../components/SEO";
import { getAllPosts } from "../../lib/posts";

/* ── Tag colours ── */
const TAG_STYLE = {
  "Case Study":          "bg-blue-50 text-blue-700 border-blue-100",
  "Position Paper":      "bg-purple-50 text-purple-700 border-purple-100",
  Benchmark:             "bg-emerald-50 text-emerald-700 border-emerald-100",
  "LLM Serving":         "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Cloud Scheduling":    "bg-cyan-50 text-cyan-700 border-cyan-100",
  "GPU Optimization":    "bg-orange-50 text-orange-700 border-orange-100",
  "Load Balancing":      "bg-teal-50 text-teal-700 border-teal-100",
  Databases:             "bg-amber-50 text-amber-700 border-amber-100",
  "Multi-Agent Systems": "bg-pink-50 text-pink-700 border-pink-100",
  Industry:              "bg-rose-50 text-rose-700 border-rose-100",
};

const ALL_TAGS = Object.keys(TAG_STYLE);

/* ── Notion-hosted posts (not yet migrated) ── */
const notionPosts = [
  {
    title: "Automating Algorithm Discovery: A Case Study in Optimizing Attention Mechanisms with Skylight",
    author: "ADRS Team", date: "2026-01-29", tags: ["Case Study", "LLM Serving"],
    image: "/skylight.png", excerpt: "We study sparse attention for accelerating decoding in LLMs. The goal is to reduce memory traffic and latency during decoding.",
    url: "https://adrs-ucb.notion.site/skylight",
  },
  {
    title: "Automating Algorithm Discovery: A Case Study in Multi-Cloud Data Access with Cloudcast",
    author: "ADRS Team", date: "2026-01-22", tags: ["Case Study", "Cloud Scheduling"],
    image: "/cloudcast.png", excerpt: "We tackle the challenge of efficiently accessing data across multiple cloud providers and regions.",
    url: "https://adrs-ucb.notion.site/cloudcast",
  },
  {
    title: "Automating Algorithm Discovery: A Case Study in Policy Optimization with Bauplan",
    author: "Bauplan & ADRS Teams", date: "2026-01-15", tags: ["Case Study", "Cloud Scheduling", "Industry"],
    image: "/bauplan.jpg", excerpt: "We partner with Bauplan to explore how ADRS can optimize policy generation for data pipeline systems.",
    url: "https://adrs-ucb.notion.site/bauplan",
  },
  {
    title: "Automating Algorithm Discovery: A Case Study in Optimizing LLM Serving with Prism",
    author: "ADRS Team", date: "2026-01-08", tags: ["Case Study", "LLM Serving"],
    image: "/prism.jpg", excerpt: "We explore GPU memory management for LLM inference serving. Prism achieves ~70% cost savings.",
    url: "https://adrs-ucb.notion.site/prism",
  },
  {
    title: "Let the Barbarians In: How AI Can Accelerate Systems Performance Research",
    author: "ADRS Team", date: "2026-01-02", tags: ["Benchmark"],
    image: "/adrs-2.png", excerpt: "We evaluate three open-source frameworks across ten real-world research problems.",
    url: "https://adrs-ucb.notion.site/let-the-barbarians-in",
  },
  {
    title: "Automating Algorithm Discovery: A Case Study in Improving Multi-Agent System Design using MAST",
    author: "ADRS Team", date: "2025-12-15", tags: ["Case Study", "Multi-Agent Systems"],
    image: "/mast.png", excerpt: "We replace hand-tuning with OpenEvolve to optimize Multi-Agent System code directly.",
    url: "https://adrs-ucb.notion.site/mast",
  },
  {
    title: "BitsEvolve: Self-Optimizing GPU Code Generation at Datadog",
    author: "Datadog & ADRS Team", date: "2025-12-04", tags: ["Case Study", "GPU Optimization", "Industry"],
    image: "/datadog.png", excerpt: "BitsEvolve targets various modalities from optimizing CPU-bound hotspots to policy tuning for inference serving frameworks.",
    url: "https://adrs-ucb.notion.site/datadog",
  },
  {
    title: "Autocomp: An ADRS Framework for Optimizing Tensor Accelerator Code",
    author: "Autocomp & ADRS Teams", date: "2025-11-20", tags: ["Case Study", "GPU Optimization", "Industry"],
    image: "/autocomp.png", excerpt: "Autocomp is the first LLM-driven code optimizer for low-resource tensor accelerators.",
    url: "https://adrs-ucb.notion.site/autocomp",
  },
  {
    title: "Automating Algorithm Discovery: A Case Study in Transaction Scheduling",
    author: "ADRS Team", date: "2025-11-13", tags: ["Case Study", "Databases"],
    image: "/transaction.png", excerpt: "We revisit a VLDB '24 problem on minimizing contention for database transactional workloads.",
    url: "https://adrs-ucb.notion.site/txn-scheduling",
  },
  {
    title: "Automating Algorithm Discovery: A Case Study in Optimizing LLM Queries over Relational Workloads",
    author: "ADRS Team", date: "2025-11-06", tags: ["Case Study", "LLM Serving"],
    image: "/llmqueries.png", excerpt: "ADRS autonomously discovered a 3x faster algorithm that achieves the same prefix reuse ratio.",
    url: "https://adrs-ucb.notion.site/llm-sql-evolution",
  },
  {
    title: "Automating Algorithm Discovery: A Case Study in Spot Instance Scheduling",
    author: "ADRS Team", date: "2025-10-30", tags: ["Case Study", "Cloud Scheduling"],
    image: "/spot.png", excerpt: "OpenEvolve discovers novel algorithms surpassing an NSDI\u201924 Best Paper.",
    url: "https://adrs-ucb.notion.site/spot-instance-scheduling",
  },
  {
    title: "Barbarians at The Gate: How AI is Upending Systems Research",
    author: "ADRS Team", date: "2025-10-17", tags: ["Position Paper"],
    image: "/image1.png", excerpt: "AI is now rewriting core algorithms by treating the system as a \"white box\" and discovering solutions that outperform human experts.",
    url: "https://adrs-ucb.notion.site/",
  },
];

/* ── Helpers ── */
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
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

  /* Merge MDX posts + Notion posts, skip Notion post if MDX version exists */
  const allPosts = useMemo(() => {
    const mdxSlugs = new Set(mdxPosts.map((p) => p.slug));
    // Filter out notion posts that have been migrated (matched by similar date)
    const notionOnly = notionPosts.filter((np) => {
      // Check if any MDX post has the same date
      return !mdxPosts.some((mp) => mp.date === np.date);
    });

    const merged = [
      ...mdxPosts.map((p) => ({ ...p, href: `/blog/${p.slug}/`, isLocal: true })),
      ...notionOnly.map((p) => ({ ...p, href: p.url, isLocal: false })),
    ];

    merged.sort((a, b) => new Date(b.date) - new Date(a.date));
    return merged;
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

      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Blog
          </h1>
          <p className="mt-2 text-gray-500 text-base">
            Insights and case studies from AI-Driven Research Systems.
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-berkeleyBlue/20 focus:border-berkeleyBlue/40 transition-all"
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
        <div className="flex flex-wrap gap-1.5 mb-8">
          {ALL_TAGS.map((tag) => {
            const on = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggle(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  on
                    ? "bg-berkeleyBlue text-white border-berkeleyBlue"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="px-3 py-1 rounded-full text-xs font-medium text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all"
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

              <div className="space-y-3">
                {yp.map((post) => {
                  const Wrapper = post.isLocal ? "div" : "a";
                  const wrapperProps = post.isLocal
                    ? {}
                    : {
                        href: post.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      };

                  const inner = (
                    <div className="group flex flex-col sm:flex-row rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer">
                      {/* Thumb */}
                      <div className="sm:w-48 flex-shrink-0 bg-gray-50/80 flex items-center justify-center p-5">
                        <img
                          src={post.image}
                          alt=""
                          className="w-full h-24 sm:h-28 object-contain group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                      {/* Body */}
                      <div className="flex-1 min-w-0 px-5 py-4 sm:py-4.5">
                        <h3 className="text-[15px] font-semibold text-primary leading-snug group-hover:text-berkeleyBlue transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="mt-1.5 flex items-center gap-2 text-[12px] text-gray-400">
                          <span className="font-medium text-gray-500">{post.author}</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                          <span>{formatDate(post.date)}</span>
                          {!post.isLocal && (
                            <>
                              <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                              <span className="text-gray-300 italic text-[11px]">Notion</span>
                            </>
                          )}
                        </div>
                        <p className="mt-2 text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {post.tags.map((t) => (
                            <Tag key={t} tag={t} />
                          ))}
                        </div>
                      </div>
                    </div>
                  );

                  if (post.isLocal) {
                    return (
                      <Link key={post.slug || post.title} href={post.href}>
                        <a className="block">{inner}</a>
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={post.title}
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      {inner}
                    </a>
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
