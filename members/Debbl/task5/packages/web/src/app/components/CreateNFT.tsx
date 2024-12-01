import { Button, Input, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Contract } from "~/constants";

export default function CreateNFT() {
  const { writeContractAsync } = useWriteContract();
  const [tokenURI, setTokenURI] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const account = useAccount();

  const nftBalanceOf = useReadContract({
    ...Contract.NFT,
    functionName: "balanceOf",
    args: [account.address!],
  });

  const createNFT = async ({ tokenURI }: { tokenURI: string }) => {
    setIsLoading(true);

    try {
      await writeContractAsync({
        ...Contract.NFT,
        functionName: "createNFT",
        args: [tokenURI],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {isLoading && (
        <Spinner
          classNames={{
            base: "bg-gray-200/80 rounded-sm fixed inset-0 z-20",
          }}
          size="lg"
        />
      )}

      <h3>CreateNFT</h3>
      <div className="flex items-center gap-x-2">
        <Input
          className="w-60"
          type="text"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
        />
        <Button onClick={() => createNFT({ tokenURI })}>create</Button>
        {nftBalanceOf.isSuccess && (
          <div>balanceOf: {nftBalanceOf.data.toString()}</div>
        )}
      </div>
    </div>
  );
}
