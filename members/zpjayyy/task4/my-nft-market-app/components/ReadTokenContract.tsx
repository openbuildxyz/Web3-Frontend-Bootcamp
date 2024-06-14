import { useAccount, useReadContracts } from "wagmi";
import { tokenContractConfig } from "@/config/tokenContractConfig";

export default function ReadTokenContract() {
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
      <div>
        balance: {balanceOf?.result?.toString()}
      </div>
      <div>
        name: {name?.result?.toString()}
      </div>
      <div>
        totalSupply: {totalSupply?.result?.toString()}
      </div>
    </div>
  );
}
