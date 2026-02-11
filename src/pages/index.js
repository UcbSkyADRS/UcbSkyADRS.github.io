import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaDiscord, FaSlack, FaTwitter } from "react-icons/fa";
import { SiArxiv } from "react-icons/si";
import SEO from "../components/SEO";

/* ── Stats ── */
const stats = [
  { value: "13x", label: "Speedup in load balancing" },
  { value: "35%", label: "Cost savings in cloud scheduling" },
  { value: "13", label: "Case studies published" },
  { value: "4", label: "Frameworks benchmarked" },
];

/* ── Latest posts (local blog) ── */
const recentPosts = [
  {
    title: "Congestion Control Optimization",
    date: "Feb 5, 2026",
    image: "/congestion-control-optimization.png",
    href: "/blog/congestion-control-optimization/",
  },
  {
    title: "Sparse Attention Design with SkyLight",
    date: "Jan 29, 2026",
    image: "/automating-algorithm-discovery-a-case-study-on-spa.png",
    href: "/blog/automating-algorithm-discovery-a-case-study-on-spa/",
  },
  {
    title: "Multi-Cloud Data Transfer",
    date: "Jan 22, 2026",
    image: "/multi-cloud-data-transfer.png",
    href: "/blog/multi-cloud-data-transfer/",
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
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <p className="text-blue-300/80 text-sm md:text-base font-semibold tracking-[0.15em] uppercase mb-6">
              UC Berkeley Sky Computing Lab
            </p>

            <h1 className="text-[2rem] md:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.1]">
              AI-Driven Research
              <span className="text-berkeleyGold"> for Systems</span>
            </h1>

            <p className="mt-6 text-blue-200/70 text-base md:text-lg leading-relaxed max-w-lg">
              Harnessing AI to automatically discover, optimize, and evolve
              algorithms for real-world systems &mdash; from cloud
              infrastructure to LLM serving.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://arxiv.org/pdf/2510.06189"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white text-berkeleyBlue font-semibold text-sm hover:bg-gray-50 transition-all shadow-lg shadow-black/15 hover:shadow-xl hover:-translate-y-0.5 duration-200"
              >
                <SiArxiv className="text-base" /> Read the Paper
              </a>
              <Link href="/blog" className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.08] text-white font-medium text-sm border border-white/[0.15] hover:bg-white/[0.15] transition-all backdrop-blur-sm hover:-translate-y-0.5 duration-200">
                Explore Blog <FaArrowRight className="text-xs" />
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
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center p-5 rounded-2xl bg-gray-50/80 border border-gray-100">
                <div className="text-3xl md:text-[2.5rem] font-extrabold text-berkeleyBlue tracking-tight">
                  {value}
                </div>
                <div className="mt-2 text-sm text-gray-500 leading-snug">
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
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 md:p-8 shadow-sm">
                <img
                  src="/adrs-2.png"
                  alt="How AI is Upending Systems Research — 13x Faster, 35% Cost Reduction"
                  className="w-full rounded-lg"
                />
              </div>
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
                <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-medium text-berkeleyBlue hover:underline underline-offset-2">
                  Learn more about ADRS <FaArrowRight className="text-xs" />
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
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-berkeleyBlue hover:underline underline-offset-2">
              All posts <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className="group rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center p-8">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-300"
                  />
                </div>
                <div className="px-5 pb-5 pt-4">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-2">
                    {post.date}
                  </p>
                  <h3 className="text-[15px] font-semibold text-primary leading-snug line-clamp-2 group-hover:text-berkeleyBlue transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-berkeleyBlue hover:underline">
              All posts <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ GET INVOLVED ═══ */}
      <section className="bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
            Get Involved
          </h2>
          <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-md mx-auto">
            Join our community, contribute to benchmarks, or reach out to
            collaborate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:ucbskyadrs@gmail.com"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-berkeleyBlue text-white text-sm font-medium hover:bg-blue-800 transition-all shadow-md shadow-berkeleyBlue/20 hover:shadow-lg hover:-translate-y-0.5 duration-200"
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
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:border-berkeleyBlue hover:text-berkeleyBlue transition-all hover:shadow-md hover:-translate-y-0.5 duration-200"
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