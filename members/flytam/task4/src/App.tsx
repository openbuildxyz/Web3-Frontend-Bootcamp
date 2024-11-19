import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ListNFT } from './ListNFT'
import { BuyNFT } from './BuyNFT'

function App() {
  const account = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          Status: {account.status}
          <br />
          User Address: {account.addresses?.[0] ?? '-'}
          <br />
          CurrentChain: {account.chain?.name}
        </div>

        {account.status === 'connected' ? (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        ):     connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
      </div>
      <hr/>

     
      <hr/>
      <div>
        <h2>Operation - List NFT</h2>
        <ListNFT/>
      </div>
      <hr/>
      <div>
        <h2>Operation - Purchase NFT</h2>
        <BuyNFT/>
      </div>
    </>
  )
}

export default App
