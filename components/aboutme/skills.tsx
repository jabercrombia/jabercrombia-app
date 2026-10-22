const skillGroups = [
  {
    category: "Infrastructure & Cloud",
    items: ["AWS", "Cloudflare Workers / R2", "Terraform", "Docker", "Vercel"],
  },
  {
    category: "CI/CD & Automation",
    items: ["GitHub Actions", "CI/CD Pipelines", "Git", "Playwright", "Cypress", "Selenium"],
  },
  {
    category: "Observability",
    items: ["Datadog", "Grafana", "Prometheus", "Logging & Alerting"],
  },
  {
    category: "Application",
    items: ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "PostgreSQL"],
  },
];

export default function Skills() {
  return (
    <div className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--divider)] bg-[var(--divider)] lg:grid-cols-4">
      {skillGroups.map((group) => (
        <div className="bg-[var(--bg2)] p-6" key={group.category}>
          <h3 className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--accent)]">{group.category}</h3>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {group.items.map((skill) => (
              <li key={skill} className="text-[12.5px] text-[var(--primary-color)]" style={{ listStyleType: "none" }}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
