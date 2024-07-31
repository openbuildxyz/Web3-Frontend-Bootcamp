
# 使用本地测试连接

```bash
$ anvil --fork-url https://mainnet.chainnodes.org/要自己去申请 --fork-block-number 17480237 --fork-chain-id 1 --chain-id 31337
```

由于局限性、没有能力对流动池的添加删除做测试（主网上我也没有U，所以考虑本地开测，找了许久的文档）。


# 问题

我连接了本地的ETH主网络，可以对合约的地址生成准确的pair，但是，再swap调起按钮，会出现没有反应.


一开始我以为是wagmi写的有问题，但是以下代码可以很好的运行与处理得到factory地址。
```
const getFactory = useReadContract({
  address: uniswapRouterContractAddress,
  abi: UniswapV2Router02,
  functionName: "factory",
})
const factoryAddress = getFactory.data;
```

而再使用以下代码，没有反应，我排除了合约地址、abi、wagmi的错误，我实在找不到问题在哪里了。
```
const { writeContract } = useWriteContract();

writeContract({
  address: uniswapRouterContractAddress,
  abi: UniswapV2Router02,
  functionName: "swapExactTokensForETH",
  args: [
    amountIn,
    amountOutMin,
    path,
    to,
    deadline
  ],
  onSuccess: (tx) => {
    console.log("Transaction successful:", tx);
    setTxDetails({
      to: tx.to,
      data: tx.data,
      value: tx.value
    });
  },
  onError: (error) => {
    console.error("Transaction error:", error);
  }
});
```

我都开始怀疑是不是，再测试环境不能调用 swapExactTokensForETH 函数。


老师，你百忙之中要是看到这个问题，希望能给我点帮助。



