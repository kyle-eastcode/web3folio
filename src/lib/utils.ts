import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { WalletDetectionResult, WalletType } from "@/types/wallets"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Detects whether a string represents an EVM, Solana, or Sui wallet address
 * @param address The wallet address to validate
 * @returns An object containing the detected wallet type and validation status
 */
export function detectWalletType(address: string): WalletDetectionResult {
  // Input validation
  if (!address || typeof address !== 'string') {
    return {
      type: WalletType.UNKNOWN,
      address,
      isValid: false,
      error: 'Invalid input: Address must be a non-empty string'
    };
  }

  // Remove leading/trailing whitespace
  const trimmedAddress = address.trim();

  // Check EVM format (42 characters, starts with 0x)
  if (/^0x[a-fA-F0-9]{40}$/.test(trimmedAddress)) {
    return {
      type: WalletType.EVM,
      address,
      isValid: true
    };
  }

  // Check Solana format (44 characters, base58 encoded)
  if (/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{44}$/.test(trimmedAddress)) {
    return {
      type: WalletType.SOLANA,
      address,
      isValid: true
    };
  }

  // Check Sui format (typically 64 hexadecimal characters)
  if (/^[0-9a-fA-F]{64}$/.test(trimmedAddress)) {
    return {
      type: WalletType.SUI,
      address,
      isValid: true
    };
  }

  return {
    type: WalletType.UNKNOWN,
    isValid: false,
    address,
    error: 'Unable to determine wallet type based on address format'
  };
}