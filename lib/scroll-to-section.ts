export function scrollToSection(sectionId: string) {
  if (typeof window === "undefined") return

  const section = document.getElementById(sectionId)
  if (!section || typeof section.scrollIntoView !== "function") return

  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  section.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  })
}
