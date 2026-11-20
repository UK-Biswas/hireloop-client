"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import ctaGrid from "@/app/images/cta-grid.png"
import { scrollToSection } from "@/lib/scroll-to-section"

export function Cta() {
  const router = useRouter()

  const handlePricingClick = () => {
    if (document.getElementById("pricing")) {
      scrollToSection("pricing")
      return
    }

    router.push("/")
    setTimeout(() => scrollToSection("pricing"), 500)
  }

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%)]"
      >
        <div className="absolute top-[-180px] left-1/2 h-[720px] w-[1498px] max-w-none -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(92,83,254,0.5)_0%,rgba(92,83,254,0.22)_42%,rgba(92,83,254,0)_72%)] blur-[40px]" />
        <Image
          src={ctaGrid}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,4,11,0)_0%,#000000_100%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-5 py-20 text-center sm:px-8 sm:py-24 lg:px-[60px] lg:py-[120px]">
        <div className="flex w-full max-w-[792px] flex-col items-center gap-4">
          <h2 className="font-rethink text-[34px] leading-[1.2] font-medium tracking-[-1.5px] text-balance text-white sm:text-[52px] lg:text-[64px]">
            Your next role is
            <br />
            already looking for you
          </h2>
          <p className="max-w-[792px] font-manrope text-lg leading-[1.6] text-white/70 sm:text-xl">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/sign-up"
            className="inline-flex h-[58px] w-full items-center justify-center rounded-xl border border-[#090a15]/10 bg-white px-6 font-manrope text-lg leading-[1.45] font-semibold text-[#0b0b14] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-[#e9e9f2] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010103] focus-visible:outline-none sm:w-auto"
          >
            Create a free account
          </Link>

          <button
            type="button"
            onClick={handlePricingClick}
            className="inline-flex h-[58px] w-full items-center justify-center rounded-xl border border-[#d7d7d7]/30 bg-[#0e0b16] px-6 font-manrope text-lg leading-[1.45] font-medium text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-[#17121f] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010103] focus-visible:outline-none sm:w-auto"
          >
            View pricing
          </button>
        </div>
      </div>
    </section>
  )
}
