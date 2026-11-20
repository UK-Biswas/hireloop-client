"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Crown, Sparkles, Zap, type LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

type Plan = {
  name: string
  icon: LucideIcon
  price: Record<Billing, string>
  features: string[]
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: "Starter",
    icon: Sparkles,
    price: { monthly: "$0", yearly: "$0" },
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    icon: Zap,
    price: { monthly: "$17", yearly: "$13" },
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    icon: Crown,
    price: { monthly: "$99", yearly: "$74" },
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
]

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing
  onChange: (billing: Billing) => void
}) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center gap-2 rounded-full border border-[#f6f6f6]/10 bg-white/15 p-2"
    >
      <button
        type="button"
        aria-pressed={billing === "monthly"}
        onClick={() => onChange("monthly")}
        className={cn(
          "h-[43px] rounded-full px-4 font-inter text-lg leading-normal tracking-[-0.02em] transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
          billing === "monthly"
            ? "bg-white font-medium text-[#010103]"
            : "text-white hover:text-white/80"
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        aria-pressed={billing === "yearly"}
        onClick={() => onChange("yearly")}
        className={cn(
          "inline-flex h-[43px] items-center gap-2 rounded-full px-3 font-inter text-lg leading-normal tracking-[-0.02em] transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none",
          billing === "yearly"
            ? "bg-white font-medium text-[#010103]"
            : "text-white hover:text-white/80"
        )}
      >
        Yearly
        <span className="inline-flex h-[27px] items-center justify-center rounded-full bg-[#dc02ce] px-2.5 font-geist text-base leading-[1.8] tracking-[-0.2px] text-white">
          25%
        </span>
      </button>
    </div>
  )
}

function PriceCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const Icon = plan.icon

  return (
    <article
      className={cn(
        "flex min-h-[450px] w-full max-w-[424px] flex-col justify-between gap-10 rounded-3xl border p-6 md:w-[calc(50%-12px)] xl:w-[424px] xl:flex-none",
        plan.featured
          ? "border-white/20 bg-[#151516] shadow-[inset_0_0_32px_8px_rgba(120,120,120,0.25)]"
          : "border-[#f6efe1]/20 bg-[#010103]"
      )}
    >
      <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#595959]/40">
              <Icon aria-hidden className="size-6 text-white" strokeWidth={1.5} />
            </span>
            <h3 className="font-jakarta text-2xl leading-[1.4] tracking-[-0.5px] text-white">
              {plan.name}
            </h3>
          </div>
          <p className="flex items-end gap-1">
            <span className="font-jakarta text-[40px] leading-[1.2] font-semibold tracking-[-0.02em] text-white">
              {plan.price[billing]}
            </span>
            <span className="pb-1 font-inter-tight text-sm leading-[1.7] text-white">
              /month
            </span>
          </p>
        </header>

        <div className="flex flex-col gap-3">
          <p className="font-inter text-lg leading-normal tracking-[-0.02em] font-medium text-white">
            Start building your insights hub:
          </p>
          <ul className="flex flex-col gap-4">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 font-inter text-base leading-[1.7] text-white/70"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-[#f6efe1]/10 bg-[#595959]/30">
                  <Check aria-hidden className="size-4 text-white" strokeWidth={2.5} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href={`/sign-up?plan=${plan.name.toLowerCase()}&billing=${billing}`}
        className={cn(
          "inline-flex h-[55px] items-center justify-center rounded-xl px-6 font-manrope text-base leading-[1.7] font-semibold tracking-[-0.02em] transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010103] focus-visible:outline-none",
          plan.featured
            ? "bg-white text-[#010103] hover:bg-[#e9e9f2]"
            : "bg-[#595959]/50 text-white hover:bg-[#6b6b6b]/60"
        )}
      >
        Choose This Plan
      </Link>
    </article>
  )
}

export function Pricing() {
  const [billing, setBilling] = React.useState<Billing>("monthly")

  return (
    <section id="pricing" className="scroll-mt-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:gap-16 lg:px-[60px] lg:py-[120px]">
        <SectionHeading
          eyebrow="Pricing"
          title="Pay for the leverage, not the listings"
        />

        <div className="flex w-full flex-col items-center gap-6">
          <BillingToggle billing={billing} onChange={setBilling} />

          <div className="flex w-full flex-wrap justify-center gap-6">
            {plans.map((plan) => (
              <PriceCard key={plan.name} plan={plan} billing={billing} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
