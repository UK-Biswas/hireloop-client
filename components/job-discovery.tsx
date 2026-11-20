import Link from "next/link"

import { JobCard, type Job } from "@/components/job-card"
import { SectionHeading } from "@/components/section-heading"

const jobs: Job[] = [
  {
    title: "Frontend Developer",
    description:
      "Build fast, accessible interfaces for a product used by millions every day.",
    location: "New York, USA",
    schedule: "Hybrid",
    salary: "€25–€40/hour",
    href: "/jobs?q=frontend-developer",
  },
  {
    title: "Product Designer",
    description:
      "Own end-to-end flows and shape the design system from day one.",
    location: "Remote, EU",
    schedule: "Remote",
    salary: "$85k–$120k/year",
    href: "/jobs?q=product-designer",
  },
  {
    title: "Data Scientist",
    description:
      "Turn messy product data into models the whole team can trust.",
    location: "Berlin, Germany",
    schedule: "Hybrid",
    salary: "€60k–€85k/year",
    href: "/jobs?q=data-scientist",
  },
  {
    title: "DevOps Engineer",
    description:
      "Keep our platform fast and boringly reliable across three regions.",
    location: "Austin, USA",
    schedule: "On-site",
    salary: "$110k–$140k/year",
    href: "/jobs?q=devops-engineer",
  },
  {
    title: "Marketing Manager",
    description:
      "Turn product stories into campaigns that actually convert.",
    location: "London, UK",
    schedule: "Remote",
    salary: "£55k–£70k/year",
    href: "/jobs?q=marketing-manager",
  },
  {
    title: "Backend Engineer",
    description:
      "Design APIs that stay simple while the product keeps growing.",
    location: "Singapore",
    schedule: "Hybrid",
    salary: "S$120k–S$150k/year",
    href: "/jobs?q=backend-engineer",
  },
]

export function JobDiscovery() {
  return (
    <section
      id="jobs"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[60px]">
        <div className="flex flex-col items-center gap-10 sm:gap-12 lg:gap-16">
          <SectionHeading
            eyebrow="Smart job discovery"
            title="The roles you'd never find by searching"
          />

          <div className="flex w-full flex-col items-center gap-10">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.title} job={job} />
              ))}
            </div>

            <Link
              href="/jobs"
              className="inline-flex h-[58px] items-center justify-center rounded-xl border border-[#090a15]/10 bg-white px-6 font-instrument text-lg leading-[1.45] font-medium text-[#0b0b14] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-[#e9e9f2] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010103] focus-visible:outline-none"
            >
              View all job open
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
