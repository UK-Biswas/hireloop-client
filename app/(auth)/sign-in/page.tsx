import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata = {
  title: "Sign in — HireLoop",
  description: "Sign in to your HireLoop account.",
}

export default function SignInPage() {
  return (
    <AuthShell
      mode="sign-in"
      title="Welcome back"
      description="Sign in to keep tracking applications and picking up new roles."
      footer={
        <>
          New to HireLoop?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#9a94ff] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthShell>
  )
}
