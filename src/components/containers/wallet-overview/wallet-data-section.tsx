import {
  Card,
  CardContent,
} from "@/components/ui/card";

export function WalletDataSection() {
  return (
    <div className="flex flex-col gap-y-2 min-h-56 h-full w-full mt-5">
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
        <WalletDataCard title={'Token Swaps'} value={0} />
        <WalletDataCard title={'DeFi Positions'} value={12} />
        <WalletDataCard title={'Domains'} value={42} />
        <WalletDataCard title={'NFTs'} value={1234} />
      </div>
    </div>
  );
}

function WalletDataCard({
  title,
  value,
} : {
  title: string;
  value?: number | undefined;
}) {
  return (
    <div>
      <Card className="h-[124px] w-full p-3 bg-secondary">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="text-lg font-semibold">
              {title}
            </div>
            <div className="text-4xl text-right">
              {value || '-'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}