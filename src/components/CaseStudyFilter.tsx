import { useMemo, useState } from 'react';

interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  summary: string;
  results: { value: string; label: string }[];
}

interface Props {
  caseStudies: CaseStudy[];
}

const ALL = 'All';

export default function CaseStudyFilter({ caseStudies }: Props) {
  const services = useMemo(
    () => [ALL, ...Array.from(new Set(caseStudies.flatMap((c) => c.services)))],
    [caseStudies]
  );
  const [active, setActive] = useState(ALL);

  const filtered =
    active === ALL ? caseStudies : caseStudies.filter((c) => c.services.includes(active));

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {services.map((service) => (
          <button
            key={service}
            type="button"
            onClick={() => setActive(service)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === service
                ? 'border-transparent bg-ink text-paper dark:bg-paper dark:text-ink'
                : 'border-ink/15 text-ink/70 hover:border-ink/30 dark:border-paper/20 dark:text-paper/70 dark:hover:border-paper/40'
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {filtered.map((study) => (
          <a
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group rounded-3xl border border-ink/10 p-8 transition-colors hover:border-brand-400/50 hover:bg-brand-50 dark:border-paper/10 dark:hover:bg-brand-900/20"
          >
            <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-300">
              {study.industry}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">{study.client}</h3>
            <p className="mt-3 text-sm text-ink/60 dark:text-paper/60">{study.summary}</p>
            <div className="mt-6 flex gap-6">
              {study.results.slice(0, 2).map((result) => (
                <div key={result.label}>
                  <p className="font-display text-lg font-bold text-brand-500">{result.value}</p>
                  <p className="text-xs text-ink/50 dark:text-paper/50">{result.label}</p>
                </div>
              ))}
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-ink/50 dark:text-paper/50">
          No case studies for this service yet.
        </p>
      )}
    </div>
  );
}
