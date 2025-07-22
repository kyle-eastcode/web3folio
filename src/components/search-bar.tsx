'use client';

import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { WalletDetectionResult, WalletType } from "@/types/wallets";
import { detectWalletType } from "@/lib/utils";
import { Command, CommandDialog, CommandEmpty, CommandInput, CommandList } from "./ui/command";

export function SearchBar({
  open = false,
} : {
  open: boolean;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<WalletDetectionResult & { submitted: boolean }>({
    type: WalletType.UNKNOWN,
    address: '',
    isValid: false,
    error: undefined,
    submitted: false,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
    }

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    setSearchOpen(open)
  }, [open]);

  return (
    <div>
      <div
        className="hidden md:flex justify-between items-center min-w-[200px] bg-secondary p-2 rounded-lg gap-3"
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <SearchIcon size={18} className="text-gray-600 dark:text-gray-400" />
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Search Wallet or Domain
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
      </div>
      <Command>
        <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
          <CommandInput
            value={searchResults.address}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                const results = detectWalletType(searchResults.address);
                setSearchResults({
                  ...results,
                  submitted: true,
                });

                if (results.isValid) {
                  redirect(`/portfolio?address=${results.address}`);
                }
              }
            }}
            onValueChange={(value) => {
              setSearchResults({
                ...searchResults,
                address: value,
                submitted: false
              })
            }}
            placeholder="Search a Wallet by ID or Domain"
          />
          <CommandList>
            {searchResults.submitted && searchResults.error && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </CommandList>
        </CommandDialog>
      </Command>
    </div>
  );
}