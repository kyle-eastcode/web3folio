import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    MORALIS_API_SECRET_KEY: z.url().default('MORALIS_API_SECRET_KEY'),
    // MORALIS_SOLANA_API_URL: z.url().default('https://solana-gateway.moralis.io'),
    // MORALIS_ETHEREUM_API_URL: z.url().default('https://deep-index.moralis.io/api/v2.2'),
  },
  client: {
    NEXT_PUBLIC_SOLANA_RPC_URL: z.url().default('https://api.mainnet-beta.solana.com'),
    // NEXT_PUBLIC_ETHEREUM_RPC_URL: z.url().default('https://ethereum-rpc.publicnode.com'),
    // NEXT_PUBLIC_SOLANA_RPC_URL: z.url().default('https://api.mainnet-beta.solana.com'),
    // NEXT_PUBLIC_SOLANA_NETWORK: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SOLANA_RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
    MORALIS_API_SECRET_KEY: process.env.MORALIS_API_SECRET_KEY,
    // MORALIS_ETHEREUM_API_URL: process.env.MORALIS_ETHEREUM_API_URL,
    // NEXT_PUBLIC_ETHEREUM_RPC_URL: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
    // NEXT_PUBLIC_SOLANA_RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC,
    // NEXT_PUBLIC_SOLANA_NETWORK: process.env.NEXT_PUBLIC_SOLANA_NETWORK,
  },
  skipValidation: true,
});
