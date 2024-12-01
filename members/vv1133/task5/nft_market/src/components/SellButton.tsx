import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Button, Modal, Form, Input, InputNumber, message } from 'antd'
import { parseUnits } from 'viem'
import { getNftFuncVars, getExchangeFuncVars } from '../abi/contract'
import { VV_NFT_ADDR, NFT_EXCHANGE_ADDR } from '../abi/contract'
import { Address } from '@ant-design/web3'

function SellButton() {
  const account = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [messageApi, contextHolder] = message.useMessage()
  const [dialogShown, setDialogShown] = useState(false)
  const [form] = Form.useForm()

  const handleSell = () => {
    if (!account) {
      return messageApi.warning('Please connect wallet first.')
    }
  
    setDialogShown(true)
  }
  
  const handleClose = () => {
    form.resetFields()
    setDialogShown(false)
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()
  
    if (values.price === 0) {
      return messageApi.warning('NFT price can not be 0.')
    }
  
    writeContractAsync(getNftFuncVars('setApprovalForAll', [NFT_EXCHANGE_ADDR, true]))
      .then(() => writeContractAsync(getExchangeFuncVars('listNFT', [VV_NFT_ADDR, values.tokenId, parseUnits(`${values.price}`, 6), values.url]))
        .then(res => {
          console.log('sell success: ', res)
          messageApi.success('Sell success')
          handleClose()
        }).catch(err => {
          console.log('sell failed', err.message)
          messageApi.error('Sell failed')
        })
      ).catch(err => {
        console.log('sell failed', err.message)
        messageApi.error('Sell failed')
      })
  }

  return (
    <div>
      {contextHolder}
      <Button type="primary" size="large" onClick={handleSell}>Sell</Button>
      <Modal title="Sell NFT" open={dialogShown} onOk={() => form.submit()} onCancel={handleClose}>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={handleSubmit}>
          <Form.Item label="Contract">
            <Address address={VV_NFT_ADDR} ellipsis={{ headClip: 8, tailClip: 6 }} copyable />
          </Form.Item>
          <Form.Item label="Token ID" name="tokenId" rules={[{ required: true, message: 'Please input NFT token ID!' }]}>
            <InputNumber min={1} precision={0} addonBefore="#" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input NFT price!' }]}>
            <InputNumber min={0} addonAfter="VVT" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="URL" name="url" rules={[{ required: true, message: 'Please input NFT URL!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SellButton;
