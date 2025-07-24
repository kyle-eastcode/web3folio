import { fetchEvmWalletNetWorth } from "@/lib/moralis/evm/fetch-evm-wallet-net-worth";
import { getSearchAddress } from "@/server/actions/search-address-cookie";
import { detectWalletType } from "@/lib/utils";

import { WalletHistoricalChart } from "./wallet-historical-chart";
import { WalletDataSection } from "./wallet-data-section";

export async function WalletOverviewSection() {
  let netWorth = 0;

  const searchAddress = await getSearchAddress();

  if (searchAddress) {
    const results = detectWalletType(searchAddress);

    if (results.isValid && results.type === 'EVM') {
      const evmNetWorth = await fetchEvmWalletNetWorth(searchAddress);
      netWorth = evmNetWorth;
    }
  }

  return (
    <div className="flex flex-col gap-y-2 h-full w-full">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-geist-mono font-semibold">Net Worth</h2>
          <h3 className="text-2xl font-geist-mono font-semibold text-gray-500">${netWorth}</h3>
        </div>
      </div>
      <WalletDataSection />
      <WalletHistoricalChart />
    </div>
  );
}
