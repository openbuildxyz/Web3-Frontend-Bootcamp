import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Button, Modal, Form, Input, InputNumber, message } from 'antd'
import { getNftFuncVars } from '../abi/contract'

function MintButton() {
  const account = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [messageApi, contextHolder] = message.useMessage()

  const handleMint = () => {
    if (!account) {
      return messageApi.warning('Please connect wallet first.')
    }

    writeContractAsync(getNftFuncVars('mintNFT', [account.address]))
      .then(res => {
        console.log('mint success', res)
        messageApi.success('Mint success')
      })
      .catch(err => {
        console.log('mint failed', err.message)
        messageApi.error('Mint failed')
      })
  }

  return (
    <div>
      <Button type="primary" size="large" onClick={handleMint}>
        Mint
      </Button>
    </div>
  )
}

export default MintButton;
