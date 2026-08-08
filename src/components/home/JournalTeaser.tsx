import { journalPosts } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JournalCard } from "@/components/JournalCard";

export function JournalTeaser() {
  const featured = journalPosts.slice(0, 3);
  return (
    <section className="bg-cream-soft py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="The Journal" title="Stories from the archive" />
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {featured.map((post) => (
            <JournalCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
