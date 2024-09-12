"use client";

import Link from "next/link";
import { List } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { ThemeChange } from "@/components/theme-change";
import { ThemeChangeM } from "@/components/theme-change-m";
import { ConnectWallet } from "@/components/connect-wallet";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-12 items-center justify-between px-4 md:px-4">
        <div className="flex">
          <Link href="/" className="flex items-center mr-6" prefetch={false}>
            <span className="ml-2 text-lg font-bold">OB NFT</span>
            <span className="ml-2 text-lg font-bold hidden md:inline">
              Market
            </span>
          </Link>
          <nav className="hidden space-x-4 md:flex items-center gap-4 text-sm lg:gap-6">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="/">
              NFT List
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="/mine">
              My NFT
            </Link>
          </nav>
        </div>
        <div className="inline-flex">
          <ConnectWallet />
          <ThemeChange />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <List />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] md:hidden">
            <VisuallyHidden.Root>
              <SheetHeader>
                <SheetTitle>Side menu</SheetTitle>
                <SheetDescription>Side menu</SheetDescription>
              </SheetHeader>
            </VisuallyHidden.Root>
            <div className="flex flex-col items-start space-y-4 py-6">
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/"
                onClick={() => setOpen(false)}>
                NFT List
              </Link>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground"
                href="/mine"
                onClick={() => setOpen(false)}>
                My NFT
              </Link>
              <ThemeChangeM />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
