import ConnectWallet from "../components/ConnectWallet";
import ListNFT from "../components/ListNFT";
import NFTList from "../components/NFTList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <ConnectWallet />
      <ListNFT />
      <NFTList />
    </div>
  );
}
