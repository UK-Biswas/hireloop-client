import Link from "next/link"

import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata = {
  title: "Create account — HireLoop",
  description: "Create a HireLoop account and start finding your next role.",
}

export default function SignUpPage() {
  return (
    <AuthShell
      mode="sign-up"
      title="Create your account"
      description="Three minutes to set up. Matches start arriving today."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#9a94ff] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  )
}
