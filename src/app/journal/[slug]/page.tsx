import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journalPosts, getJournalPost } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";
import { ProductVisual } from "@/components/ProductVisual";
import { JournalCard } from "@/components/JournalCard";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const more = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <nav className="mb-8 flex items-center gap-2 text-xs text-ink/40">
          <Link href="/journal" className="hover:text-ink">
            Journal
          </Link>
          <span>/</span>
          <span className="text-ink/70">{post.title}</span>
        </nav>

        <article className="mx-auto max-w-2xl">
          <p className="mb-3 text-[11px] uppercase tracking-widest-plus text-gold-deep">
            {post.category} &middot; {post.readTime}
          </p>
          <h1 className="font-display text-4xl leading-tight text-balance text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xs text-ink/40">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden">
            <ProductVisual pattern={post.pattern} tone={post.tone} className="h-full w-full" />
          </div>

          <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink/75">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        {more.length > 0 && (
          <div className="mx-auto mt-24 max-w-5xl">
            <h2 className="mb-10 font-display text-2xl text-ink">More from the Journal</h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-3">
              {more.map((p) => (
                <JournalCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
