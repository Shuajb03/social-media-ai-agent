import Link from "next/link";
import { JournalPost } from "@/lib/types";
import { ProductVisual } from "@/components/ProductVisual";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductVisual
          pattern={post.pattern}
          tone={post.tone}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-widest-plus text-gold-deep">
        {post.category}
      </p>
      <h3 className="mt-2 font-display text-xl leading-tight text-ink">{post.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{post.excerpt}</p>
      <p className="mt-3 text-xs text-ink/40">{post.readTime}</p>
    </Link>
  );
}
