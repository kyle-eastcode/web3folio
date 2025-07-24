import { columns, TopPerformersTable, TopPerformersTableEntry } from "./top-performers-table";

async function getData(): Promise<TopPerformersTableEntry[]> {
  return [
    {
      id: Date.now().toString(),
      asset: "bonk",
      icon: "https://img.step.finance/unsafe/s-64/plain/https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F28600%2Flarge%2Fbonk.jpg%3F1696527587",
      change: 10.56,
      price: 0.043665,
      liquidity: 102903.89
    },
    {
      id: Date.now().toString(),
      asset: "bonk",
      icon: "https://img.step.finance/unsafe/s-64/plain/https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F28600%2Flarge%2Fbonk.jpg%3F1696527587",
      change: -4.16,
      price: 0.043665,
      liquidity: 102903.89
    },
    {
      id: Date.now().toString(),
      asset: "bonk",
      icon: "https://img.step.finance/unsafe/s-64/plain/https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F28600%2Flarge%2Fbonk.jpg%3F1696527587",
      change: 8.24,
      price: 0.043665,
      liquidity: 102903.89
    },
    {
      id: Date.now().toString(),
      asset: "bonk",
      icon: "https://img.step.finance/unsafe/s-64/plain/https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F28600%2Flarge%2Fbonk.jpg%3F1696527587",
      change: 8.06,
      price: 0.043665,
      liquidity: 102903.89
    },
    {
      id: Date.now().toString(),
      asset: "bonk",
      icon: "https://img.step.finance/unsafe/s-64/plain/https%3A%2F%2Fassets.coingecko.com%2Fcoins%2Fimages%2F28600%2Flarge%2Fbonk.jpg%3F1696527587",
      change: -2.45,
      price: 0.043665,
      liquidity: 102903.89
    },
  ]
}

export async function TopPerformersSection() {
  const data = await getData()

  return (
    <div className="flex flex-col gap-y-2 min-h-56 h-full w-full">
      <h2 className="text-2xl font-geist-mono font-semibold mb-2">Top Performers</h2>
      <div>
        <TopPerformersTable data={data} columns={columns} />
      </div>
    </div>
  );
}