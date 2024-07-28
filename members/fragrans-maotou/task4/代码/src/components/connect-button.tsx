import { ConnectButton } from '@rainbow-me/rainbowkit';

// import { useConnect } from 'wagmi'
// import { injected } from 'wagmi/connectors'
export const RainConnectButton = () => {
  return (
    <div className='mb-1'>
      <h2>用户的登录钱包</h2>
      <ConnectButton />
    </div>
  );
  // const { connect } = useConnect()
  // return (
  //   <button onClick={() => connect({ connector: injected() })}>
  //     Connect
  //   </button>
  // )
};