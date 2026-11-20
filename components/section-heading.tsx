import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[600px] flex-col items-center gap-4 text-center",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <span aria-hidden className="size-2 shrink-0 bg-[#5c53fe]" />
        <span className="font-space-mono text-lg leading-[1.2] text-white/80 sm:text-xl">
          {eyebrow}
        </span>
        <span aria-hidden className="size-2 shrink-0 bg-[#5c53fe]" />
      </div>
      <h2 className="max-w-[520px] text-center font-manrope text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-white sm:text-[40px] lg:text-[48px]">
        {title}
      </h2>
    </div>
  )
}
