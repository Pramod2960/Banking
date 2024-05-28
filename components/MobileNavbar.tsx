"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white border-none">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 px-4 "
          >
            <Image src="/icons/logo.svg" width={34} height={34} alt="logo" />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Horizone
            </h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex g-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((i) => {
                  const isActive =
                    pathname === i.route || pathname.startsWith(`${i.route}/`);

                  return (
                    <SheetClose asChild
                    key={i.route }>
                    <Link
                      href={i.route}
                      key={i.label}
                      className={cn("mobilenav-sheet_close w-full", {
                        "bg-bank-gradient": isActive,
                      })}
                    >
                      
                        <Image
                          src={i.imgURL}
                          alt={i.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                    

                      <p
                        className={cn("text-16 font-semibold text-black-2", {
                          "text-white": isActive,
                        })}
                      >
                        {i.label}
                      </p>
                    </Link>
                    </SheetClose>
                  );
                })}

                USER
              </nav>
            </SheetClose>

            FOOTER
          </div>
        </SheetContent>

      </Sheet>

    </section>
  );
};
