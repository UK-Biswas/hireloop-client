import Link from "next/link"
import {
  BriefcaseBusiness,
  CircleDollarSign,
  MapPin,
  type LucideIcon,
} from "lucide-react"

export type Job = {
  title: string
  description: string
  location: string
  schedule: string
  salary: string
  href: string
}

function JobTag({
  icon: Icon,
  label,
}: {
  icon: LucideIcon
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-3 py-1.5 font-inter-tight text-sm leading-[1.7] font-medium tracking-[0.04em] text-white">
      <Icon aria-hidden className="size-4 shrink-0" />
      {label}
    </span>
  )
}

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-[#151516] p-6 pt-8 transition-colors duration-200 hover:bg-[#1a1a1b]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-inter text-[26px] leading-[1.3] font-medium tracking-[-0.03em] text-white sm:text-[30px] lg:text-[32px]">
            {job.title}
          </h3>
          <p className="line-clamp-2 font-inter text-base leading-[1.7] tracking-[-0.02em] text-white/60">
            {job.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <JobTag icon={MapPin} label={job.location} />
          <JobTag icon={BriefcaseBusiness} label={job.schedule} />
          <JobTag icon={CircleDollarSign} label={job.salary} />
        </div>
      </div>

      <Link
        href={job.href}
        aria-label={`Apply for ${job.title}`}
        className="inline-flex h-[55px] w-fit items-center justify-center rounded-xl border border-white/10 bg-[#151516] px-6 font-manrope text-base leading-[1.7] font-semibold tracking-[-0.02em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#151516] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
      >
        Apply Now
      </Link>
    </article>
  )
}
