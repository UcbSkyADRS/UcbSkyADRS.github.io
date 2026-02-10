import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaDiscord, FaSlack, FaTwitter } from "react-icons/fa";
import { SiArxiv } from "react-icons/si";
import SEO from "../components/SEO";

/* ── Stats ── */
const stats = [
  { value: "13x", label: "Speedup in load balancing" },
  { value: "35%", label: "Cost savings in cloud scheduling" },
  { value: "13", label: "Case studies published" },
  { value: "5+", label: "Frameworks benchmarked" },
];

/* ── Latest posts ── */
const recentPosts = [
  {
    title: "Optimizing Attention Mechanisms with Skylight",
    date: "Jan 29, 2026",
    image: "/skylight.png",
    url: "https://adrs-ucb.notion.site/skylight",
  },
  {
    title: "Multi-Cloud Data Access with Cloudcast",
    date: "Jan 22, 2026",
    image: "/cloudcast.png",
    url: "https://adrs-ucb.notion.site/cloudcast",
  },
  {
    title: "Policy Optimization with Bauplan",
    date: "Jan 15, 2026",
    image: "/bauplan.jpg",
    url: "https://adrs-ucb.notion.site/bauplan",
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="ADRS is a UC Berkeley initiative harnessing AI to automatically discover, optimize, and evolve algorithms for real-world systems — from cloud infrastructure to LLM serving."
        url="/"
      />

      {/* ═══ HERO ═══ */}
      <section className="bg-gradient-to-br from-berkeleyBlue via-[#002855] to-[#001a3d] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <p className="text-blue-300/60 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6">
              UC Berkeley Sky Computing Lab
            </p>

            <h1 className="text-[1.8rem] md:text-[2.75rem] font-extrabold text-white tracking-tight leading-[1.15]">
              AI-Driven Research
              <span className="text-berkeleyGold"> for Systems</span>
            </h1>

            <p className="mt-5 text-blue-200/60 text-[15px] md:text-base leading-relaxed max-w-lg">
              Harnessing AI to automatically discover, optimize, and evolve
              algorithms for real-world systems &mdash; from cloud
              infrastructure to LLM serving.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://arxiv.org/pdf/2510.06189"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-berkeleyBlue font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg shadow-black/10"
              >
                <SiArxiv /> Read the Paper
              </a>
              <Link href="/blog">
                <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.08] text-white font-medium text-sm border border-white/[0.15] hover:bg-white/[0.15] transition-colors backdrop-blur-sm">
                  Explore Blog <FaArrowRight className="text-xs" />
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle geometric accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Soft glow */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-berkeleyGold/10 rounded-full blur-3xl" />
      </section>

      {/* ═══ KEY RESULTS ═══ */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl md:text-[2rem] font-extrabold text-berkeleyBlue tracking-tight">
                  {value}
                </div>
                <div className="mt-1 text-[13px] text-gray-500 leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT IS ADRS ═══ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="md:flex md:items-center md:gap-14">
            <div className="md:w-5/12 mb-8 md:mb-0">
              <img
                src="/evolve-sys.png"
                alt="ADRS Evolution Framework"
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-7/12">
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                What is ADRS?
              </h2>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                AI-Driven Research for Systems (ADRS) uses AI to automatically
                design, optimize, and reason about complex algorithms. Instead
                of treating systems as a &ldquo;black box,&rdquo; ADRS rewrites
                their core algorithms as a &ldquo;white box&rdquo; &mdash;
                discovering solutions that outperform human experts.
              </p>
              <div className="mt-5">
                <Link href="/about">
                  <a className="inline-flex items-center gap-1.5 text-sm font-medium text-berkeleyBlue hover:underline underline-offset-2">
                    Learn more about ADRS <FaArrowRight className="text-xs" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LATEST RESEARCH ═══ */}
      <section className="bg-surface border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                Latest Research
              </h2>
              <p className="mt-1.5 text-gray-500 text-[13px]">
                Recent case studies from the ADRS blog
              </p>
            </div>
            <Link href="/blog">
              <a className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-berkeleyBlue hover:underline underline-offset-2">
                All posts <FaArrowRight className="text-xs" />
              </a>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentPosts.map((post) => (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                <div className="aspect-[16/10] bg-gray-50 flex items-center justify-center p-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="px-5 pb-5 pt-3.5">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-2">
                    {post.date}
                  </p>
                  <h3 className="text-[15px] font-semibold text-primary leading-snug line-clamp-2 group-hover:text-berkeleyBlue transition-colors">
                    {post.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog">
              <a className="inline-flex items-center gap-1.5 text-sm font-medium text-berkeleyBlue hover:underline">
                All posts <FaArrowRight className="text-xs" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ GET INVOLVED ═══ */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Get Involved
          </h2>
          <p className="mt-2.5 text-gray-500 text-[15px] leading-relaxed max-w-md mx-auto">
            Join our community, contribute to benchmarks, or reach out to
            collaborate.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            <a
              href="mailto:ucbskyadrs@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-berkeleyBlue text-white text-sm font-medium hover:bg-blue-800 transition-colors shadow-md shadow-berkeleyBlue/20"
            >
              <FaEnvelope /> Email Us
            </a>
            {[
              {
                icon: FaSlack,
                label: "Slack",
                href: "https://join.slack.com/t/adrs-global/shared_invite/zt-3fgme22n5-PKYyAc9aIeTyX5iSQTKIoA",
              },
              { icon: FaDiscord, label: "Discord", href: "https://discord.gg/4z7Yy3e4" },
              { icon: FaTwitter, label: "X / Twitter", href: "https://x.com/ai4research_ucb" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-berkeleyBlue hover:text-berkeleyBlue transition-all hover:shadow-sm"
              >
                <Icon /> {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}