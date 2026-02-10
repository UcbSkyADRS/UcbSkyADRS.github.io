import Link from "next/link";
import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaSlack,
  FaEnvelope,
} from "react-icons/fa";
import { SiArxiv } from "react-icons/si";

const socials = [
  { icon: FaEnvelope, href: "mailto:ucbskyadrs@gmail.com", label: "Email" },
  { icon: FaTwitter, href: "https://x.com/ai4research_ucb", label: "X" },
  { icon: FaGithub, href: "https://github.com/UCB-ADRS/ADRS", label: "GitHub" },
  { icon: FaDiscord, href: "https://discord.gg/4z7Yy3e4", label: "Discord" },
  {
    icon: FaSlack,
    href: "https://join.slack.com/t/adrs-global/shared_invite/zt-3fgme22n5-PKYyAc9aIeTyX5iSQTKIoA",
    label: "Slack",
  },
  { icon: SiArxiv, href: "https://arxiv.org/pdf/2510.06189", label: "arXiv" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-9 overflow-hidden rounded-lg bg-white/10 flex-shrink-0">
                <img
                  src="/ADRS.png"
                  alt="ADRS"
                  className="w-full scale-[1.5] origin-top object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">ADRS</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              AI-Driven Research for Systems. A UC Berkeley Sky Computing Lab
              initiative harnessing AI to discover and optimize algorithms for
              real-world systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Navigate
            </h4>
            <ul className="space-y-1.5">
              {[
                { href: "/", label: "Home" },
                { href: "/blog", label: "Blog" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/about", label: "About" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <a className="text-gray-400 hover:text-white text-sm transition-colors">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-md bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors"
                >
                  <Icon className="text-sm text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} UC Berkeley Sky Computing Lab
          </p>
          <p>
            Built with Next.js &middot; Deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
