import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
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
          <Image
            src="/brand/sk-mark-ink.png"
            alt=""
            width={471}
            height={495}
            className="mx-auto mb-5 h-11 w-auto"
          />
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
