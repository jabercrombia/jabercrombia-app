import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatUTCToMonthDayYear } from "@jabercrombia/date-utility";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MediumArticle } from "@/lib/medium";

type ArticleCardProps = {
  article: MediumArticle;
  readLabel: string;
  layout?: "stacked" | "row";
  priority?: boolean;
};

export default function ArticleCard({ article, readLabel, layout = "stacked", priority = false }: ArticleCardProps) {
  const isRow = layout === "row";

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${article.title} (${readLabel})`}
      className="group block h-full rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
    >
      <Card
        className={cn(
          "h-full overflow-hidden rounded-xl border-[var(--divider)] bg-[var(--bg2)] shadow-none transition-colors group-hover:border-[var(--accent-soft)]",
          isRow ? "flex flex-col md:flex-row" : "flex flex-col"
        )}
      >
        {article.image && (
          <div
            className={cn(
              "relative shrink-0 overflow-hidden bg-[var(--bg3)]",
              isRow ? "aspect-[16/9] md:aspect-auto md:w-72" : "aspect-[16/9]"
            )}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority={priority}
              sizes={isRow ? "(min-width: 728px) 288px, 100vw" : "(min-width: 984px) 360px, (min-width: 728px) 50vw, 100vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <time
            dateTime={article.date}
            className="mb-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[var(--text-muted)]"
          >
            {formatUTCToMonthDayYear(article.date)}
          </time>

          <h3 className="mb-3 text-[17px] font-medium leading-snug text-[var(--text-bright)] transition-colors group-hover:text-[var(--accent)]">
            {article.title}
          </h3>

          {isRow && article.excerpt && (
            <p className="mb-4 text-[13.5px] leading-relaxed text-[var(--text3)]">{article.excerpt}</p>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            {article.tags.slice(0, isRow ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-[var(--divider)] bg-[var(--bg3)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10.5px] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] text-[var(--accent)]">
              {readLabel}
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Card>
    </a>
  );
}
