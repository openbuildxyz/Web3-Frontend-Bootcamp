"use client";
import { useAccount, useBalance } from "wagmi";

const Balance: React.FC = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const result = useBalance({
    address,
    token: "0x034ba171732A6e9AD5B9Be3EBa422896aD1446fB",
  });

  return isConnecting || isDisconnected ? null : (
    <div>
      {result.data?.formatted} {result.data?.symbol}
    </div>
  );
};

export default Balance;
