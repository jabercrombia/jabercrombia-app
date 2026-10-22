const stageTools = [
  ["Terraform", "Git"],
  ["Docker", "GitHub Actions"],
  ["Playwright", "Cypress"],
  ["Vercel", "Cloudflare", "AWS"],
  ["Datadog", "Grafana"],
];

type PipelineProps = {
  stages: { name: string; body: string }[];
};

export default function Pipeline({ stages }: PipelineProps) {
  return (
    <ol className="relative m-0 grid list-none grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--divider)] bg-[var(--divider)] p-0 sm:grid-cols-2 lg:grid-cols-5">
      {stages.map((stage, index) => (
        <li key={stage.name} className="flex flex-col bg-[var(--bg2)] p-5" style={{ listStyleType: "none" }}>
          <div className="mb-4 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-muted)]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--success)]" aria-hidden="true" />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-[var(--divider)]" aria-hidden="true" />
          </div>
          <h3 className="mb-2 font-[family-name:var(--font-syne)] text-lg font-semibold text-[var(--text-bright)]">
            {stage.name}
          </h3>
          <p className="mb-4 text-[13px] leading-relaxed text-[var(--text3)]">{stage.body}</p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {stageTools[index]?.map((tool) => (
              <span
                key={tool}
                className="rounded bg-[var(--accent-faint)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10.5px] text-[var(--accent)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
