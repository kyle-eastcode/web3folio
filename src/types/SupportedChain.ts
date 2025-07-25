// export type SupportedChain = 'solana' | 'evm' | 'sui';
export type SupportedChain = {
  id: number;
  name: string;
  network: string;
  symbol: string;
  explorer: string;
  isEvm: boolean;
}