import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi'
import { contractInfo } from './utils/const';
function App() {
  const { address } = useAccount();
  const { data: paymentToken } = useReadContract({
    abi: contractInfo.Market.abi,
    address: contractInfo.Market.address,
    functionName: "paymentToken"
  })

  console.log(paymentToken, address)
  return (
    <>
      <header className='flex justify-end'>
        <ConnectButton />
      </header>
      <main>
        app
      </main>
    </>

  )
}

export default App
