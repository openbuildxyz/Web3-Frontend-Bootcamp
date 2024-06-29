import { ConnectWallet } from "@/components/ConnectWallet";
import NFTList from "@/components/NFTList";

export default function Home() {
  return (
    <div className="relative flex flex-col h-full min-h-screen">
      <ConnectWallet />
      <NFTList />
    </div>
  );
}
