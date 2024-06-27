# task 5

## 1. 总体展示与说明

​	task5在前两个任务的基础上主要做了部分功能的优化，包括合约上的优化和前端交互逻辑的优化，合约增加了下架功能以及mint NFT时给到了uri参数，方便后续展示NFT所需的存储在ipfs的图片。

![image-20240627123816666](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627123816666.png)



## 2. 详细功能说明与演示

### 2.1 Mint NFT

​	用户点击“**MintNFT**”按钮mint NFT时需选择上传一张此NFT的图片，系统会自动生成对应的tokenId以及调用三方库来上传图片到ipfs后返回资源url来作为此NFT的uri参数。选择完后点击Mint即可等待钱包交互响应，点击确认后成功Mint。（此时未授权未上架不予展示）

![image-20240627124540111](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627124540111.png)

![image-20240627124345312](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627124345312.png)



### 2.2 授权NFT

​	上架前需先授权NFT给商店，商店左上角会有是否授权的展示，若未授权点击授权即可进行授权，等待钱包响应交互后会变为已授权的标识。

![image-20240627124925885](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627124925885.png)

![image-20240627125234361](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627125234361.png)



### 2.3 上架NFT

​	授权后可以上架自己的NFT，输入合约地址（此处默认本项目的ERC721代币地址），tokenId以及价格进行上架，点击上架后在钱包确认交易后等待合约交易完成即可看到自己上架的NFT。

![image-20240627125523788](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627125523788.png)

![image-20240627125659447](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627125659447.png)

​	自己上架的NFT按钮显示为“**ur the seller**”代表卖家为自己不可购买。按钮为绿色的NFT可以点击消费对应的OBT数量进行购买。



### 2.4 购买NFT

​	购买NFT前需先授予商店部分OBT来购买，点击用户信息栏的“approve 10 OBT”即可授予商店10个OBT。授予成功后点击想要购买的NFT的绿色按钮即可购买。购买成功后，对应的商品会下架。

![image-20240627130144032](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627130144032.png)



![image-20240627130254227](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627130254227.png)

![image-20240627130421425](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627130421425.png)



### 2.5 下架NFT

​	点击下架NFT的按钮输入合约地址和tokenId即可下架对应的NFT。

![image-20240627130623706](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627130623706.png)

![image-20240627130657370](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627130657370.png)

![image-20240627130716213](C:\Users\14344\AppData\Roaming\Typora\typora-user-images\image-20240627130716213.png)