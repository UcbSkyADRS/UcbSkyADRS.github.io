import { FaGithub, FaEnvelope, FaTwitter, FaLinkedin, /* FaDiscord, */ FaSlack } from "react-icons/fa";
import { SiArxiv } from "react-icons/si";
import SEO from "../components/SEO";

/* ── Team ── */
const team = [
  { name: "Team Member", role: "Principal Investigator" },
  { name: "Team Member", role: "PhD Student" },
  { name: "Team Member", role: "PhD Student" },
  { name: "Team Member", role: "PhD Student" },
  { name: "Team Member", role: "Research Scientist" },
  { name: "Team Member", role: "Collaborator" },
];

/* ── Contact ── */
const contacts = [
  {
    icon: FaEnvelope,
    label: "Email",
    detail: "ucbskyadrs@gmail.com",
    href: "mailto:ucbskyadrs@gmail.com",
  },
  {
    icon: FaSlack,
    label: "Slack",
    detail: "ADRS workspace",
    href: "https://join.slack.com/t/adrs-global/shared_invite/zt-3fgme22n5-PKYyAc9aIeTyX5iSQTKIoA",
  },
  // {
  //   icon: FaDiscord,
  //   label: "Discord",
  //   detail: "Join our server",
  //   href: "https://discord.gg/4z7Yy3e4",
  // },
  {
    icon: FaTwitter,
    label: "X / Twitter",
    detail: "@ai4research_ucb",
    href: "https://x.com/ai4research_ucb",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    detail: "UCB ADRS",
    href: "https://www.linkedin.com/company/ucb-adrs",
  },
];

const papers = [
  {
    title: "Barbarians at the Gate: How AI is Upending Systems Research",
    description:
      "Our position paper outlines ADRS as an exciting approach for AI-driven algorithm discovery, with case studies in a range of systems use cases, including multi-region cloud scheduling, MoE load balancing, and more.",
    image: "/barbarians.png",
    paperHref: "https://arxiv.org/pdf/2510.06189",
    codeHref: "https://github.com/lynnliu030/ADRS",
  },
  {
    title: "Let the Barbarians In: How AI Can Accelerate Systems Performance Research",
    description:
      "This paper expands our first ADRS paper across ten real-world systems research problems and outlines practical best practices for applying AI-driven research frameworks effectively.",
    image: "/adrs-2.png",
    paperHref: "https://arxiv.org/abs/2512.14806",
    codeHref: "https://github.com/lynnliu030/ADRS",
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="ADRS (AI-Driven Research for Systems) is a UC Berkeley Sky Computing Lab initiative exploring how AI can accelerate scientific discovery."
        url="/about"
      />

      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        {/* ── Header ── */}
        <header className="max-w-3xl mb-14">
          <h1 className="text-2xl md:text-[2rem] font-bold tracking-tight text-primary">
            About ADRS
          </h1>
          <p className="mt-4 text-gray-500 text-[15px] md:text-base leading-relaxed">
            ADRS (AI-Driven Research for Systems) is a{" "}
            <a href="https://sky.cs.berkeley.edu/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-berkeleyBlue transition-colors underline underline-offset-2 decoration-berkeleyBlue/30">
              UC Berkeley Sky Computing Lab
            </a>{" "}
            initiative exploring how AI can accelerate scientific discovery. We
            build systems that leverage large-scale models to automatically
            design, optimize, and reason about complex algorithms across
            cloud infrastructure, distributed AI, and more.
          </p>
        </header>

        {/* ── Paper ── */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-5">
            Our Papers
          </h2>
          <div className="space-y-5">
            {papers.map((paper) => (
              <div
                key={paper.title}
                className="rounded-2xl border border-gray-200 bg-gray-50/50 overflow-hidden shadow-sm"
              >
                <div className="md:flex md:items-center">
                  <div className="md:w-5/12 p-8 md:p-10 flex justify-center">
                    <img
                      src={paper.image}
                      alt={paper.title}
                      className="w-full max-w-xs object-contain"
                    />
                  </div>
                  <div className="md:w-7/12 p-8 md:p-10 md:pl-4">
                    <h3 className="text-base md:text-lg font-semibold text-primary leading-snug">
                      {paper.title}
                    </h3>
                    <p className="mt-3 text-gray-500 text-[15px] leading-relaxed">
                      {paper.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={paper.paperHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-berkeleyBlue hover:text-berkeleyBlue transition-all hover:shadow-sm"
                      >
                        <SiArxiv className="text-lg" /> arXiv
                      </a>
                      <a
                        href={paper.codeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-berkeleyBlue hover:text-berkeleyBlue transition-all hover:shadow-sm"
                      >
                        <FaGithub className="text-lg" /> Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Team ── */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2">
            Team
          </h2>
          <p className="text-[13px] text-gray-400 mb-7">
            The researchers behind ADRS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 border border-dashed border-gray-300 mb-3 flex items-center justify-center">
                  <span className="text-[10px] text-gray-400">Photo</span>
                </div>
                <div className="text-xs font-medium text-gray-400 italic">
                  {member.name}
                </div>
                <div className="text-[11px] text-gray-300 mt-0.5">{member.role}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-gray-400 italic">
            Placeholder &mdash; add team members&apos; names, photos, and links
          </p>
        </section>

        {/* ── Affiliations & Funding ── */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
                Affiliations
              </h2>
              <div className="flex flex-wrap gap-3">
                <a href="https://sky.cs.berkeley.edu/" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 font-medium hover:border-berkeleyBlue hover:text-berkeleyBlue transition-all hover:shadow-sm">
                  UC Berkeley Sky Computing Lab
                </a>
                <div className="px-5 py-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400 italic">
                  + Add affiliation
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-4">
                Funding &amp; Acknowledgements
              </h2>
              <div className="p-5 rounded-xl border border-dashed border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-400 italic leading-relaxed">
                  Add funding sources, grant numbers, and acknowledgement text here.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-5">
            Contact
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {contacts.map(({ icon: Icon, label, detail, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-berkeleyBlue flex items-center justify-center transition-colors">
                  <Icon className="text-base text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-primary">{label}</div>
                  <div className="text-xs text-gray-400 truncate">{detail}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
