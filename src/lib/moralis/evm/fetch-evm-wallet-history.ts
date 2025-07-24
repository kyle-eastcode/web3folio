'server-only'

import { env } from "@/config/env";

export async function fetchEvmWalletHistory(address: string) {
  try {
    const response = await fetch(
      `${env.MORALIS_ETHEREUM_API_URL}/wallets/${address}/history?chain=eth&order=DESC`, {
        headers: {
          'accept': 'application/json',
          'X-API-Key': `${env.MORALIS_API_SECRET_KEY}`
        }
      });
      if (!response.ok) {
        console.log(response);
        throw new Error('Issue fetching evm wallet history');
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
    console.error(error);
    throw new Error('Issue fetching evm wallet history');
  }
}