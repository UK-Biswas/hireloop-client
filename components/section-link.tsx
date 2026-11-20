"use client"

import type { ComponentPropsWithoutRef } from "react"

import { scrollToSection } from "@/lib/scroll-to-section"

type SectionLinkProps = Omit<ComponentPropsWithoutRef<"button">, "onClick"> & {
  sectionId: string
}

export function SectionLink({
  sectionId,
  children,
  ...props
}: SectionLinkProps) {
  return (
    <button {...props} type="button" onClick={() => scrollToSection(sectionId)}>
      {children}
    </button>
  )
}
