import {
  BarChart3,
  Bookmark,
  ChartLine,
  FileText,
  MousePointerClick,
  Search,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import { SectionHeading } from "@/components/section-heading"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLine,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: BarChart3,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Sparkles,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-[#151516]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:gap-16 lg:px-[60px] lg:py-[120px]">
        <SectionHeading
          eyebrow="features job"
          title="Everything you need to succeed"
        />

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-y-12">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-center gap-5 sm:gap-6"
            >
              <span className="flex size-[72px] shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[linear-gradient(135deg,#010102_0%,#313131_100%)] lg:size-20">
                <Icon
                  aria-hidden
                  className="size-7 text-[#f7c2ff] lg:size-8"
                  strokeWidth={1.75}
                />
              </span>
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="font-inter-tight text-lg leading-[1.4] font-medium text-white">
                  {title}
                </h3>
                <p className="font-inter-tight text-base leading-[1.65] text-white/70">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
