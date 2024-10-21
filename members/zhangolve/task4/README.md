
# 效果

1. 将NFT的元数据文件上传到Filebase，使用NFT合约的mint方法来mint NFT

2. 这个时候查看My nft页面，发现该页面已经有了刚刚mint的NFT

![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/da568a2b-0443-40ea-9761-7772d3e6a456)

3. 在My NFT 页面点击某个NFT的Sell Button，可以对这个NFT进行上架操作， 输入代币数量，可以进行上架

![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/1aa78882-d4ac-4139-a9e5-cce9410dc892)

完成上架有两个步骤， 一个是调用ERC721合约，允许将NFT转移到NFT Market，下一步就是调用NFT Market的listNFT方法，来完成上架的操作。 完成上架后，有交易成功提示：

![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/fed21775-4d14-483b-ab20-97892919eadb)

4. 回到项目首页，查看当前市场列出的所有NFT，`Buy Now` button 灰掉代表该NFT已经售出，不可买卖。

![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/363430f2-81c1-4099-b10b-85e6cd2fe472)


5. 点击一个NFT  `Buy Now` button进行购买， 如果当前账户代币余额充足（数量大于该NFT价格），则可以购买当前NFT，否则NFT购买详情页面`Buy` button灰掉，不能购买，如果代币余额不足，可以去facuet 水龙头领水

![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/421ea569-4b7f-4364-b9b4-4ca8b230e086)


![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/c2128dbf-b6dc-40cf-b59b-92cd5e874dca)

6. 这个时候购买的话，需要做两步操作，一步是调用ERC20合约，授权NFT Market合约一定数量代币，第二步就是调用NFT Market合约的purchaseNFT方法。 购买成功，有提示文字

![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/85d3ee0c-38e7-40ea-9bb1-9a5ad1d6df6d)

7. 查看My NFT页面，会看到刚刚购买的NFT


![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/b391e465-5613-44f4-a9d7-ab1dedcd7885)

8. 回到项目首页，会看到刚刚购买的NFT已经显示为售出状态


![image](https://github.com/openbuildxyz/Web3-Frontend-Bootcamp/assets/7566337/2668c8c1-8b47-42d6-9cd6-e19d305255be)


