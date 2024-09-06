'use client';
import { useBalance } from '@/app/hooks/useBalance';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatUnits } from "viem";
import { useAccount } from 'wagmi';

const Balance = () => {
  const { address } = useAccount();
  const balance = useBalance({
    address: address!,
  });
  if (!address) {
    return null;
  }

  return (
    <div>
      <Card className="w-[320px] p-4 m-4 border border-gray-300 rounded-3xl sm:w-[calc(100% - 32px)] sm:max-w-none sm:min-w-[360px] relative animate-fade">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>balance </span>
          </CardTitle>
          <CardDescription>{formatUnits(balance, 6)} OBT</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
export default Balance;
