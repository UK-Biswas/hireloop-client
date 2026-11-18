"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, LockKeyhole, Mail } from "lucide-react"

import { authInputClass, AuthField } from "@/components/auth/auth-field"
import { PasswordInput } from "@/components/auth/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type SignInValues = {
  email: string
  password: string
  remember: boolean
}

export function SignInForm() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const values: SignInValues = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      remember: formData.get("remember") === "on",
    }

    setIsSubmitting(true)

    const { error: signInError } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: values.remember,
    })

    if (signInError) {
      setError(
        signInError.message ?? "Unable to sign in. Check your details and try again."
      )
      setIsSubmitting(false)
      return
    }

    setIsSubmitted(true)
    setIsSubmitting(false)
    router.push("/")
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit}
      onInput={() => {
        if (error) {
          setError(null)
        }
      }}
      className="flex flex-col gap-5"
    >
      <AuthField id="sign-in-email" label="Email address">
        <div className="relative">
          <Mail
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35"
          />
          <Input
            id="sign-in-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            className={cn(authInputClass, "pl-11")}
          />
        </div>
      </AuthField>

      <AuthField
        id="sign-in-password"
        label="Password"
        hint={
          <button
            type="button"
            className="font-manrope text-xs font-medium text-[#9a94ff] transition-colors hover:text-white"
          >
            Forgot password?
          </button>
        }
      >
        <div className="relative">
          <LockKeyhole
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35"
          />
          <PasswordInput
            id="sign-in-password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            minLength={8}
            required
            className={cn(authInputClass, "pl-11")}
          />
        </div>
      </AuthField>

      <div className="flex items-center gap-2.5">
        <Checkbox
          id="sign-in-remember"
          name="remember"
          className="border-white/25 data-checked:border-[#5c53fe] data-checked:bg-[#5c53fe] data-checked:text-white"
        />
        <label
          htmlFor="sign-in-remember"
          className="cursor-pointer font-manrope text-sm text-white/70"
        >
          Keep me signed in
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-[#ff7a8a]/30 bg-[#ff7a8a]/10 px-4 py-3 font-manrope text-sm leading-[1.5] text-[#ffb3bc]"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl bg-[#5c53fe] font-instrument text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors hover:bg-[#6a62ff]"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign In
            <ArrowRight aria-hidden className="size-4" />
          </>
        )}
      </Button>

      <p aria-live="polite" className="min-h-5 text-center font-manrope text-xs">
        {isSubmitted ? (
          <span className="text-[#8f88ff]">Signed in — taking you home…</span>
        ) : null}
      </p>
    </form>
  )
}
