import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const authInputClass = cn(
  "h-12 rounded-xl border-white/15 bg-[#101010] px-4 font-manrope text-[15px] text-white placeholder:text-white/35",
  "focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/25",
  "aria-invalid:border-[#ff7a8a]/60 aria-invalid:ring-3 aria-invalid:ring-[#ff7a8a]/20"
)

type AuthFieldProps = {
  id: string
  label: string
  hint?: React.ReactNode
  error?: string
  children: React.ReactNode
}

export function AuthField({ id, label, hint, error, children }: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <Label
          htmlFor={id}
          className="font-manrope text-[13px] font-medium text-white/80"
        >
          {label}
        </Label>
        {hint}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="font-manrope text-xs text-[#ff9aa6]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
