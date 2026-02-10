import Head from "next/head";

const SITE_URL = "https://ucbskyadrs.github.io";
const SITE_NAME = "ADRS — AI-Driven Research for Systems";
const DEFAULT_DESCRIPTION =
  "ADRS is a UC Berkeley Sky Computing Lab initiative that uses AI to automatically discover, optimize, and evolve algorithms for real-world systems — from cloud infrastructure to LLM serving.";
const DEFAULT_IMAGE = `${SITE_URL}/ADRS.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL;

  // JSON-LD: Organization
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: "ADRS — AI-Driven Research for Systems",
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    description: DEFAULT_DESCRIPTION,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "University of California, Berkeley",
      url: "https://www.berkeley.edu",
    },
    sameAs: [
      "https://x.com/ai4research_ucb",
      "https://github.com/UCB-ADRS/ADRS",
      "https://discord.gg/4z7Yy3e4",
    ],
  };

  // JSON-LD: WebSite with search
  const siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <Head>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="ADRS, AI-Driven Research, Systems Research, UC Berkeley, Sky Computing Lab, algorithm discovery, LLM serving, cloud scheduling, GPU optimization"
      />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ai4research_ucb" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
    </Head>
  );
}
