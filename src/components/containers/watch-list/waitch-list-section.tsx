import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function WatchListSection() {
  return (
    <div className="flex flex-col gap-y-2 min-h-56 h-full w-full">
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-2xl font-geist-mono font-semibold">WatchList</h2>
        <Link href="/" className="text-xs md:text-sm flex justify-between items-center">
          Manage Watchlist
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        <WatchListInfoCard />
        <WatchListInfoCard />
      </div>
    </div>
  );
}

function WatchListInfoCard() {
  return (
    <div>
      <Card className="h-[164px] w-full p-3 bg-secondary">
        <CardContent className="p-0">
          <span className="text-red-500">test</span>
        </CardContent>
      </Card>
    </div>
  );
}