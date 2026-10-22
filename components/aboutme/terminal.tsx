// Decorative deploy log shown beside the home hero; hidden from assistive tech.
export default function Terminal() {
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden rounded-xl border border-[var(--divider)] bg-[var(--terminal-bg)] font-[family-name:var(--font-mono)] text-[12px] leading-[1.9] shadow-2xl"
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--divider)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--bg3)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--bg3)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--bg3)]" />
        <span className="ml-3 text-[11px] text-[var(--text-dim)]">~/infra</span>
      </div>
      <div className="overflow-x-auto px-4 py-4 text-[var(--text3)]">
        <p className="m-0 whitespace-nowrap"><span className="text-[var(--accent)]">$</span> terraform plan</p>
        <p className="m-0 whitespace-nowrap pl-3"><span className="text-[var(--success)]">+</span> cloudflare_r2_bucket.assets</p>
        <p className="m-0 whitespace-nowrap pl-3"><span className="text-[var(--warning)]">~</span> cloudflare_workers_script.api</p>
        <p className="m-0 whitespace-nowrap text-[var(--text-muted)]">Plan: 1 to add, 1 to change, 0 to destroy.</p>
        <p className="m-0 mt-2 whitespace-nowrap"><span className="text-[var(--accent)]">$</span> gh workflow run deploy.yml</p>
        <p className="m-0 whitespace-nowrap">
          <span className="text-[var(--success)]">✓</span> build{"  "}
          <span className="text-[var(--success)]">✓</span> test{"  "}
          <span className="text-[var(--success)]">✓</span> deploy
        </p>
        <p className="m-0 mt-2 whitespace-nowrap"><span className="text-[var(--accent)]">$</span> datadog monitors status</p>
        <p className="m-0 whitespace-nowrap"><span className="text-[var(--success)]">●</span> all systems operational<span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-[var(--text3)]" /></p>
      </div>
    </div>
  );
}
