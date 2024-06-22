import Header from "./Header";
import Wallet from "./Wallet";
import ListNFT from "./ListNFT";
import BuyNFT from "./BuyNFT";
import MintNFT from "./MintMyNFT";

function App() {
  return (
    <div>
      <Header />
      <Wallet />
      <MintNFT />
      <ListNFT />
      <BuyNFT />
    </div>
  );
}

export default App;
