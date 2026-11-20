import Image from "next/image"
import Link from "next/link"

import logo from "@/app/images/logo.png"

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/company" },
      { label: "Salary data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
]

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    highlighted: false,
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    highlighted: true,
    path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    highlighted: false,
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  },
]

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1440px] px-4 pt-8 pb-10 sm:px-8 lg:px-[60px]">
      <div className="rounded-2xl bg-[#010103] py-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-6 lg:max-w-[288px]">
            <Link href="/" aria-label="HireLoop home" className="w-fit">
              <Image
                src={logo}
                alt="HireLoop"
                width={154}
                height={44}
                className="h-11 w-auto"
              />
            </Link>
            <p className="font-manrope text-base leading-[1.9] text-white/50">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-[72px]">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-6">
                <h3 className="font-inter-tight text-lg leading-[1.4] font-medium text-[#5c53fe]">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-manrope text-base leading-[1.9] text-[#d0d5dd]/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[72px] flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={
                  "flex size-10 items-center justify-center rounded-lg transition-opacity hover:opacity-80 " +
                  (social.highlighted ? "bg-[#5c53fe]" : "bg-white/5")
                }
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="currentColor"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 font-manrope text-base leading-[1.9] text-[#acabb2] sm:flex-row sm:items-center sm:gap-6">
            <p>Copyright 2024 —Programming Hero</p>
            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms &amp; Policy - Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
