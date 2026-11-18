import { Hero } from "@/components/hero"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="min-h-svh bg-[#010103] text-white">
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </div>
  )
}
