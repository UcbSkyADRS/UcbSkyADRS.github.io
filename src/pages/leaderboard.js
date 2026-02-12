import React, { useState, useMemo } from "react";
import SEO from "../components/SEO";

const PROBLEMS = [
  { name: "Cloudcast", link: "https://www.usenix.org/system/files/nsdi24-wooders.pdf" },
  { name: "EPLB", link: null },
  { name: "LLM-SQL", link: "https://arxiv.org/pdf/2403.05821" },
  { name: "MAS", link: "https://arxiv.org/pdf/2503.13657" },
  { name: "Prism", link: "https://arxiv.org/pdf/2505.04021" },
  { name: "Spot Multi-Reg", link: null },
  { name: "Spot Single-Reg", link: "https://www.usenix.org/system/files/nsdi24-wu-zhanghao.pdf" },
  { name: "Telemetry Repair", link: "https://dl.acm.org/doi/pdf/10.1145/3696348.3696874" },
  { name: "Txn Scheduling", link: "https://www.vldb.org/pvldb/vol17/p2694-cheng.pdf" },
];

const ROWS = [
  {
    model: "Human SOTA", org: "-", avg: 58.3,
    problems: [100.0, 45.8, 67.7, 33.7, 60.82, 54.47, 45.12, 50.6, 41.9],
    date: "2025-06-01", link: null,
  },
  {
    model: "GEPA", org: "ADRS Team", avg: 73.6,
    problems: [96.6, 70.2, 67.7, null, 87.37, 62.19, 51.44, 85.5, 67.7],
    date: "2025-12-06", link: "https://github.com/gepa-ai/gepa",
  },
  {
    model: "OpenEvolve", org: "ADRS Team", avg: 72.9,
    problems: [92.9, 62.0, 72.5, null, 87.39, 66.7, 42.51, 88.9, 70.0],
    date: "2025-12-06", link: "https://github.com/algorithmicsuperintelligence/openevolve",
  },
  {
    model: "ShinkaEvolve", org: "ADRS Team", avg: 69.8,
    problems: [72.0, 66.4, 68.5, null, 87.41, 63.65, 45.62, 86.5, 68.2],
    date: "2025-12-06", link: "https://github.com/SakanaAI/ShinkaEvolve",
  },
  {
    model: "AutoEvolve", org: "ADRS Team", avg: 75.9,
    problems: [97.8, 70.2, 76.4, null, 87.41, 69.98, 46.28, 88.9, 70.6],
    date: "2025-12-06", link: "https://github.com/mert-cemri/autoevolve",
  },
];

const HEADERS = [
  { key: "model", label: "Framework", align: "left" },
  { key: "org", label: "Contributor", align: "left" },
  { key: "avg", label: "Avg", align: "right" },
  ...PROBLEMS.map((p, i) => ({ key: `pb${i}`, label: p.name, align: "right", link: p.link })),
  { key: "date", label: "Date", align: "left" },
];

