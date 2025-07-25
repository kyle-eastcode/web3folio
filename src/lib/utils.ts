import { PublicKey } from "@solana/web3.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortenAddress(address: string | null) {
  if (!address || address.length < 8) return address || "";
  return `${address.slice(0, 3)}...${address.slice(address.length - 3, address.length)}`;
}