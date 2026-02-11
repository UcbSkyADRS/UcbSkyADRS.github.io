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

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-berkeleyBlue to-[#001a3d]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main content */}
        <div className="py-12 grid md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16 items-start">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 flex-shrink-0 rounded-md overflow-hidden bg-white/10 p-0.5">
                <img
                  src="/ADRS.png"
                  alt="ADRS"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">ADRS</span>
            </div>
            <p className="text-[13px] text-blue-200/50 leading-relaxed">
              AI-Driven Research for Systems. A{" "}
              <a href="https://sky.cs.berkeley.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-200/70 hover:text-white transition-colors">
                UC Berkeley Sky Computing Lab
              </a>{" "}
              initiative harnessing AI to discover and optimize algorithms for
              real-world systems.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-berkeleyGold/50 mb-3">
              Navigate
            </h4>
            <ul className="space-y-1.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[13px] text-blue-100/50 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-berkeleyGold/50 mb-3">
              Connect
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.07] hover:bg-berkeleyGold/20 flex items-center justify-center transition-all duration-200 group"
                >
                  <Icon className="text-sm text-blue-200/50 group-hover:text-berkeleyGold transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + bottom */}
        <div className="border-t border-white/[0.08] py-5 flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <p className="text-[11px] text-blue-200/30">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://sky.cs.berkeley.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200/50 transition-colors">
              UC Berkeley Sky Computing Lab
            </a>
          </p>
          <p className="text-[11px] text-blue-200/20">
            Built with Next.js &middot; Deployed on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