export default function Leaderboard() {
  const [sortField, setSortField] = useState("avg");
  const [sortDir, setSortDir] = useState("desc");

  const sorted = useMemo(() => {
    const human = ROWS.find((r) => r.model === "Human SOTA");
    const rest = ROWS.filter((r) => r.model !== "Human SOTA").slice().sort((a, b) => {
      let va, vb;
      if (sortField === "model") { va = a.model; vb = b.model; }
      else if (sortField === "org") { va = a.org; vb = b.org; }
      else if (sortField === "avg") { va = a.avg; vb = b.avg; }
      else if (sortField.startsWith("pb")) {
        const i = parseInt(sortField.substring(2));
        va = a.problems[i]; vb = b.problems[i];
      } else { va = a.date; vb = b.date; }
      if (va == null) return 1;
      if (vb == null) return -1;
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return human ? [human, ...rest] : rest;
  }, [sortField, sortDir]);

  const maxVals = useMemo(() => {
    const ma = Math.max(...ROWS.map((r) => r.avg));
    const mp = PROBLEMS.map((_, i) => Math.max(...ROWS.map((r) => r.problems[i] ?? -Infinity)));
    return { avg: ma, problems: mp };
  }, []);

  const doSort = (f) => {
    if (sortField === f) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(f); setSortDir("desc"); }
  };

  return (
    <>
      <SEO
        title="Leaderboard"
        description="Compare ADRS frameworks across 9 real-world systems problems. See which AI-driven approaches outperform human-engineered solutions."
        url="/leaderboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-[2rem] font-bold tracking-tight text-primary">
            Leaderboard
          </h1>
          <p className="mt-2 text-gray-400 text-[15px]">
            Scores averaged across <strong className="text-primary font-semibold">9 problems</strong>. Click any column header to sort.
          </p>
        </div>

        {/* Table */}
        <div className="mb-10 w-full overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-max w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                {HEADERS.map((h, hi) => (
                  <th
                    key={h.key}
                    onClick={() => doSort(h.key)}
                    className={`px-3 py-3.5 cursor-pointer whitespace-nowrap font-semibold text-gray-500 hover:text-primary hover:bg-gray-100/80 transition-colors select-none text-[13px] ${
                      h.align === "right" ? "text-right" : "text-left"
                    } ${hi === 0 ? "sticky left-0 z-20 bg-gray-50/80 pl-4" : ""}`}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {h.link ? (
                        <a href={h.link} target="_blank" rel="noopener noreferrer"
                          className="text-berkeleyBlue hover:underline underline-offset-2" onClick={(e) => e.stopPropagation()}>
                          {h.label}
                        </a>
                      ) : h.label}
                      {sortField === h.key && (
                        <span className="text-berkeleyBlue ml-0.5">
                          {sortDir === "asc" ? "\u2191" : "\u2193"}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, idx) => {
                const human = row.model === "Human SOTA";
                return (
                  <tr
                    key={row.model}
                    className={`border-b border-gray-100 transition-colors ${
                      human
                        ? "bg-amber-50/60 hover:bg-amber-100/50"
                        : idx % 2 === 0
                        ? "bg-white hover:bg-gray-50/60"
                        : "bg-gray-50/30 hover:bg-gray-50/60"
                    }`}
                  >
                    <td className={`py-3 px-3 pl-4 font-semibold sticky left-0 z-10 ${
                      human ? "bg-amber-50/60 border-l-[3px] border-l-berkeleyGold" : idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}>
                      {row.link ? (
                        <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-berkeleyBlue hover:underline underline-offset-2">
                          {row.model}
                        </a>
                      ) : (
                        <span className={human ? "text-amber-700" : "text-gray-500"}>{row.model}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-gray-500 whitespace-nowrap">{row.org}</td>
                    <td className={`py-3 px-3 text-right font-bold tabular-nums ${
                      row.avg === maxVals.avg ? "text-emerald-600" : "text-berkeleyBlue"
                    }`}>
                      {row.avg.toFixed(1)}
                    </td>
                    {row.problems.map((s, pi) => (
                      <td key={pi} className={`py-3 px-3 text-right tabular-nums ${
                        s != null && s === maxVals.problems[pi]
                          ? "text-emerald-600 font-semibold"
                          : "text-gray-600"
                      }`}>
                        {s != null ? s.toFixed(1) : <span className="text-gray-300">&mdash;</span>}
                      </td>
                    ))}
                    <td className="py-3 px-3 text-gray-400 text-xs whitespace-nowrap">{row.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6">
            <h3 className="text-sm font-semibold text-primary mb-2">Submit Results</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Have a new framework or updated results?{" "}
              <a href="https://github.com/UCB-ADRS/ADRS-Leaderboard" target="_blank" rel="noopener noreferrer"
                className="text-berkeleyBlue hover:underline underline-offset-2 font-medium">
                Submit via GitHub
              </a>.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200/80 bg-gray-50/50 p-6">
            <h3 className="text-sm font-semibold text-primary mb-2">Acknowledgements</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Thank you to the <a href="https://sky.cs.berkeley.edu/" target="_blank" rel="noopener noreferrer" className="text-berkeleyBlue hover:underline underline-offset-2 font-medium">UC Berkeley Sky Computing Lab</a>, our sponsors, and the ADRS community.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
