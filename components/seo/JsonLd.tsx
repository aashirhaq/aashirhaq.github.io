import { education } from "@/content/credentials";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    jobTitle: profile.positioning,
    description: site.description,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressRegion: "IL", addressCountry: "US" },
    worksFor: { "@type": "Organization", name: "Stats AI" },
    alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    knowsAbout: [
      "Backend engineering",
      "Distributed systems",
      "Payment systems",
      "Elasticsearch",
      "Natural language processing",
      "Retrieval-augmented generation",
      "Large language models",
      "AWS",
    ],
    sameAs: profile.contact.filter((c) => c.kind !== "email").map((c) => c.href),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values are static, trusted content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
