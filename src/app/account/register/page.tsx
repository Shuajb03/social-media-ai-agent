import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a SKUBI account for faster checkout and order history.",
};

export default function RegisterPage() {
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
          <h1 className="font-display text-3xl text-ink">Create Account</h1>
          <p className="mt-2 text-sm text-ink/60">Faster checkout, order history, saved wishlist.</p>
          <form className="mt-8 space-y-4 text-left">
            <input required placeholder="Full name" className="fld" />
            <input required type="email" placeholder="Email address" className="fld" />
            <input required type="password" placeholder="Password" className="fld" />
            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>
          </form>
          <p className="mt-6 text-xs text-ink/50">
            Already have an account?{" "}
            <Link href="/account/login" className="text-ink underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
