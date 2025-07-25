import { supportedChains } from "@/config/supported-chains";
import { SupportedChain } from "@/types";

export type DetectChainResults = {
  success: boolean;
  address: string;
  chains: SupportedChain[];
}

export async function detectChain(address: string): Promise<DetectChainResults> {
  let chains: SupportedChain[] = [];

  // test for solana address
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
    chains = [...supportedChains.filter(chain => chain.symbol === 'SOL')];
  }

  // test for evm address
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    chains = [...supportedChains.filter(chain => chain.isEvm)];
  }

  // if a chain is we log it
  if (chains && chains.length > 0) {
    console.log(`found chains: [${JSON.stringify(chains)}]`);
    return {
      success: true,
      address,
      chains,
    };
  }

  return {
    success: false,
    address,
    chains: []
  };
}

export type SearchWalletAddressResults = {
  success: boolean;
  data: {
    address: string;
    chain: SupportedChain;
    balance: number;
  } | null;
  error: string | null;
}

export async function searchWalletAddress(address: string, chain: SupportedChain): Promise<SearchWalletAddressResults> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      return {
        success: true,
        data: {
          address,
          chain,
          balance: 0,
        },
        error: null,
      };

    } catch (error) {
      console.error(error);

      return {
        success: false,
        data: null,
        error: 'There was an issues searching for wallet details',
      }

    }
  }