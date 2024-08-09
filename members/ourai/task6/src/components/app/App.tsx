import { Layout, Flex, Space } from 'antd'
import { Connector, ConnectButton } from '@ant-design/web3'

import Swapper from '../swapper'

import Container from './Container'
import './style.css'

function App() {
  const containerStyle = { maxWidth: 1280, margin: '0 auto' }

  return (
    <>
      <Container>
        <Layout style={{ height: '100%' }}>
          <Layout.Header style={{ backgroundColor: '#ccc' }}>
            <Flex align="center" justify="space-between" style={containerStyle}>
              <div style={{ fontSize: 24 }}>RaiDEX</div>
              <Space>
                <Connector modalProps={{ mode: 'simple' }}>
                  <ConnectButton size="large" profileModal={false} actionsMenu />
                </Connector>
              </Space>
            </Flex>
          </Layout.Header>
          <Layout.Content>
            <div style={{ ...containerStyle, padding: 24 }}>
              <Swapper />
            </div>
          </Layout.Content>
        </Layout>
      </Container>
    </>
  )
}

export default App
