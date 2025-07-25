import { WatchListSection } from "@/components/containers/watch-list/waitch-list-section";
import { TopPerformersSection } from "@/components/containers/top-performers/top-performers-section";
import { WalletOverviewSection } from "@/components/containers/wallet-overview/wallet-overview-section";

export default function Home() {
  return (
    <section className="flex flex-col w-full p-5 gap-y-12">
      <WalletOverviewSection />
      <WatchListSection />
      <TopPerformersSection />
    </section>
  );
}