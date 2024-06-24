import { Button, message } from 'antd'
import { useAccount } from '@ant-design/web3'
import { useWriteContract } from 'wagmi'

import { genNftFuncVars } from '../../utils'

function MintButton() {
  const { account } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [messageApi, contextHolder] = message.useMessage()

  const handleMint = () => {
    if (!account) {
      return messageApi.warning('Please connect wallet first.')
    }

    writeContractAsync(genNftFuncVars('mint'))
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
    <>
      {contextHolder}
      <Button size="large" onClick={handleMint}>Mint</Button>
    </>
  )
}

export default MintButton
