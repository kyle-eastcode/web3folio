'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, SearchIcon, SettingsIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { BrandingLogo } from "../../branding-logo";
import { ThemeSwitcher } from "../../theme-switcher";
import { SearchBar } from "../../search-bar";
import { navbarLinks } from "./navbar-links";
import { NavbarLinkItem } from "./navbar-item";

export function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const pathname = usePathname();

  const listOfLinks = useMemo(() => [
      ...navbarLinks.primary,
      ...navbarLinks.secondary,
  ], []);

  const currentLink = useMemo(() => {
    return listOfLinks.find(link => link.href === pathname) || listOfLinks[0];
  }, [listOfLinks, pathname]);

  return (
    <div className="">
      {/* Sidebar */}
      <aside id="logo-sidebar" className={cn("fixed bg-white dark:bg-gray-900 top-0 left-0 z-40 w-64 h-screen transition-transform", navbarOpen ? "" : "-translate-x-full md:translate-x-0")} aria-label="Sidebar">
        <nav className="flex flex-col h-full overflow-y-auto border-gray-400 border-r-[1px] w-64">
          <div className="flex justify-between items-center pr-4">
            <Link href="/" className="p-4">
              <BrandingLogo />
            </Link>
            <div
              className="flex md:hidden justify-center items-center text-gray-200 hover:text-gray-800 dark:hover:text-gray-200 hover:cursor-pointer ease-in-out duration-200"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <XIcon size={24} />
            </div>
          </div>

          <div className="flex flex-1 flex-col py-2">
            <ul className="flex-1">
              {navbarLinks.primary.map((link, i) => (
                <NavbarLinkItem
                  active={currentLink.href === link.href}
                  link={link}
                  key={`navbar-primary-link-${i + 1}`}
                />
              ))}
            </ul>
            <div className="bg-gray-400 w-full h-[1px]" />
            <ul className="flex flex-col">
              {navbarLinks.secondary.map((link, i) => (
                <NavbarLinkItem
                  active={currentLink.href === link.href}
                  link={link}
                  key={`navbar-secondary-link-${i + 1}`}
                />
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Navbar */}
      <div className="fixed w-full bg-white dark:bg-gray-900 z-30">
        <div className="flex justify-between items-center p-5 md:ml-64 min-h-[60px] border-gray-400 border-b-[1px]">
          <div
            className="flex md:hidden justify-center items-center text-gray-500 hover:cursor-pointer ease-in-out duration-200"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon size={24} />
          </div>
          <div className="hidden md:block text-sm w-full max-w-[100px]">{currentLink.name}</div>

          <SearchBar open={searchOpen} setOpen={setSearchOpen} />

          <div className="flex items-center gap-x-8 md:gap-x-4">
            <div
              className="md:hidden text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <SearchIcon size={20} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                  <SettingsIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-[1px] bg-white dark:bg-gray-900" align="start">
                <DropdownMenuLabel className="p-3">Display Settings</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                <DropdownMenuGroup className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Theme</span>
                    <ThemeSwitcher />
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="secondary">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
