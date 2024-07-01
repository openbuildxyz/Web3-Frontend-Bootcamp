import { useState } from "react";
import type { Address } from "viem";
import { parseEther } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { toast } from "react-hot-toast";
import { Button, Input, Spinner } from "@nextui-org/react";
import CheckBalance from "./CheckBalance";
import { Contract } from "~/constants";

export default function TransferToken() {
  const [isLoading, setIsLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const [to, setTo] = useState<Address>(
    "0x0000000000000000000000000000000000000000",
  );

  const account = useAccount();
  const tokenSymbol = useReadContract({
    ...Contract.Token,
    functionName: "symbol",
  });

  const mintToken = async () => {
    setIsLoading(true);

    try {
      await writeContractAsync({
        ...Contract.Token,
        functionName: "transfer",
        args: [account.address!, parseEther("10")],
      });
    } catch {
      toast.error("mint failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-10 flex items-center gap-x-4">
      {isLoading && (
        <Spinner
          classNames={{
            base: "bg-gray-200/80 rounded-sm fixed inset-0 z-20",
          }}
          size="lg"
        />
      )}

      <Input
        className="w-72"
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value as Address)}
      />
      <Button onClick={() => mintToken()}>Transfer</Button>
      <div className="flex">
        My Balance: <CheckBalance /> {tokenSymbol.data}
      </div>
    </div>
  );
}
