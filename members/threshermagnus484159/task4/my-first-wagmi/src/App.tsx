import React from 'react';
import type { ConnectModalProps } from '@ant-design/web3';
import { ConnectButton, Connector } from '@ant-design/web3';
import {  ConfigProvider ,Layout,Space} from 'antd';
import { customToken } from './tokens.ts';
import Container from './Container'

import MINTButton from './components/MINTbutton.tsx'
import ListButton from './components/LISTbutton.tsx'
import MarketModule from './components/MARKETmodule.tsx'



const App: React.FC = () => {
  const [mode] = React.useState<ConnectModalProps['mode']>('simple');
  const [quickConnect] = React.useState<boolean>(true);


  return (
    <Container>

      <Layout>
        <Layout.Header>
            <ConfigProvider theme={customToken }>        
        <Space>
          <Connector
            modalProps={{
              mode,
            }}
          >
          <ConnectButton quickConnect={quickConnect} />
        </Connector>
        <MINTButton  />
        <ListButton  />
        </Space>              
      </ConfigProvider>

      </Layout.Header>
        <Layout.Content>
         <MarketModule/>
        </Layout.Content>
      </Layout>
  </Container>

  );
};

export default App;