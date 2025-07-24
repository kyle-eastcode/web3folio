'use client';

import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useState } from "react";
import { SearchIcon, XCircle, XIcon } from "lucide-react";

import { cn, detectWalletType } from "@/lib/utils";
import { Command, CommandDialog, CommandInput, CommandEmpty } from "./ui/command";
import { setSearchAddress } from "@/server/actions/search-address-cookie";
import { Button } from "./ui/button";

export function SearchBar({
  open = false,
  setOpen,
} : {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchResults, setSearchResults] = useState<{
    type: string;
    address: string;
    isValid: boolean;
    error?: string | undefined;
    submitted: boolean;
  }>({
    type: "UNKNOWN",
    address: '',
    isValid: false,
    error: undefined,
    submitted: false,
  });

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault()
  //       setSearchOpen(!searchOpen)
  //     }
  //   }

  //   document.addEventListener("keydown", down);

  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();

      const results = detectWalletType(searchResults.address);
      setSearchResults({
        ...results,
        submitted: true,
      });

      if (results && results.isValid) {
        await setSearchAddress(results.address);
        window.location.reload();
      }
    }
  }

  function handleOnChange(address: string) {
    setSearchResults({
      ...searchResults,
      address,
      submitted: false
    })
  }

  return (
    <div>
      <div
        className="hidden md:flex justify-between items-center min-w-[200px] bg-secondary p-2 rounded-lg gap-3"
        onClick={() => setOpen(!open)}
      >
        <SearchIcon size={18} className="text-gray-600 dark:text-gray-400" />
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            Search Wallet or Domain
          </p>
        </div>
        <div className="pr-1" />
        {/* <p className="text-sm text-gray-600 dark:text-gray-400">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p> */}
      </div>
      <Command>
        <CommandDialog open={open} onOpenChange={() => {
          if (open) {
            setSearchResults({
              type: 'UNKNOWN',
              address: '',
              isValid: false,
              submitted: false,
            })
            setOpen(false);
          }
        }}>
          <CommandInput
            value={searchResults.address}
            onKeyDown={handleKeyDown}
            onValueChange={handleOnChange}
            placeholder="Search a Wallet by ID or Domain"
          />
          {searchResults.submitted && searchResults.error && (
            <CommandEmpty className="flex justify-center items-center p-3">
              No data found
            </CommandEmpty>
          )}
          {/* {searchResults.submitted && searchResults.isValid && (
            <CommandEmpty className="flex justify-center items-center p-3">
              Searching...
            </CommandEmpty>
          )} */}
        </CommandDialog>
      </Command>
    </div>
  );
}