"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function PasswordInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn("h-12 rounded-xl pr-12", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-white/50 transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-[#5c53fe]/30 focus-visible:outline-none"
      >
        {visible ? (
          <EyeOff className="size-4.5" aria-hidden />
        ) : (
          <Eye className="size-4.5" aria-hidden />
        )}
      </button>
    </div>
  )
}

export { PasswordInput }
