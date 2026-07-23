"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import wholeLogoCharcoal from "@/assets/body_bliss_whole_logo_charcoal.png";

/* iPhone-first header: translucent bar, logo left, hamburger right. */

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/book", label: "Book a massage" },
  { href: "/services", label: "Services" },
  { href: "/therapists", label: "Therapists" },
  { href: "/gift-cards", label: "Gift cards" },
  { href: "/about", label: "About us" },
  { href: "/help", label: "Help & safety" },
  { href: "/account", label: "My account" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close the menu whenever the route changes.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-component px-page-inline py-2 [padding-top:max(0.5rem,env(safe-area-inset-top))]">
        <Link
          href="/"
          aria-label="Body Bliss Massage and Day Spa, home"
          className="flex min-h-hit-target items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src={wholeLogoCharcoal}
            alt="Body Bliss Massage and Day Spa"
            className="-my-3 h-24 w-auto tablet:-my-5 tablet:h-36"
            priority
          />
        </Link>

        <div className="flex items-center gap-compact tablet:gap-component">
          <Button asChild variant="primary" className="hidden tablet:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>

          <Link
            href="/account"
            aria-label="My account"
            className={cn(
              "inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded",
              "text-foreground transition-colors duration-fade hover:bg-foreground/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            <User aria-hidden="true" className="size-6" />
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                aria-haspopup="dialog"
                className={cn(
                  "inline-flex min-h-hit-target min-w-hit-target items-center justify-center gap-compact rounded",
                  "text-nav font-medium text-foreground",
                  "transition-colors duration-fade hover:bg-foreground/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <Menu aria-hidden="true" className="size-6" />
                <span className="hidden tablet:inline">Menu</span>
              </button>
            </SheetTrigger>

            <SheetContent title="Menu">
              <nav aria-label="Main">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const selected =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={selected ? "page" : undefined}
                            className={cn(
                              "flex min-h-hit-target items-center border-b border-border text-nav",
                              "transition-colors duration-fade",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              selected
                                ? "font-heading font-bold text-bb-nav-selected"
                                : "text-bb-nav hover:text-bb-nav-selected",
                            )}
                          >
                            <span
                              className={cn(
                                "mr-3 h-6 w-1 rounded",
                                selected ? "bg-bb-nav-accent" : "bg-transparent",
                              )}
                              aria-hidden="true"
                            />
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-card-gap flex flex-col gap-component">
                <SheetClose asChild>
                  <Button asChild variant="primary" className="w-full">
                    <Link href="/book">Book Now</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="quiet" className="w-full">
                    <Link href="/gift-cards">Buy a Gift Card</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
