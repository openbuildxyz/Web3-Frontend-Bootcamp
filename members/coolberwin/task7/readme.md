# Web3 训练营 

task7 任务：补全Aspect demo代码

# 任务要求

```
EVM++探索 - 奖励项目
任务目标

    学习EVM++文档，了解如何使用JavaScript开发Aspect实现EVM合约功能，按照视频教程补全Aspect demo代码。
    学习EVM++用例，构思并开发一个自己的Aspect用例

任务要求
1.按照EVM++技术文档进行学习

学习OpenBuild EVM++中文技术文档 —— Chapter7中第二节EVM++开发基础
2.按照视频教程补全限流器Aspect demo代码($50奖励)

Fork工程文件夹：https://github.com/dumbeng/throttler-aspect/blob/boilerplate/aspect/index.ts 按照教程补全aspect/index.ts中preContractCall()函数
3.EVM++挑战：学习EVM++用例，构思并开发一个自己的Aspect用例($100奖励)

自建Github仓库

    包含以下内容的README文件：
        用例名称和摘要。
        解决方案概述的问题以及团队打算通过创建这个Aspect来解决它的方式。
        项目的设计过程
        这个Aspect为Artela生态系统带来的价值。
    包含工程文件
    提交示范：https://github.com/QiyuanMa/session-key-aspect-example
    提交截止期限为2024年7月31日
    期间如有用例idea/代码实现问题可联系mentor协助，或联系微信mmqiyuan

提交要求

    限流器Aspect补全代码 - 填写问卷提交链接： https://forms.office.com/r/Fa05XQQVKW
    EVM++挑战 - 填写问卷提交链接： https://forms.office.com/r/M2QVqP3g7x

```

## 相关信息

- 安装solc 下载 对应版本 [solc 官方github](https://github.com/ethereum/solidity)
    ```
    chmod +x sol
    sudo mv solc /usr/local/bin/solc

    验证

    solc --version

    Version: 0.8.26+commit.8a97fa7a.Darwin.appleclang
    ```

- 按照视频教程部署 合约

| 文件名      | artela 地址 | 说明                 |
|-------------|--------------|----------------------|
| 创建合约| [0x54b274FB2FC190A441Fd19EB794fd715eb59F730](https://betanet-scan.artela.network/address/0x54b274FB2FC190A441Fd19EB794fd715eb59F730)  |   |


- 参数设置

> npm run aspect:deploy -- --interval 4 --limit 3

## 关键截图



### 1. 命令行 截图


![图片1](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task7/members/coolberwin/task7/img/%E6%95%88%E6%9E%9C%E6%88%AA%E5%9B%BE.png?raw=true)

### 2. 浏览器截图

![图片2](https://github.com/coolberwin/Web3-Frontend-Bootcamp/blob/task7/members/coolberwin/task7/img/%E6%95%88%E6%9E%9C%E6%88%AA%E5%9B%BE2.png?raw=true)


## 结束

---