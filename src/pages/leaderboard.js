import React, { useState, useMemo } from "react";

const PROBLEMS = [
  { name: "Cloudcast", link: "https://www.usenix.org/system/files/nsdi24-wooders.pdf" },
  { name: "EPLB", link: null },
  { name: "LLM-SQL", link: "https://arxiv.org/pdf/2403.05821" },
  { name: "MAS", link: "https://arxiv.org/pdf/2503.13657" },
  { name: "Prism", link: "https://arxiv.org/pdf/2505.04021" },
  { name: "Spot Multi-Reg", link: null },
  { name: "Spot Single-Reg", link: "https://www.usenix.org/system/files/nsdi24-wu-zhanghao.pdf" },
  { name: "Telemetry Repair", link: "https://dl.acm.org/doi/pdf/10.1145/3696348.3696874" },
  { name: "Txn Scheduling", link: "https://www.vldb.org/pvldb/vol17/p2694-cheng.pdf" }
];

const DEMO_ROWS = [
  {
    model: "Human SOTA",
    org: "-",
    avg: 58.3,
    problems: [100.0, 45.8, 67.7, 33.7, 60.82, 54.47, 45.12, 50.6, 41.9],
    date: "2025-06-01",
    link: null
  },
  {
    model: "GEPA",
    org: "ADRS Team",
    avg: 73.6,
    problems: [96.6, 70.2, 67.7, null, 87.37, 62.19, 51.44, 85.5, 67.7],
    date: "2025-12-06",
    link: "https://github.com/gepa-ai/gepa"
  },
  {
    model: "OpenEvolve",
    org: "ADRS Team",
    avg: 72.9,
    problems: [92.9, 62.0, 72.5, null, 87.39, 66.70, 42.51, 88.9, 70.0],
    date: "2025-12-06",
    link: "https://github.com/algorithmicsuperintelligence/openevolve"
  },
  {
    model: "ShinkaEvolve",
    org: "ADRS Team",
    avg: 69.8,
    problems: [72.0, 66.4, 68.5, null, 87.41, 63.65, 45.62, 86.5, 68.2],
    date: "2025-12-06",
    link: "https://github.com/SakanaAI/ShinkaEvolve"
  },
  {
    model: "AutoEvolve",
    org: "ADRS Team",
    avg: 77.3,
    problems: [97.8, 70.2, 76.4, 50.0, 87.41, null, null, 88.9, 70.6],
    date: "2025-12-06",
    link: "https://github.com/mert-cemri/autoevolve"
  }
];

const HEADERS = [
  { key: "model", label: "ADRS Framework", align: "left", link: null },
  { key: "org", label: "Contributor", align: "left", link: null },
  { key: "avg", label: "Average", align: "right", link: null },
  ...PROBLEMS.map((p, i) => ({ key: `pb${i}`, label: p.name, align: "right", link: p.link })),
  { key: "date", label: "Date", align: "left", link: null }
];

const TYPE_UNITS = [
  { note: "", align: "left" },
  { note: "", align: "left" },
  { note: "% score", align: "right" },
  ...PROBLEMS.map(() => ({ note: "% score", align: "right" })),
  { note: "", align: "left" }
];

