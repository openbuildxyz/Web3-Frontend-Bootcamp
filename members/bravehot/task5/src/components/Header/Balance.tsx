"use client";
import { useAccount, useBalance } from "wagmi";

const Balance: React.FC = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const result = useBalance({
    address,
    token: process.env.NEXT_PUBLIC_ERC20_ADDRESS as any,
  });

  return isConnecting || isDisconnected ? null : (
    <div>
      {result.data?.formatted} {result.data?.symbol}
    </div>
  );
};

export default Balance;
