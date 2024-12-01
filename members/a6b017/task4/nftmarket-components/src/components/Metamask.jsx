import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from '@web3uikit/core';
import { useEffect, useState } from "react";


export default function MetaMask() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  //定义需要同步的两个组件共用信息，即将登陆账户的信息传入accountdetail组件中
  const [loginAccount, setLoginAccount] = useState({})

  // 监控account的属性变化，当account发生变化时，更新loginAccount
  useEffect(() => {
    let loginAccount = {
      address: account.address,
      chainId: account.chain?.id,
      chainName: account.chain?.name,
    }
    setLoginAccount(loginAccount)
    //sendLoginAccount(loginAccount)
    console.log('Metamask-useEffect-setLoginAccount ', Date(), loginAccount)
  }, [account.address, account.chain?.id, account.chain?.name])

  const toConnectWallet = connectors.map((connector) => (
    <Button
      text="连接钱包"
      key={connector.uid}
      onClick={() => {
        connect({ connector: connectors[0] });
        console.log('Metamask-toConnectWallet-onClick-connect', Date(), loginAccount)
      }}
    >
      {connector.name}
    </Button>
  ))

  function connectedWallet() {
    //setMetaMaskAccount(account)
    return (<div>
      {account.chain?.name} NET: {account.addresses?.[0] ?? "-"}
      <button className="button" type="button" onClick={() => {
        disconnect()
        //sendLoginAccount(loginAccount)
        console.log('Metamask-connectedWallet-onClick-disconnect', Date(), loginAccount)
      }}>
        Disconnect </button>
    </div>
    )
  }

  return (
    <div>
      {account.status === "connected" ? connectedWallet() : toConnectWallet}
    </div>
  );
}
