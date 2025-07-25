export interface Token {
  symbol: string;
  balance: bigint;
  decimals: number;
  price?: number | undefined;
}