export default function Leaderboard() {
  const [sortField, setSortField] = useState("avg");
  const [sortDir, setSortDir] = useState("desc");

  const filteredRows = DEMO_ROWS;

  const sortedRows = useMemo(() => {
    // Keep Human SOTA pinned at top
    const humanSota = filteredRows.find(r => r.model === "Human SOTA");
    const otherRows = filteredRows.filter(r => r.model !== "Human SOTA");
    
    const sorted = otherRows.slice().sort((a, b) => {
      let valA, valB;
      if (sortField === "model") {
        valA = a.model;
        valB = b.model;
      } else if (sortField === "org") {
        valA = a.org;
        valB = b.org;
      } else if (sortField === "avg") {
        valA = a.avg;
        valB = b.avg;
      } else if (sortField.startsWith("pb")) {
        const idx = parseInt(sortField.substring(2));
        valA = a.problems[idx];
        valB = b.problems[idx];
      } else if (sortField === "date") {
        valA = a.date;
        valB = b.date;
      }
      if (typeof valA === "number" && typeof valB === "number") {
        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
      } else {
        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
      }
      return 0;
    });
    
    return humanSota ? [humanSota, ...sorted] : sorted;
  }, [sortField, sortDir, filteredRows]);

  // Calculate max values for each column (for highlighting)
  const maxValues = useMemo(() => {
    const maxAvg = Math.max(...filteredRows.map(r => r.avg));
    const maxProblems = PROBLEMS.map((_, i) => 
      Math.max(...filteredRows.map(r => r.problems[i] ?? -Infinity))
    );
    return { avg: maxAvg, problems: maxProblems };
  }, [filteredRows]);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  return (
    <div className="pb-8 origin-top-left" style={{ transform: 'scale(0.85)', width: '117.6%' }}>
      {/* Header - compact and clean */}
      <div className="w-full bg-gradient-to-r from-berkeleyBlue to-blue-800 text-white py-4 md:py-5 mb-6 rounded-lg shadow-sm">
        <div className="flex flex-col items-center mt-8">
          <div className="flex items-center gap-3">
            <img
              src="/ADRS.png"
              alt="ADRS Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-contain bg-white p-1"
            />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              ADRS Leaderboard
            </h1>
          </div>
          <p className="text-base md:text-lg opacity-90 mt-1">
            Scores averaged across <b>9 problems</b>
          </p>
        </div>
      </div>

      {/* Table section */}
      <section className="w-full mb-8">
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-max border-collapse text-sm md:text-base">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                {HEADERS.map((h, hi) => (
                  <th
                    key={h.key}
                    className={`px-3 py-3 cursor-pointer whitespace-nowrap font-semibold text-gray-700 hover:bg-gray-100 transition-colors ${h.align === "right" ? "text-right" : "text-left"} ${hi === 0 ? "sticky left-0 z-20 bg-gray-50" : ""}`}
                    onClick={() => handleSort(h.key)}
                  >
                    <span className="inline-flex items-center gap-1">
                      {h.link ? (
                        <a href={h.link} target="_blank" rel="noopener noreferrer" className="text-berkeleyBlue hover:underline" onClick={(e) => e.stopPropagation()}>
                          {h.label}
                        </a>
                      ) : (
                        h.label
                      )}
                      {sortField === h.key && (
                        <span className="text-berkeleyBlue">{sortDir === "asc" ? "↑" : "↓"}</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
              {/* Units row */}
              <tr className="bg-gray-50 border-b border-gray-200">
                {TYPE_UNITS.map((u, ui) => (
                  <td
                    key={ui}
                    className={`px-3 py-1 text-sm text-gray-500 whitespace-nowrap ${ui < 2 || ui === HEADERS.length - 1 ? "text-left" : "text-right"} ${ui === 0 ? "sticky left-0 z-20 bg-gray-50" : ""}`}
                    style={{ minWidth: ui >= 2 && ui < HEADERS.length - 1 ? 70 : undefined }}
                  >
                    {typeof u === "string" ? u : u.note}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, idx) => {
                return (
                <tr
                  key={`${row.model}-${row.date}`}
                  className={`
                    border-b border-gray-100 transition-colors
                    ${idx === 0 ? "bg-amber-50 hover:bg-amber-100" : idx % 2 === 1 ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-50"}
                  `}
                >
                  <td className={`py-3 px-3 text-left font-semibold text-gray-900 sticky left-0 z-10 ${idx === 0 ? "bg-amber-50" : idx % 2 === 1 ? "bg-gray-100" : "bg-white"}`}>
                    {row.link ? (
                      <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-berkeleyBlue hover:underline">
                        {row.model}
                      </a>
                    ) : (
                      <span className="text-gray-600">{row.model}</span>
                    )}
                  </td>
                  <td className={`py-3 px-3 text-gray-600 whitespace-nowrap ${row.org === "-" ? "text-center" : "text-left"}`} style={{ minWidth: 100 }}>{row.org}</td>
                  <td className={`py-3 px-3 text-right font-bold ${row.avg === maxValues.avg ? 'text-emerald-600 font-bold' : 'text-berkeleyBlue'}`}>{row.avg.toFixed(1)}</td>
                  {row.problems.map((score, pi) => (
                    <td
                      key={pi}
                      className={`py-3 px-3 text-right tabular-nums ${score !== null && score === maxValues.problems[pi] ? 'text-emerald-600 font-bold' : 'text-gray-700'}`}
                    >
                      {score !== null ? score.toFixed(1) : <span className="text-gray-300">-</span>}
                    </td>
                  ))}
                  <td className="py-3 px-3 text-left text-gray-400 text-sm whitespace-nowrap" style={{ minWidth: 100 }}>{row.date}</td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom sections - side by side on desktop */}
      <section className="w-full grid md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Submit Results!</h2>
          <p className="text-base text-gray-600">
            Have a new ADRS framework or updated results? Add submissions here:{" "}
            <a href="https://github.com/UcbSkyADRS/ADRS-Leaderboard" target="_blank" rel="noopener noreferrer" className="text-berkeleyBlue hover:underline font-medium">
              github.com/UcbSkyADRS/ADRS-Leaderboard
            </a>.
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Acknowledgements</h2>
          <p className="text-base text-gray-600">
            Thank you to the Berkeley Sky Computing Lab, our lab sponsors, and the ADRS community for supporting this project.
          </p>
        </div>
      </section>
    </div>
  );
}
