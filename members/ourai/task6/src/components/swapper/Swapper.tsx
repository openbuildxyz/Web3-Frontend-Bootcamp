import debounce from 'lodash.debounce'
import { useState, useEffect } from 'react'
import { Button, Flex, Spin, message } from 'antd'
import { useAccount } from 'wagmi'
import { SwapOutlined } from '@ant-design/icons'
import { CryptoInput } from '@ant-design/web3'

import { TOKEN_LIST } from '../../helper'
import type { CryptoValue } from './typing'
import { isCryptoValid } from './helper'
import { getSwappedTokenPair, sendSwapTransaction } from './repository'
import style from './style.module.scss'

function Swapper() {
  const [tokenPair, setTokenPair] = useState<CryptoValue[]>([{}, {}])
  const [swapping, setSwapping] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)
  const { chainId, address } = useAccount()
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (!swapping) {
      return
    }

    const [source, target] = tokenPair

    if (!isCryptoValid(source, true) || !isCryptoValid(target)) {
      return setSwapping(false)
    }

    getSwappedTokenPair(chainId!, tokenPair).then(pair => setTokenPair(pair)).finally(() => setSwapping(false))
  }, [tokenPair])

  useEffect(() => {
    if (!sending) {
      return
    }

    sendSwapTransaction(address!, chainId!, tokenPair)
      .then(res => {
        messageApi.success('Send success')
        console.log('send success', res)
      })
      .catch(err => {
        messageApi.error('Error occurred when send transaction')
        console.log('send failed', err)
      })
      .finally(() => setSending(false))
  }, [sending])

  const changeTokenPair = debounce((pair: CryptoValue[]) => {
    setSwapping(true)
    setTokenPair(pair)
  }, 500)

  return (
    <Spin spinning={swapping || sending}>
      <Flex className={style.Swapper} align="center" gap={16} vertical>
        {chainId && address ? (
          <>
            {contextHolder}
            <CryptoInput value={tokenPair[0]} footer={false} tokenList={TOKEN_LIST} onChange={crypto => changeTokenPair([crypto, tokenPair[1]])} />
            <span className={style['Swapper-swapButton']} onClick={() => changeTokenPair([tokenPair[1], tokenPair[0]])}><SwapOutlined className={style['Swapper-swapIcon']} /></span>
            <CryptoInput value={tokenPair[1]} footer={false} tokenList={TOKEN_LIST} onChange={crypto => changeTokenPair([tokenPair[0], crypto])} />
            <Button
              className={style['Swapper-confirmButton']}
              type="primary"
              size="large"
              disabled={!tokenPair[0]?.amount || !tokenPair[1]?.amount}
              onClick={() => setSending(true)}
            >
              Swap
            </Button>
          </>
        ) : <div>Please connect wallet first.</div>}
      </Flex>
    </Spin>
  )
}

export default Swapper
