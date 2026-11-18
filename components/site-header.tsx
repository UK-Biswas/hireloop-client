"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import logo from "@/app/images/logo.png"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full pt-4 sm:pt-5 lg:pt-6">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[60px]">
        <div className="flex h-16 items-center justify-between rounded-2xl bg-[#222222] pl-4 pr-3 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)] lg:h-[74px] lg:pl-6 lg:pr-3">
          <Link href="/" aria-label="HireLoop home" className="shrink-0">
            <Image
              src={logo}
              alt="HireLoop"
              width={154}
              height={44}
              priority
              className="h-9 w-auto sm:h-10 lg:h-11"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden h-full items-center lg:flex">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-geist text-base leading-[1.8] tracking-[-0.2px] text-white transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <span aria-hidden className="mx-6 h-6 w-px bg-[#a8a8a8]/40" />

            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="font-manrope text-lg font-semibold leading-[1.45] text-[#5c53fe] transition-colors hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-[52px] rounded-xl bg-[#5c53fe] px-6 font-instrument text-[18px] font-medium tracking-normal text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#6a62ff]"
                )}
              >
                Get Started
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ size: "sm" }),
                "h-10 rounded-xl bg-[#5c53fe] px-4 font-instrument text-sm font-medium text-white hover:bg-[#6a62ff] sm:h-11 sm:px-5 sm:text-base"
              )}
            >
              Get Started
            </Link>

            <Sheet>
              <SheetTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open navigation menu"
                    className="inline-flex size-10 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none sm:size-11"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] border-l border-white/10 bg-[#0b0b14] p-0 text-white"
              >
                <SheetHeader className="border-b border-white/10 px-6 py-5">
                  <Link href="/" aria-label="HireLoop home">
                    <Image
                      src={logo}
                      alt="HireLoop"
                      width={154}
                      height={44}
                      className="h-9 w-auto"
                    />
                  </Link>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <SheetDescription className="sr-only">
                    Browse HireLoop pages and account actions.
                  </SheetDescription>
                </SheetHeader>

                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-col gap-1 px-4 py-6"
                >
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.href}
                      nativeButton={false}
                      render={<Link href={link.href} />}
                      className="rounded-xl px-3 py-3 font-manrope text-lg font-medium text-white transition-colors hover:bg-white/[0.06]"
                    >
                      {link.label}
                    </SheetClose>
                  ))}

                  <div className="my-4 h-px bg-white/10" />

                  <Link
                    href="/sign-in"
                    className="rounded-xl px-3 py-3 font-manrope text-lg font-medium text-[#5c53fe] transition-colors hover:bg-white/[0.06]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-3 h-12 rounded-xl bg-[#5c53fe] px-6 font-instrument text-base font-medium text-white hover:bg-[#6a62ff]"
                    )}
                  >
                    Get Started
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
