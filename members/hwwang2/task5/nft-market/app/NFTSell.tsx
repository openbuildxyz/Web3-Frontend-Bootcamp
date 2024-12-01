
'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Button, message,Form, Input, Modal, Radio } from "antd";
import {config, SEPOLIA_ALCHMY_KEY, NFT_ADDRESS, TOKEN_ADDRESS, MARKET_ADDRESS} from "./config"
import { Address, NFTCard, Connector, ConnectButton, useAccount } from "@ant-design/web3";
import { localhost, mainnet, sepolia } from "wagmi/chains";
import { createConfig, http, useReadContract, useWriteContract, useWatchContractEvent } from "wagmi";
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet, Sepolia, Mainnet } from "@ant-design/web3-wagmi";
import { erc20Abi, erc721Abi } from 'viem'
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import { MARKET_ABI } from './abi';

interface Values {
    addr: string;
    id: number;
    price: number;
}
  
interface SellNftFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}
  
const SellNftForm: React.FC<SellNftFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Approve to sell nft"
        okText="Sell"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="addr"
            label="NFT Address"
            rules={[{ required: true, message: 'Please input the NFT ADDRESS!' }]}
            initialValue={NFT_ADDRESS}
          >
            <Input />
          </Form.Item>
          <Form.Item name="id" label="NFT ID">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="price" label="price">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

export {SellNftForm};