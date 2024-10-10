import { Layout, Flex, Space } from 'antd'
import { Connector, ConnectButton } from '@ant-design/web3'

import SellButton from '../sell-button'
import MintButton from '../mint-button'
import NftList from '../nft-list'

import Container from './Container'
import './style.css'

function App() {
  const containerStyle = { maxWidth: 1280, margin: '0 auto' }

  return (
    <Container>
      <Layout>
        <Layout.Header style={{ backgroundColor: '#ccc' }}>
          <Flex align="center" justify="space-between" style={containerStyle}>
            <div style={{ fontSize: 24 }}>RaiGallery</div>
            <Space>
              <SellButton />
              <MintButton />
              <Connector modalProps={{ mode: 'simple' }}>
                <ConnectButton size="large" />
              </Connector>
            </Space>
          </Flex>
        </Layout.Header>
        <Layout.Content>
          <div style={{ ...containerStyle, padding: 24 }}>
            <NftList />
          </div>
        </Layout.Content>
      </Layout>
    </Container>
  )
}

export default App
