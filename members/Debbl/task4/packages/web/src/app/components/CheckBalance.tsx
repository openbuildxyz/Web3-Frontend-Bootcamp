import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { Contract } from "~/constants";

export default function CheckBalance() {
  const account = useAccount();

  const balanceOf = useReadContract({
    ...Contract.Token,
    functionName: "balanceOf",
    args: [account.address!],
  });

  return <>{balanceOf.isSuccess && <div>{formatEther(balanceOf.data)}</div>}</>;
}
