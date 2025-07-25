import { Token } from "./Token";

export interface WalletBalance {
  nativeCoin: Token;
  tokens: Token[];
  nfts: Array<{
    id: string;
    metadata: Record<string, unknown>;
  }>;
}