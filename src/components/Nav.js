import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/about", label: "About" },
];

const socials = [
  { icon: FaTwitter, href: "https://x.com/ai4research_ucb", label: "X" },
  { icon: FaGithub, href: "https://github.com/UCB-ADRS/ADRS", label: "GitHub" },
  { icon: FaDiscord, href: "https://discord.gg/4z7Yy3e4", label: "Discord" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function isActive(href) {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm shadow-black/[0.02]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo — show the airplane portion prominently */}
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="w-14 h-11 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src="/ADRS.png"
                  alt="ADRS"
                  className="w-full scale-[1.6] origin-top object-contain"
                />
              </div>
              <span className="text-[22px] font-bold tracking-tight text-berkeleyBlue group-hover:text-berkeleyGold transition-colors">
                ADRS
              </span>
            </a>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a
                  className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-colors ${
                    isActive(href)
                      ? "bg-berkeleyBlue/[0.07] text-berkeleyBlue"
                      : "text-gray-500 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {label}
                </a>
              </Link>
            ))}
          </div>

          {/* Desktop social icons */}
          <div className="hidden md:flex items-center gap-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg text-gray-400 hover:text-berkeleyBlue hover:bg-gray-50 flex items-center justify-center transition-colors"
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-[2px] bg-gray-600 transition-all duration-200 ${
                open ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-gray-600 transition-all duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-gray-600 transition-all duration-200 ${
                open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
          <div className="px-6 py-3 space-y-0.5">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${
                    isActive(href)
                      ? "bg-berkeleyBlue/[0.07] text-berkeleyBlue"
                      : "text-gray-500 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {label}
                </a>
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-100">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg text-gray-400 hover:text-berkeleyBlue hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
