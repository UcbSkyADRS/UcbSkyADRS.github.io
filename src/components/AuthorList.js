import AUTHOR_LINKS from "../lib/authorLinks";

/**
 * Render a single author entry.
 * Handles plain names like "Audrey Cheng" and parenthetical entries
 * like "Aditya Desai (SkyLight Team)" where both parts may have links.
 * @param {{ name: string, link?: boolean }}
 */
function AuthorEntry({ name, link = true }) {
  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
    className: "underline underline-offset-2 hover:text-berkeleyBlue transition-colors",
  };

  // Check for pattern like "Name (Team)"
  const parenMatch = name.match(/^(.+?)\s*\((.+?)\)$/);
  if (parenMatch) {
    const mainName = parenMatch[1].trim();
    const teamName = parenMatch[2].trim();
    return (
      <>
        {AUTHOR_LINKS[mainName] && link ? (
          <a href={AUTHOR_LINKS[mainName]} {...linkProps}>{mainName}</a>
        ) : (
          mainName
        )}
        {" ("}
        {AUTHOR_LINKS[teamName] && link ? (
          <a href={AUTHOR_LINKS[teamName]} {...linkProps}>{teamName}</a>
        ) : (
          teamName
        )}
        {")"}
      </>
    );
  }

  if (AUTHOR_LINKS[name] && link) {
    return (
      <a href={AUTHOR_LINKS[name]} {...linkProps}>
        {name}
      </a>
    );
  }

  return <>{name}</>;
}

/**
 * Renders a comma-separated author string as individually linked names.
 * @param {{ author: string, className?: string, link?: boolean }} props
 * @param {boolean} [link=true] - If false, render names as plain text (use when inside another <a>)
 */
export default function AuthorList({ author, className = "", link = true }) {
  if (!author) return null;

  const entries = author.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <span className={className}>
      {entries.map((entry, i) => {
        let separator = "";
        if (i < entries.length - 1) {
          const next = entries[i + 1];
          separator =
            i === entries.length - 2 && next === "ADRS Team"
              ? ", and the "
              : ", ";
        }
        return (
          <span key={i}>
            <AuthorEntry name={entry} link={link} />
            {separator}
          </span>
        );
      })}
    </span>
  );
}
