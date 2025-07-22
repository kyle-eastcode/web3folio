import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    
  },
  client: {
    NEXT_PUBLIC_SOLANA_RPC: z.url().default('https://api.mainnet-beta.solana.com'),
    NEXT_PUBLIC_SOLANA_NETWORK: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SOLANA_RPC: process.env.NEXT_PUBLIC_SOLANA_RPC,
    NEXT_PUBLIC_SOLANA_NETWORK: process.env.NEXT_PUBLIC_SOLANA_NETWORK,
  },
  skipValidation: true,
});
