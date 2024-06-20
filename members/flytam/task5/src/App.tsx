import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { NFT } from './NFT'

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
      <div>
        <h2>Operation</h2>
        <NFT/>
      </div>
    </>
  )
}

export default App
