import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Crown } from "@/components/icons/Crown";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your SKUBI account.",
};

export default function LoginPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-sm text-center">
          <Crown className="mx-auto mb-5 h-8 w-10 text-gold-deep" />
          <h1 className="font-display text-3xl text-ink">Welcome Back</h1>
          <p className="mt-2 text-sm text-ink/60">Sign in to view orders and your wishlist.</p>
          <form className="mt-8 space-y-4 text-left">
            <input required type="email" placeholder="Email address" className="fld" />
            <input required type="password" placeholder="Password" className="fld" />
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>
          <p className="mt-6 text-xs text-ink/50">
            New to SKUBI?{" "}
            <Link href="/account/register" className="text-ink underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
