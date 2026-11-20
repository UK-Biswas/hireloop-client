"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Menu } from "lucide-react"

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
import { authClient, useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function UserAvatar({
  image,
  name,
  className,
}: {
  image?: string | null
  name: string
  className?: string
}) {
  const [failedImage, setFailedImage] = React.useState<string | null>(null)
  const showImage = Boolean(image) && failedImage !== image

  return (
    <span
      role="img"
      aria-label={`${name} avatar`}
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#5c53fe,#dc02ce)] font-manrope font-semibold text-white",
        className
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- avatars can come from any provider host
        <img
          src={image ?? undefined}
          alt=""
          referrerPolicy="no-referrer"
          className="size-full object-cover"
          onError={() => setFailedImage(image ?? null)}
        />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </span>
  )
}

export function SiteHeader() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const [isSigningOut, setIsSigningOut] = React.useState(false)

  const user = session?.user
  const displayName =
    user?.name?.trim() || user?.email?.split("@")[0] || "there"

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await authClient.signOut()
      router.refresh()
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full pt-4 sm:pt-5 lg:pt-6">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-[60px]">
        <div className="flex h-16 items-center justify-between rounded-2xl bg-[#222222] pr-3 pl-4 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)] lg:h-[74px] lg:pr-3 lg:pl-6">
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

          <nav
            aria-label="Main navigation"
            className="hidden h-full items-center lg:flex"
          >
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

            {isPending ? (
              <div
                aria-hidden
                className="h-11 w-[220px] animate-pulse rounded-xl bg-white/[0.04]"
              />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <UserAvatar
                    image={user.image}
                    name={displayName}
                    className="size-10 text-sm"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="max-w-[260px] truncate font-manrope text-sm leading-tight font-medium text-white">
                      {displayName}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 font-manrope text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LogOut aria-hidden className="size-4" />
                  {isSigningOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/sign-in"
                  className="font-manrope text-lg leading-[1.45] font-semibold text-[#5c53fe] transition-colors hover:text-white"
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
            )}
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden">
            {isPending ? (
              <div
                aria-hidden
                className="size-10 animate-pulse rounded-full bg-white/[0.06] sm:size-11"
              />
            ) : user ? (
              <UserAvatar
                image={user.image}
                name={displayName}
                className="size-10 text-sm sm:size-11"
              />
            ) : (
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "h-10 rounded-xl bg-[#5c53fe] px-4 font-instrument text-sm font-medium text-white hover:bg-[#6a62ff] sm:h-11 sm:px-5 sm:text-base"
                )}
              >
                Get Started
              </Link>
            )}

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

                  {user ? (
                    <div className="flex flex-col gap-4 px-3">
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          image={user.image}
                          name={displayName}
                          className="size-11 text-base"
                        />
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate font-manrope text-base font-semibold text-white">
                            {displayName}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 font-manrope text-base font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <LogOut aria-hidden className="size-4" />
                        {isSigningOut ? "Signing out…" : "Sign out"}
                      </button>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
