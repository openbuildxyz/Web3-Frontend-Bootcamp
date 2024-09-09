import { useAccount } from 'wagmi';
import { ListNFT } from './components/SendTransaction';
import { Account } from './components/Account';
import { Connect } from './components/Connect';
import { ReadContract } from './components/contract';


export default function App() {
  const { isConnected } = useAccount();
  return (
    <>
      {isConnected ? <Account /> : <Connect />}
      { <ListNFT />}
      {<ReadContract />}
    </>
  );
}
