'server-only'

import { env } from "@/config/env";

export async function fetchSolanaWalletPortfolio(address: string) {
  try {
    const response = await fetch(
      `${env}/account/mainnet/${address}/portfolio?nftMetadata=true&mediaItems=true&excludeSpam=true`, {
        headers: {
          'accept': 'application/json',
          'X-API-KEY': `${env.MORALIS_API_SECRET_KEY}`
        }
      });
      if (!response.ok) {
        throw new Error('Issue fetching solana wallet portfolio');
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
    console.error(error);
    throw new Error('Issue fetching solana wallet portfolio');
  }
}