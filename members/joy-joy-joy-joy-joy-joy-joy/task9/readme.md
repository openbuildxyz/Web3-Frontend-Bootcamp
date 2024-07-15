### sepolia nftmarket合约地址
0xe43ff92d19a030C5181444897e7a825458d2b389
### 子图查询链接
https://api.studio.thegraph.com/proxy/83232/theduck/v0.0.1/graphql?query=%7B%0A++lists%28first%3A+5%29+%7B%0A++++id%0A++++seller%0A++++nftAddr%0A++++tokenId%0A++++transactionHash%0A++++price%0A++++blockNumber%0A++++blockTimestamp%0A++%7D%0A++purchases%28first%3A+5%29+%7B%0A++++id%0A++++buyer%0A++++nftAddr%0A++++tokenId%0A++++blockNumber%0A++++blockTimestamp%0A++++price%0A++++transactionHash%0A++%7D%0A%7D
### 部署截图
![logs](image.png)
![query](image-1.png)