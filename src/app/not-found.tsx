import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-28">
      <Container>
        <div className="mx-auto max-w-sm text-center">
          <Image
            src="/brand/sk-mark-ink.png"
            alt=""
            width={471}
            height={495}
            className="mx-auto mb-6 h-12 w-auto"
          />
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
