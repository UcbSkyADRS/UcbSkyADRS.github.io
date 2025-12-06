import React, { useState, useMemo } from "react";

const PROBLEMS = [
  "Telemetry Repair",
  "Weight Comp",
  "Cloudcast",
  "EPLB",
  "Prism",
  "LLM-SQL",
  "Txn Sched",
  "Spot Single-Reg",
  "Spot Multi-Reg",
  "MAS"
];

const DEMO_ROWS = [
  {
    model: "Human SOTA",
    org: "-",
    avg: 91.2,
    problems: [98, 94, 91, 88, 96, 90, 92, 87, 95, 85],
    date: "2025-06-01"
  },
  {
    model: "OpenEvolve",
    org: "Berkeley",
    avg: 80.1,
    problems: [82, 76, 81, 75, 88, 78, 83, 74, 82, 74],
    date: "2025-09-12"
  }
];

const HEADERS = [
  { key: "model", label: "Scaffold", align: "left" },
  { key: "org", label: "Org", align: "left" },
  { key: "avg", label: "Average", align: "right" },
  ...PROBLEMS.map((label, i) => ({ key: `pb${i}`, label, align: "right" })),
  { key: "date", label: "Date", align: "left" }
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
    return filteredRows.slice().sort((a, b) => {
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
  }, [sortField, sortDir, filteredRows]);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(d => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  return (
    <div>
      {/* Header - truly edge-to-edge */}
      <div className="w-full bg-berkeleyBlue text-white py-8 md:py-10 mb-0" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}>
        <div className="flex flex-col items-center gap-1">
          <div className="header-logo-container flex flex-col items-center gap-2 mb-3">
            <img
              src="/ADRS.png"
              alt="ADRS Logo"
              className="header-logo-small w-24 h-24 md:w-28 md:h-28 rounded-xl object-contain shadow-lg border-2 border-yellow-400 bg-white"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow-xl text-center" style={{ color: "#FFF7EC" }}>
            ADRS Leaderboard
          </h1>
          <p className="text-lg md:text-2xl font-medium opacity-95 mb-0 text-center" style={{ color: "#fffbf5" }}>
            Scores below are averaged across <b>10 problems</b> <span className="font-mono">(4,218 traces)</span>.
          </p>
        </div>
      </div>
      {/* Table section - larger bounding box and padding */}
      <section className="flex justify-center mt-0 mb-8 bg-transparent border-0">
        <div className="w-full max-w-[96vw] md:max-w-8xl overflow-x-auto px-3 md:px-10">
          <div className="rounded-3xl shadow-xl bg-white dark:bg-gray-900 mx-auto py-8 px-2 md:px-12 border border-blue-100/60 dark:border-yellow-300/40">
            <table className="min-w-full table-auto rounded-2xl overflow-hidden" style={{ fontSize: "1.08rem" }}>
              <thead>
                <tr className="bg-blue-50 dark:bg-yellow-800/30 text-berkeleyBlue dark:text-yellow-100 text-base md:text-lg">
                  {HEADERS.map((h, hi) => (
                    <th
                      key={h.key}
                      className={`sortable px-4 py-3 cursor-pointer whitespace-nowrap border-0 tracking-wide font-bold text-berkeleyBlue dark:text-yellow-100 ${h.align === "right" ? "text-right" : h.align === "center" ? "text-center" : "text-left"}`}
                      onClick={() => handleSort(h.key)}
                      style={{ minWidth: hi === 0 ? 110 : 94, background: "transparent" }}
                    >
                      {h.label}
                      {sortField === h.key && (
                        <span className="ml-1 text-blue-700 dark:text-yellow-200 text-sm">{sortDir === "asc" ? "▲" : "▼"}</span>
                      )}
                    </th>
                  ))}
                </tr>
                {/* Under-header row: units (bigger, not bold) */}
                <tr className="bg-transparent border-b border-blue-100 dark:border-yellow-300/50 text-berkeleyBlue dark:text-yellow-100 text-md md:text-lg font-normal">
                  {TYPE_UNITS.map((u, ui) => (
                    <td
                      key={ui}
                      className={`px-4 py-1 ${ui < 2 || ui === HEADERS.length - 1 ? "text-left" : "text-right"}`}
                      style={{minWidth: ui === 0 ? 110 : 94, border: "none", fontSize: "1em", whiteSpace: "nowrap"}}
                    >
                      {typeof u === "string" ? u : u.note}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((row, idx) => (
                  <tr
                    key={`${row.model}-${row.date}`}
                    className={
                      idx === 0
                        ? "bg-yellow-50 dark:bg-yellow-900/20"
                        : "bg-white dark:bg-gray-900"
                    }
                    style={{ fontSize: "1.13rem" }}
                  >
                    <td className="py-3 px-4 text-left font-bold text-lg text-berkeleyBlue dark:text-yellow-100 border-0">{row.model}</td>
                    <td className="py-3 px-4 text-left text-lg font-normal text-berkeleyBlue dark:text-yellow-100 border-0">{row.org}</td>
                    <td className="py-3 px-4 text-right text-xl font-black text-blue-900 dark:text-yellow-200 tracking-wide border-0">{row.avg.toFixed(1)}</td>
                    {row.problems.map((score, pi) => (
                      <td
                        key={pi}
                        className="py-3 px-4 text-right text-lg font-bold text-blue-800 dark:text-yellow-100 border-0"
                      >
                        {score}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-left text-md text-gray-400 dark:text-yellow-200 border-0">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Submission and Acknowledgement sections */}
      <section className="w-full flex flex-col items-center gap-7 pb-12">
        <div className="w-full max-w-2xl rounded-xl bg-blue-50 dark:bg-yellow-900/10 border border-blue-200 dark:border-yellow-400/30 shadow p-6 md:p-8 mt-2 mb-2">
          <h2 className="text-xl md:text-2xl font-semibold text-berkeleyBlue dark:text-yellow-200 mb-3">Submission</h2>
          <p className="text-base md:text-lg text-blue-900 dark:text-yellow-100">
            Do you have a new system or updated results?<br className="hidden md:inline" />
            Please email your results and details to <a href="mailto:ucbskyadrs@gmail.com" className="text-blue-700 dark:text-yellow-200 underline font-medium">ucbskyadrs@gmail.com</a> for leaderboard inclusion. We welcome external submissions!
          </p>
        </div>
        <div className="w-full max-w-2xl rounded-xl bg-blue-50 dark:bg-yellow-900/10 border border-blue-200 dark:border-yellow-400/30 shadow p-6 md:p-8 mt-2">
          <h2 className="text-xl md:text-2xl font-semibold text-berkeleyBlue dark:text-yellow-200 mb-3">Acknowledgement</h2>
          <p className="text-base md:text-lg text-blue-900 dark:text-yellow-100">
            Special thanks to the Berkeley Sky Computing Lab, project sponsors, and the ADRS community for their support.
          </p>
        </div>
      </section>
    </div>
  );
}
