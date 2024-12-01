"use client";
import Button from "@/components/Button";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { nftAddress, marketAddress, YZQAddress } from "@/utils/contractAddress";
import { MarketABI, NFTABI, TokenABI } from "@/abi";
import { Form, Input, InputNumber, Modal, message } from "antd";
import { useEffect, useState } from "react";
export default function SellButton() {
  const { data, writeContractAsync, isPending } = useWriteContract();
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState(0);
  const [tokenUrl, setTokenUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const [form] = Form.useForm();
  const [txHash, setTxHash] = useState(undefined);

  const {
    data: waitTransationData,
    isError,
    isLoading: loadingTransition,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const approveNFT = () => {
    if (!address) {
      message.error("Please Connect Wallet First");
      return;
    }
    const values = form.getFieldsValue();
    setTokenId(values.tokenId);
    setPrice(values.price);
    setTokenUrl(values.tokenUrl);
    writeContractAsync({
      address: nftAddress,
      abi: NFTABI,
      functionName: "setApprovalForAll",
      args: [marketAddress, true],
    })
      .then((res: any) => {
        console.log("approve", res);
        setTxHash(res); // res就是hash
      })
      .catch((err: any) => {
        console.log("Approval NFT Failed", err);
        toggleModal(false);
      });
  };

  useEffect(() => {
    console.log("我监听到了waitTransationData的变化", waitTransationData);
    if (waitTransationData) {
      sellNFT();
    }
  }, [waitTransationData]);

  const sellNFT = () => {
    writeContractAsync({
      address: marketAddress,
      abi: MarketABI,
      functionName: "sell",
      args: [nftAddress, tokenId, price * 10 ** 18, tokenUrl],
    })
      .then((res: any) => {
        console.log("sell结果", res);
        message.success("Sell Success");
        setTxHash(undefined);
      })
      .catch((err: any) => {
        console.log("Sell Error", err);
        message.error("Sell Error");
        setTxHash(undefined);
      })
      .finally(() => toggleModal(false));
  };

  const toggleModal = (flag: boolean = !isOpen) => {
    // 只要approve或者sell还在执行中 则可关闭弹窗 但不能关了之后重新打开弹窗 要等待执行
    // if (flag && (loadingTransition || isPending)) return;
    form.resetFields();
    setIsOpen(flag);
  };

  return (
    <div>
      <div onClick={() => toggleModal(true)}>
        <Button className="ml-2" isLoading={loadingTransition || isPending}>
          Sell
        </Button>
      </div>
      <Modal
        title="Sell NFT"
        open={isOpen}
        footer=""
        onCancel={() => toggleModal(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={approveNFT}
        >
          <Form.Item label="Contract">
            {/* <Input value={nftAddress} /> */}
            <span>{nftAddress}</span>
          </Form.Item>
          <Form.Item
            label="Token ID"
            name="tokenId"
            rules={[{ required: true, message: "Please input NFT token ID!" }]}
          >
            <InputNumber
              min={1}
              precision={0}
              addonBefore="#"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input NFT price!" }]}
          >
            <InputNumber
              min={0.01}
              addonAfter="YZQ"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="TokenUrl"
            name="tokenUrl"
            rules={[{ required: true, message: "Please input NFT URL!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <div className="flex justify-end">
          {/* 当Approve完成之后显示这个按钮 */}
          <div
            style={{
              display: txHash && waitTransationData?.status ? "block" : "none",
            }}
          >
            <Button isLoading={isPending}>Sell</Button>
          </div>
          {/* 当点击Approve时显示这个按钮 */}
          <div
            style={{
              display: txHash && !waitTransationData?.status ? "block" : "none",
            }}
          >
            <Button isLoading={loadingTransition}>Approve</Button>
          </div>
          {/* 默认显示这个按钮 */}
          <div
            onClick={() => form.submit()}
            style={{ display: txHash ? "none" : "block" }}
          >
            <Button isLoading={isPending}>Sell & Approve</Button>
          </div>
          <div onClick={() => setIsOpen(false)}>
            <Button className="ml-4">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
