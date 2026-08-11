import { Crown } from "@/components/icons/Crown";
import { NewsletterForm } from "@/components/NewsletterForm";

export function CategoryComingSoon({ categoryName }: { categoryName: string }) {
  return (
    <div className="flex flex-col items-center gap-5 border border-line py-20 text-center">
      <Crown className="h-8 w-10 text-gold-deep" />
      <p className="max-w-sm text-sm leading-relaxed text-ink/60">
        {categoryName} hasn&rsquo;t been written into the Archive yet — it&rsquo;s part of
        where Chapter I is headed, not what&rsquo;s ready today.
      </p>
      <NewsletterForm tone="ink" />
    </div>
  );
}
