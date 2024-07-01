import BuyNFT from "@/components/BuyNFT";
import { ConnectWallet } from "@/components/ConnectWallet";
import ListNFT from "@/components/ListNFT";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ConnectWallet />
      <ListNFT />
      <BuyNFT />
    </main>
  );
}
