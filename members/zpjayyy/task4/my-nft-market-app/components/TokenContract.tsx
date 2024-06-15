import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { tokenContractConfig } from "@/config/tokenContractConfig";
import { FormEvent } from "react";
import { nftMarketContractConfig } from "@/config/nftMarketContractConfig";

export default function TokenContract() {
  const { address } = useAccount();

  const { data, error, isPending } = useReadContracts({
    contracts: [
      {
        ...tokenContractConfig,
        functionName: "balanceOf",
        args: [address || `0x${address}`],
      },
      {
        ...tokenContractConfig,
        functionName: "name",
      },
      {
        ...tokenContractConfig,
        functionName: "totalSupply",
      },
    ],
  });

  const [balanceOf, name, totalSupply] = data || [];

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>balance: {balanceOf?.result?.toString()}</div>
      <div>name: {name?.result?.toString()}</div>
      <div>totalSupply: {totalSupply?.result?.toString()}</div>
      <Approve />
    </div>
  );
}

function Approve() {
  const { data: hash, error, writeContract } = useWriteContract();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    const amount = formDate.get("amount") as string;
    writeContract({
      ...tokenContractConfig,
      functionName: "approve",
      args: ["0x3261150cE2beEe2F6B68712F588FEd47B947D9A7", BigInt(amount)],
    });
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input type="number" name="amount" placeholder="amount" required />
        <button type="submit">Approve</button>
        {hash && <div>transaction hash: {hash}</div>}
        {error && <div>Error: {error.message}</div>}
      </form>
    </div>
  );
}
