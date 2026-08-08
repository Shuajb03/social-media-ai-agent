import { Container } from "@/components/ui/Container";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-cream">
      <Container>
        <p className="flex h-9 items-center justify-center text-center text-[11px] uppercase tracking-widest-plus">
          Complimentary shipping on orders over &euro;150 &mdash; Kosovo &amp; EU
        </p>
      </Container>
    </div>
  );
}
