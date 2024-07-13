import { ConnectButton } from "@rainbow-me/rainbowkit";
import MintButton from "../components/MintButton";
import SellButton from "../components/SellButton";
import NftList from "../components/NftList";
import Head from "next/head";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Layout, Flex, Space } from 'antd'

export default function Home() {
  const e = useAccount();
  console.log(e)
  return (
    <div>
      <Head>
        <title>VV NFT Exchange</title>
      </Head>

      <Layout>
        <Layout.Header style={{ backgroundColor: '#ccc' }}>
          <Space style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <MintButton></MintButton>
              <SellButton></SellButton>
            </div>
            <div>
              <ConnectButton></ConnectButton>
            </div>
          </Space>
        </Layout.Header>
        <Layout.Content>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: 24 }}>
            <NftList></NftList>
          </div>
        </Layout.Content>
      </Layout>
    </div>
  );
}
