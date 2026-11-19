import Link from "next/link"
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Search,
  Star,
  Store,
  UsersRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const trendingRoles = [
  { label: "Product Designer", href: "/jobs?q=product-designer" },
  { label: "AI Engineering", href: "/jobs?q=ai-engineering" },
  { label: "Dev-ops Engineer", href: "/jobs?q=devops-engineer" },
]

const stats = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: UsersRound, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 sm:pb-28 lg:pb-[72px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-20 sm:px-8 sm:pt-28 lg:px-[60px] lg:pt-[176px]">
        <div className="mx-auto flex w-full max-w-[784px] flex-col items-center gap-8 lg:gap-12">
          <div className="flex flex-col items-center gap-7 sm:gap-8">
            <div className="flex items-center justify-center">
              <span className="hidden h-px w-10 bg-gradient-to-r from-[#010123] to-[#a8a8a8]/70 sm:block lg:w-16" />
              <div className="flex items-center gap-2.5 rounded-full border border-white/5 bg-gradient-to-b from-[#474747] to-[#010102] px-4 py-2.5 shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.1)] sm:gap-3 sm:px-6 sm:py-3 lg:gap-4">
                <Store className="size-4 text-[#e5b08e] sm:size-5 lg:size-6" />
                <span className="font-space-mono text-[13px] tracking-tight text-white sm:text-base lg:text-xl">
                  50,000+ new jobs this month
                </span>
              </div>
              <span className="hidden h-px w-10 bg-gradient-to-l from-[#010123] to-[#a8a8a8]/70 sm:block lg:w-16" />
            </div>

            <div className="flex flex-col items-center gap-4">
              <h1 className="text-center font-manrope text-[40px] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-white sm:text-[48px] lg:text-[56px]">
                Find Your Dream Job Today
              </h1>
              <p className="max-w-[784px] text-center font-manrope text-base leading-[1.6] text-pretty text-white/70 sm:text-lg lg:text-xl">
                HireLoop connects top talent with world-class companies. Browse
                thousands of curated opportunities and land your next role —
                faster.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-5 sm:gap-6">
            <form
              action="/jobs"
              className="flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-[#101010] p-2 lg:h-16 lg:flex-row lg:items-center lg:gap-6 lg:rounded-2xl lg:px-6 lg:py-2"
            >
              <label className="flex min-w-0 flex-1 items-center gap-2 lg:w-[316px] lg:flex-none">
                <Search className="size-5 shrink-0 text-white sm:size-6" />
                <span className="sr-only">Job title, skill or company</span>
                <input
                  name="q"
                  type="search"
                  placeholder="Job title, skill or company"
                  className="h-10 w-full min-w-0 bg-transparent font-geist text-[15px] text-white outline-none placeholder:text-white/80 sm:h-11 sm:text-base lg:h-auto"
                />
              </label>

              <span aria-hidden className="hidden h-6 w-px bg-white/20 lg:block" />

              <label className="flex min-w-0 flex-1 items-center gap-2 lg:w-[316px] lg:flex-none">
                <MapPin className="size-5 shrink-0 text-white sm:size-6" />
                <span className="sr-only">Location or Remote</span>
                <input
                  name="location"
                  type="text"
                  placeholder="Location or Remote"
                  className="h-10 w-full min-w-0 bg-transparent font-geist text-[15px] text-white outline-none placeholder:text-white/80 sm:h-11 sm:text-base lg:h-auto"
                />
              </label>

              <Button
                type="submit"
                className="mt-1 h-11 w-full rounded-xl bg-[#5c53fe] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-[#6a62ff] sm:h-12 lg:mt-0 lg:size-12 lg:w-12 lg:shrink-0"
              >
                <Search className="size-5 lg:size-6" />
                <span className="sr-only">Search jobs</span>
              </Button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
              <span className="font-manrope text-sm text-white/70 sm:text-base">
                Trending Position
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {trendingRoles.map((role) => (
                  <Link
                    key={role.href}
                    href={role.href}
                    className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 font-manrope text-sm leading-[1.5] text-white transition-colors hover:border-white/20 hover:bg-[#262627]"
                  >
                    {role.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 sm:mt-40 lg:mt-[358px]">
          <p className="mx-auto max-w-[600px] text-center font-instrument text-[28px] leading-[1.3] font-medium tracking-[-1px] text-balance text-white/70 sm:text-[34px] lg:text-[40px]">
            Assisting over 15,000 job seekers find their dream positions.
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-[1320px] grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="flex min-h-[210px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#010102] to-[#313131] p-6 lg:min-h-[254px]"
                >
                  <Icon className="size-5 text-white/80 sm:size-6" />
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <span className="font-jakarta text-[44px] leading-[1.15] font-semibold tracking-[-0.02em] text-white lg:text-[56px]">
                      {stat.value}
                    </span>
                    <span className="font-inter-tight text-base text-white sm:text-lg">
                      {stat.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
