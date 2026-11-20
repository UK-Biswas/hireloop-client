"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react"

import { authInputClass, AuthField } from "@/components/auth/auth-field"
import { PasswordInput } from "@/components/auth/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { isValidEmail, normalizeEmail } from "@/lib/email"
import { cn } from "@/lib/utils"

const EMAIL_ERROR = "Enter a valid email address, like you@example.com."

const roles = [
  {
    value: "seeker",
    label: "Job Seeker",
    icon: UserRound,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    icon: UsersRound,
  },
  {
    value: "admin",
    label: "Admin",
    icon: ShieldCheck,
  },
] as const

type UserRole = (typeof roles)[number]["value"]

type SignUpValues = {
  name: string
  email: string
  role: UserRole
  password: string
  confirmPassword: string
  acceptedTerms: boolean
}

export function SignUpForm() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [passwordsMatch, setPasswordsMatch] = React.useState(true)
  const [role, setRole] = React.useState<UserRole>("seeker")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const values: SignUpValues = {
      name: String(formData.get("name") ?? "").trim(),
      email: normalizeEmail(String(formData.get("email") ?? "")),
      role: String(formData.get("role") ?? "seeker") as UserRole,
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
      acceptedTerms: formData.get("terms") === "on",
    }

    if (!isValidEmail(values.email)) {
      setEmailError(EMAIL_ERROR)
      setPasswordsMatch(true)
      setIsSubmitted(false)
      const emailInput = event.currentTarget.elements.namedItem("email")
      if (emailInput instanceof HTMLInputElement) {
        emailInput.value = values.email
        emailInput.focus()
      }
      return
    }

    setEmailError(null)

    if (values.password !== values.confirmPassword) {
      setPasswordsMatch(false)
      setIsSubmitted(false)
      return
    }

    setPasswordsMatch(true)
    setIsSubmitting(true)

    const { error: signUpError } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      role: values.role,
      password: values.password,
      callbackURL: "/",
    })

    if (signUpError) {
      setError(
        signUpError.message ??
          "We couldn't create your account. Please try again."
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
        if (emailError) {
          setEmailError(null)
        }
      }}
      className="flex flex-col gap-5"
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="font-manrope text-[13px] font-medium text-white/80">
          Joining HireLoop as
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {roles.map((option) => {
            const Icon = option.icon

            return (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={() => setRole(option.value)}
                  className="peer sr-only"
                />
                <span className="flex h-16 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#101010] font-manrope text-[13px] font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white peer-checked:border-[#5c53fe] peer-checked:bg-[#5c53fe]/10 peer-checked:text-white peer-checked:shadow-[0_0_24px_-8px_rgba(92,83,254,0.8)] peer-focus-visible:ring-3 peer-focus-visible:ring-[#5c53fe]/30">
                  <Icon aria-hidden className="size-4 shrink-0" />
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <AuthField id="sign-up-name" label="Full name">
        <div className="relative">
          <UserRound
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35"
          />
          <Input
            id="sign-up-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
            className={cn(authInputClass, "pl-11")}
          />
        </div>
      </AuthField>

      <AuthField
        id="sign-up-email"
        label="Email address"
        error={emailError ?? undefined}
      >
        <div className="relative">
          <Mail
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35"
          />
          <Input
            id="sign-up-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? "sign-up-email-error" : undefined}
            onBlur={(event) => {
              const value = normalizeEmail(event.currentTarget.value)
              event.currentTarget.value = value
              if (value && !isValidEmail(value)) {
                setEmailError(EMAIL_ERROR)
              }
            }}
            className={cn(authInputClass, "pl-11")}
          />
        </div>
      </AuthField>

      <AuthField id="sign-up-password" label="Password">
        <div className="relative">
          <LockKeyhole
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35"
          />
          <PasswordInput
            id="sign-up-password"
            name="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
            required
            onChange={() => setPasswordsMatch(true)}
            className={cn(authInputClass, "pl-11")}
          />
        </div>
      </AuthField>

      <AuthField
        id="sign-up-confirm-password"
        label="Confirm password"
        error={passwordsMatch ? undefined : "Passwords do not match."}
      >
        <div className="relative">
          <LockKeyhole
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35"
          />
          <PasswordInput
            id="sign-up-confirm-password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Repeat your password"
            minLength={8}
            required
            aria-invalid={!passwordsMatch}
            onChange={() => setPasswordsMatch(true)}
            aria-describedby={
              passwordsMatch ? undefined : "sign-up-confirm-password-error"
            }
            className={cn(authInputClass, "pl-11")}
          />
        </div>
      </AuthField>

      <div className="flex items-start gap-2.5">
        <Checkbox
          id="sign-up-terms"
          name="terms"
          required
          className="mt-0.5 border-white/25 data-checked:border-[#5c53fe] data-checked:bg-[#5c53fe] data-checked:text-white"
        />
        <label
          htmlFor="sign-up-terms"
          className="cursor-pointer font-manrope text-sm leading-[1.5] text-white/70"
        >
          I agree to the{" "}
          <span className="font-medium text-white underline underline-offset-2">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="font-medium text-white underline underline-offset-2">
            Privacy Policy
          </span>
          .
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
            Creating account…
          </>
        ) : (
          <>
            Create Account
            <ArrowRight aria-hidden className="size-4" />
          </>
        )}
      </Button>

      <p aria-live="polite" className="min-h-5 text-center font-manrope text-xs">
        {isSubmitted ? (
          <span className="text-[#8f88ff]">
            Account created — taking you home…
          </span>
        ) : null}
      </p>
    </form>
  )
}
