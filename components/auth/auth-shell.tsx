import Image from "next/image"
import Link from "next/link"

import logo from "@/app/images/logo.png"
import { cn } from "@/lib/utils"

type AuthMode = "sign-in" | "sign-up"

const tabs: { mode: AuthMode; label: string; href: string }[] = [
  { mode: "sign-in", label: "Sign in", href: "/sign-in" },
  { mode: "sign-up", label: "Sign up", href: "/sign-up" },
]

type AuthShellProps = {
  mode: AuthMode
  title: string
  description: string
  children: React.ReactNode
  footer: React.ReactNode
}

export function AuthShell({
  mode,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#010103] px-5 py-12 text-white sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-64 left-1/2 h-[540px] w-[min(880px,150vw)] -translate-x-1/2 rounded-full bg-[#5c53fe]/25 blur-[150px]" />
        <div className="absolute -bottom-72 left-1/2 h-[520px] w-[min(700px,140vw)] -translate-x-1/2 rounded-full bg-[#dc02ce]/10 blur-[170px]" />
      </div>

      <Link href="/" aria-label="HireLoop home" className="mb-8 inline-flex">
        <Image
          src={logo}
          alt="HireLoop"
          width={154}
          height={44}
          priority
          className="h-10 w-auto sm:h-11"
        />
      </Link>

      <div className="w-full max-w-[460px] rounded-3xl border border-white/10 bg-[linear-gradient(180deg,#141416_0%,#0a0a0e_100%)] p-6 shadow-[0_40px_120px_-40px_rgba(92,83,254,0.45)] sm:p-8">
        <nav
          aria-label="Authentication"
          className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.mode}
              href={tab.href}
              aria-current={tab.mode === mode ? "page" : undefined}
              className={cn(
                "flex h-10 items-center justify-center rounded-lg font-manrope text-sm font-medium transition-colors",
                tab.mode === mode
                  ? "bg-[#5c53fe] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                  : "text-white/60 hover:bg-white/[0.05] hover:text-white"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="mt-7 flex flex-col gap-2">
          <h1 className="font-manrope text-[26px] leading-[1.2] font-semibold tracking-[-0.02em] text-white sm:text-[30px]">
            {title}
          </h1>
          <p className="font-manrope text-sm leading-[1.6] text-white/60 sm:text-[15px]">
            {description}
          </p>
        </div>

        <div className="mt-6">{children}</div>

        <p className="mt-5 text-center font-manrope text-sm text-white/60">
          {footer}
        </p>
      </div>
    </div>
  )
}

export type { AuthMode }
