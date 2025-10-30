import { FaGithub } from "react-icons/fa";
import { SiArxiv } from "react-icons/si";

export default function About() {
  return (
    <section className="space-y-3">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-berkeleyBlue">About</h1>
        <p className="text-xl md:text-2xl text-primary/80"></p>
      </header>

      <div className="w-full flex flex-col items-center md:flex-row md:items-center md:gap-6">
        <figure className="flex justify-center md:justify-start w-full md:w-auto">
          <img src="/ADRS.png" alt="ADRS Logo" className="w-64 h-64 md:w-96 md:h-96 object-contain" />
        </figure>
        <div className="text-lg md:text-xl leading-8 text-primary/90 max-w-3xl text-center md:text-left">
          <p>
            ADRS (AI-Driven Research Systems) is a Berkeley Sky Computing Lab initiative exploring how AI can accelerate scientific discovery itself. We develop systems that leverage large-scale models to automatically design, optimize, and reason about complex algorithms, across cloud infrastructure, distributed AI, and large-scale computing. Our vision is to make research faster, more autonomous, and fundamentally more creative.
          </p>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-berkeleyBlue">Read Our Paper</h2>
        <div className="md:flex md:items-center md:gap-6">
          <figure className="flex justify-center md:justify-start w-full md:w-5/12 mb-3 md:mb-0">
            <img src="/evolve-sys.png" alt="ADRS Evolution Overview" className="w-full h-60 md:h-72 object-contain" />
          </figure>
          <div className="md:w-7/12 text-primary/90 text-lg md:text-xl leading-8">
            <p>
              Our initial position paper, <em>“Barbarians at the Gate: How AI is Upending Systems Research”</em>,
              outlines ADRS as a practical framework for AI-driven algorithm discovery in systems, with
              case studies like multi-region cloud scheduling and MoE load balancing.
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="https://arxiv.org/pdf/2510.06189"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-berkeleyBlue/30 bg-white hover:border-berkeleyBlue px-3 py-2"
                aria-label="View the ADRS paper on arXiv"
              >
                <span className="text-berkeleyBlue text-2xl"><SiArxiv /></span>
                <div className="leading-tight">
                  <div className="text-berkeleyBlue font-semibold text-sm md:text-base">arXiv</div>
                  <div className="text-primary/70 text-xs">Read the position paper (PDF)</div>
                </div>
              </a>
              <a
                href="https://github.com/lynnliu030/ADRS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-berkeleyBlue/30 bg-white hover:border-berkeleyBlue px-3 py-2"
                aria-label="Open ADRS on GitHub"
              >
                <span className="text-berkeleyBlue text-2xl"><FaGithub /></span>
                <div className="leading-tight">
                  <div className="text-berkeleyBlue font-semibold text-sm md:text-base">GitHub</div>
                  <div className="text-primary/70 text-xs">ADRS Code</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-berkeleyBlue">Contact us</h2>
        <ul className="list-disc pl-6 text-primary/90 text-lg md:text-xl">
          <li>
            Email us at <a className="text-accent underline" href="mailto:ucbskyadrs@gmail.com">ucbskyadrs@gmail.com</a>.
          </li>
          <li>
            Join us on <a className="text-accent underline" href="https://join.slack.com/t/adrs-global/shared_invite/zt-3fgme22n5-PKYyAc9aIeTyX5iSQTKIoA" target="_blank" rel="noopener noreferrer">Slack</a> and <a className="text-accent underline" href="https://discord.gg/4z7Yy3e4" target="_blank" rel="noopener noreferrer">Discord</a>.
          </li>
          <li>
            Follow us on <a className="text-accent underline" href="https://x.com/ai4research_ucb" target="_blank" rel="noopener noreferrer">X</a>.
          </li>
        </ul>
      </section>
    </section>
  );
}


