import Link from "next/link";
import { FaDiscord, FaEnvelope, FaGithub, FaTwitter, FaSlack, FaRss } from "react-icons/fa";

export default function Nav() {
  return (
    <div className="navbar fixed w-full flex md:flex-col px-4 md:px-6 py-4 md:py-8 md:pb-10 z-30 bg-gradient-to-b from-sidebarTintStart to-sidebarTintEnd text-primary md:h-full items-center justify-between md:static md:w-auto md:max-h-screen md:justify-between">
      <div>
        <Link href="/">
          <p className="text-5xl md:text-7xl cursor-pointer font-extrabold tracking-tight text-berkeleyBlue">ADRS</p>
        </Link>
        <div className="md:flex md:flex-col gap-5 hidden mt-6 md:mt-10">
          <Link href="/blog">
            <a className="text-2xl md:text-3xl font-semibold leading-none opacity-90 hover:opacity-100">Blog</a>
          </Link>
          <Link href="/about">
            <a className="text-2xl md:text-3xl font-semibold leading-none opacity-90 hover:opacity-100">About</a>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4 text-2xl">
        <a href="mailto:ucbskyadrs@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"><FaEnvelope /></a>
        <a href="https://x.com/ai4research_ucb" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
        <a href="https://discord.gg/4z7Yy3e4" target="_blank" rel="noopener noreferrer" aria-label="Discord"><FaDiscord /></a>
        <a href="https://join.slack.com/t/adrs-global/shared_invite/zt-3fgme22n5-PKYyAc9aIeTyX5iSQTKIoA" target="_blank" rel="noopener noreferrer" aria-label="Slack"><FaSlack /></a>
        <a href="https://github.com/UCB-ADRS/ADRS" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
      </div>
    </div>
  );
}


