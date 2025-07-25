'use client';

import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useState } from "react";
import { Loader, SearchIcon, XCircle, XIcon } from "lucide-react";

import { Command, CommandDialog, CommandInput, CommandEmpty } from "./ui/command";
import { SupportedChain, WalletBalance } from "@/types";
import { detectChain, DetectChainResults, searchWalletAddress } from "@/lib/wallets";
import { shortenAddress } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

export function SearchBar({
  open = false,
  setOpen,
} : {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<{
    address: string | null;
    chains: SupportedChain[] | null;
  } | null>(null);

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

  useEffect(() => {
    if (search.length == 0) {
      setError(null);
      setSearchResults(null);
    }
  }, [search]);

  async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      
      try {
        // detect the provided wallet address
        const { success, chains, address } = await detectChain(search);
        if (!success || !chains || !address) {
          setError('No results found');
        } else {
          setSearchResults({
            address,
            chains,
          });
        }
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }
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
            setSearch("");
            setOpen(false);
          }
        }}>
          <CommandInput
            value={search}
            onKeyDown={handleKeyDown}
            onValueChange={(value) => {
              setSearch(value)
            }}
            placeholder="Search a Wallet by ID or Domain"
          />
          {loading && (
            <CommandEmpty className="flex justify-center items-center p-3">
              <div className="flex gap-x-2">
                <Loader className="spinner" />
                <div>Loading...</div>
              </div>
            </CommandEmpty>
          )}
          {error && (
            <CommandEmpty className="flex justify-center items-center p-3">
              {error}
            </CommandEmpty>
          )}
          {!error && searchResults && searchResults.chains && searchResults.chains.length > 0 && (
            <div className="flex flex-col justify-center items-center w-full">
              <span className="text-lg text-gray-500 mt-2 mb-3">Please select a network</span>
              {searchResults.chains.map(chain => (
                <CommandEmpty key={`search-results-chain-${chain.id}`} className="flex justify-center items-center p-3 w-full">
                  <Button
                    variant="outline"
                    className="min-w-[240px]"
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <Image
                        src={`/images/chains/${chain.name.toLowerCase()}.svg`}
                        alt={chain.name}
                        height={14}
                        width={14}
                      />
                      {chain.name}
                    </div>
                  </Button>
               </CommandEmpty>
              ))}
            </div>
          )}
        </CommandDialog>
      </Command>
    </div>
  );
}