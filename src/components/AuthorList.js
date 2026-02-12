import AUTHOR_LINKS from "../lib/authorLinks";

/**
 * Render a single author entry.
 * Handles plain names like "Audrey Cheng" and parenthetical entries
 * like "Aditya Desai (SkyLight Team)" where both parts may have links.
 */
function AuthorEntry({ name }) {
  // Check for pattern like "Name (Team)"
  const parenMatch = name.match(/^(.+?)\s*\((.+?)\)$/);
  if (parenMatch) {
    const mainName = parenMatch[1].trim();
    const teamName = parenMatch[2].trim();
    return (
      <>
        {AUTHOR_LINKS[mainName] ? (
          <a
            href={AUTHOR_LINKS[mainName]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-berkeleyBlue transition-colors"
          >
            {mainName}
          </a>
        ) : (
          mainName
        )}
        {" ("}
        {AUTHOR_LINKS[teamName] ? (
          <a
            href={AUTHOR_LINKS[teamName]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-berkeleyBlue transition-colors"
          >
            {teamName}
          </a>
        ) : (
          teamName
        )}
        {")"}
      </>
    );
  }

  // Simple name lookup
  if (AUTHOR_LINKS[name]) {
    return (
      <a
        href={AUTHOR_LINKS[name]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-berkeleyBlue transition-colors"
      >
        {name}
      </a>
    );
  }

  return <>{name}</>;
}

/**
 * Renders a comma-separated author string as individually linked names.
 * @param {{ author: string, className?: string }} props
 */
export default function AuthorList({ author, className = "" }) {
  if (!author) return null;

  const entries = author.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <span className={className}>
      {entries.map((entry, i) => {
        let separator = "";
        if (i < entries.length - 1) {
          // Use ", and the " before the final "ADRS Team" entry
          const next = entries[i + 1];
          separator =
            i === entries.length - 2 && next === "ADRS Team"
              ? ", and the "
              : ", ";
        }
        return (
          <span key={i}>
            <AuthorEntry name={entry} />
            {separator}
          </span>
        );
      })}
    </span>
  );
}
