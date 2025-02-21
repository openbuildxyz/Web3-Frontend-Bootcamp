import React, { useState } from 'react';
import { Input, Button, message, Tabs, Radio, Popover } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { useWriteContract, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import tokenList from "../tokenList.json";

function LiquidityPool() {
  const { address, isConnected } = useAccount();
  const [messageApi, contextHolder] = message.useMessage();
  const { writeContract } = useWriteContract();
  
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [slippage, setSlippage] = useState(2.5); // 默认滑点值
  
  // 路由合约地址
  const ROUTER_ADDRESS = "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3";

  // 处理滑点设置改变
  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  async function addLiquidity() {
    try {
      const tokenA = tokenList[0];
      const tokenB = tokenList[1];
      
      const amountADesired = parseUnits(tokenAAmount, tokenA.decimals);
      const amountBDesired = parseUnits(tokenBAmount, tokenB.decimals);
      
      // 使用用户设置的滑点
      const slippagePercent = 100 - slippage;
      const amountAMin = amountADesired.mul(slippagePercent).div(100);
      const amountBMin = amountBDesired.mul(slippagePercent).div(100);
      
      console.log("添加流动性参数:", {
        滑点: slippage + "%",
        tokenA最小数量: formatUnits(amountAMin, tokenA.decimals),
        tokenB最小数量: formatUnits(amountBMin, tokenB.decimals)
      });
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      await writeContract({
        address: ROUTER_ADDRESS,
        abi: ["function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline)"],
        functionName: "addLiquidity",
        args: [
          tokenA.address,
          tokenB.address,
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          address,
          deadline
        ]
      });

      messageApi.success("流动性添加成功");
    } catch (error) {
      console.error("添加流动性失败:", error);
      messageApi.error("添加流动性失败: " + error.message);
    }
  }

  async function removeLiquidity() {
    try {
      const tokenA = tokenList[0];
      const tokenB = tokenList[1];
      const liquidity = parseUnits(tokenAAmount, 18);
      
      // 计算最小获取数量，使用设置的滑点
      const totalExpected = parseUnits(tokenAAmount, tokenA.decimals);
      const minAmount = totalExpected.mul(100 - slippage).div(100);
      
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      console.log("移除流动性参数:", {
        滑点: slippage + "%",
        最小获取数量: formatUnits(minAmount, tokenA.decimals)
      });

      await writeContract({
        address: ROUTER_ADDRESS,
        abi: ["function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline)"],
        functionName: "removeLiquidity",
        args: [
          tokenA.address,
          tokenB.address,
          liquidity,
          minAmount,
          minAmount,
          address,
          deadline
        ]
      });

      messageApi.success("流动性移除成功");
    } catch (error) {
      console.error("移除流动性失败:", error);
      messageApi.error("移除流动性失败: " + error.message);
    }
  }

  const settings = (
    <>
      <div>滑点容差</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <div className="liquidityPool">
      {contextHolder}
      <div className="liquidityHeader">
        <h4>流动性管理</h4>
        <Popover
          content={settings}
          title="设置"
          trigger="click"
          placement="bottomRight"
        >
          <SettingOutlined className="cog" />
        </Popover>
      </div>
      <Tabs
        items={[
          {
            key: 'add',
            label: '添加流动性',
            children: (
              <div className="addLiquidity">
                <Input
                  placeholder="Token A 数量"
                  value={tokenAAmount}
                  onChange={(e) => setTokenAAmount(e.target.value)}
                />
                <Input
                  placeholder="Token B 数量"
                  value={tokenBAmount}
                  onChange={(e) => setTokenBAmount(e.target.value)}
                />
                <Button 
                  onClick={addLiquidity} 
                  disabled={!isConnected || !tokenAAmount || !tokenBAmount}
                >
                  添加流动性
                </Button>
              </div>
            ),
          },
          {
            key: 'remove',
            label: '移除流动性',
            children: (
              <div className="removeLiquidity">
                <Input
                  placeholder="LP Token 数量"
                  value={tokenAAmount}
                  onChange={(e) => setTokenAAmount(e.target.value)}
                />
                <Button 
                  onClick={removeLiquidity} 
                  disabled={!isConnected || !tokenAAmount}
                >
                  移除流动性
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default LiquidityPool;
