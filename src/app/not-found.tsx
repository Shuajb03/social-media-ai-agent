import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Crown } from "@/components/icons/Crown";

export default function NotFound() {
  return (
    <div className="py-28">
      <Container>
        <div className="mx-auto max-w-sm text-center">
          <Crown className="mx-auto mb-6 h-9 w-12 text-gold-deep" />
          <h1 className="font-display text-4xl text-ink">404</h1>
          <p className="mt-3 text-sm text-ink/60">
            This chapter hasn&rsquo;t been written yet.
          </p>
          <Button href="/" className="mt-8">
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
