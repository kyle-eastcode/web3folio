'server-only'

import { env } from "@/config/env";

export async function fetchEvmWalletNetWorth(address: string): Promise<number> {
  try {
    const response = await fetch(
      `${env.MORALIS_ETHEREUM_API_URL}/wallets/${address}/net-worth?exclude_spam=true&exclude_unverified_contracts=true&max_token_inactivity=1&min_pair_side_liquidity_usd=1000`, {
        headers: {
          'accept': 'application/json',
          'X-API-Key': `${env.MORALIS_API_SECRET_KEY}`
        }
      });
      if (!response.ok) {
        console.log(response);
        console.error('Issue fetching evm wallet net worth');
        return 0;
      }

      const data = await response.json();
      return Number(data.total_networth_usd) || 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
}