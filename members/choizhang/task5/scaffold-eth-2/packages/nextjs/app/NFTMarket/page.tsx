import DebugContracts from "./_components/DebugContracts";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contracts",
  description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
});

const NFTMarket: NextPage = () => {
  return (
    <>
      <div className="text-center bg-secondary">
        <h1 className="text-4xl my-0">NFTMarket</h1>
      </div>
      <DebugContracts />
    </>
  );
};

export default NFTMarket;
