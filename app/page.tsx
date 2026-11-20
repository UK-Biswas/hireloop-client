import Image from "next/image"

import heroGlobe from "@/app/images/globe.png"
import { Features } from "@/components/features"
import { Hero } from "@/components/hero"
import { JobDiscovery } from "@/components/job-discovery"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="relative isolate min-h-svh bg-[#010103] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1882px] overflow-hidden"
      >
        {/* Crop the top of the globe asset so the hero keeps the Figma frame colour (#010103). */}
        <div className="absolute top-[700px] left-1/2 h-[1182px] w-[1440px] max-w-none -translate-x-1/2 overflow-hidden">
          <Image
            src={heroGlobe}
            alt=""
            width={1440}
            height={1882}
            priority
            sizes="1440px"
            className="absolute top-[-700px] left-0 h-auto w-full animate-globe-drift"
          />
        </div>
      </div>

      <SiteHeader />
      <main>
        <Hero />
        <JobDiscovery />
        <Features />
      </main>
    </div>
  )
}
