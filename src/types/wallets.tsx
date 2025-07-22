export enum WalletType {
  EVM = "EVM",
  SOLANA = "Solana",
  SUI = "Sui",
  UNKNOWN = "UNKNOWN",
}

export interface WalletDetectionResult {
  type: WalletType;
  address: string;
  isValid: boolean;
  error?: string;
}
