## 1 项目整体设计

### 1.1 购买须知

​	购买时首先要有一定的OBT，可以在用户信息栏右边进行MintOBT的操作，默认以此Mint10个OBT。购买需要先授权OBT给NFTMarket合约，需点击“approve 10 OBT”来授权10个OBT，而后才能成功购买。

### 1.2 上架须知

​	如果账户没有NFT，需要先点击“MintNFT”来Mint自己的NFT，Mint后点击上架按钮输入NFT的信息后才可上架。第一次上架时点击确认上架按钮后需要先进行授权的合约合约交互处理，然后才是上架的合约交互。首次授权以后，后续的上架都不需要再进行授权的操作。

### 1.3 代码设计

​	后端的合约代码相较于task3的代码有所更新，是因为在开发过程中发现市场合约还需要提供一些基本接口，以及NFT合约也重写了tokenURI以防后续使用等。前端使用nextjs框架配合wagmi等包的使用，交互性上后续有待提升。

![image-20240620121536071](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240620121536071.png)





## 2 前端组件功能实现：

### 2.1 连接钱包

​	连接钱包使用的是RainbowKit组件 ，使用方式是导入相应的包然后在layout.tsx中配置相关组件结构，并在config.tsx中编写基本配置。实现了连接主网和测试网，本项目是在测试网上进行测试交互。

![image-20240620114955779](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240620114955779.png)

### 2.2 上架NFT

​	上架NFT实现为点击**上架NFT**按钮后输入NFT合约地址（本项目为WTF的地址），TokenId，以及价格，然后点击**确认上架**提交表单。如果是首次上架则点击上架后会先进行授权操作，然后再上架，后续上架其他NFT过程中则无需授权。

![image-20240620115544977](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240620115544977.png)



![image-20240620115650123](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240620115650123.png)



### 2.3 显示上架的NFT

​	不同用户上架的NFT都会显示在NFTMarket，但是每个NFT都有自己不同的状态，分为“saled”（已售卖）、“ur the seller”（自己就是本NFT的卖家）、“购买”（购买别人的NFT）。其中只有“购买”可以点击购买。每个NFTItem都会展示该NFT的基本信息。

![image-20240620120039738](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240620120039738.png)

### 2.4 购买NFT

​	点击可购买NFT后的“购买”按钮后，可以进行此NFT的购买，点击购买在钱包确认后，等待交易处理，刷新页面即可更新最新的列表状态，被购买的NFTItem会更新自己的状态。（示例购买Token ID为3的NFT）

![image-20240620120445879](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240620120445879.png)

![image-20240620120620081](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240620120620081.png)



