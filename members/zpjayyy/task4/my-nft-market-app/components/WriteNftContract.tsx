import { useAccount, useEnsName, useWriteContract } from "wagmi";
import { nftContractConfig } from "@/config/nftContractConfig";
import { FormEvent } from "react";

export default function WriteNftContract() {
  return (
    <div>
      <Mint />
      <Approve />
    </div>
  );
}

function Mint() {
  const { data: hash, writeContract } = useWriteContract();
  const { address } = useAccount();

  async function mintClick() {
    if (address) {
      writeContract({
        ...nftContractConfig,
        functionName: "mint",
        args: [address],
      });
    }
  }

  return (
    <div>
      <button className="border-2 border-gray-200" onClick={mintClick}>mint</button>
      {hash && <div>transaction hash: {hash}</div>}
    </div>
  );
}

function Approve() {
  const { data: hash, writeContract } = useWriteContract();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    const tokenId = formDate.get("tokenId") as string;
    writeContract({
      ...nftContractConfig,
      functionName: "approve",
      args: ["0x3261150cE2beEe2F6B68712F588FEd47B947D9A7", BigInt(tokenId)],
    });
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input title="tokenId" name="tokenId" required placeholder="1234" />
        <button type="submit">Approve</button>
        {hash && <div>transaction hash: {hash}</div>}
      </form>
    </div>
  );
}
