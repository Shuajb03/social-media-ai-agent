import { Metadata } from "next";
import { journalPosts } from "@/lib/data/journal";
import { Container } from "@/components/ui/Container";
import { JournalCard } from "@/components/JournalCard";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories from the SKUBI archive — brand lore, styling notes, and the thinking behind the house.",
};

export default function JournalPage() {
  return (
    <div className="py-14 sm:py-16">
      <Container>
        <div className="mb-12">
          <p className="mb-2 text-[11px] uppercase tracking-widest-plus text-gold-deep">
            The Journal
          </p>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">Stories from the Archive</h1>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {journalPosts.map((post) => (
            <JournalCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
