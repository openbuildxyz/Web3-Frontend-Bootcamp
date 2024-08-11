# Charity DAO

慈善 DAO

## 项目概述

一个支持多链的，为普通人/编程小白准备的，为了慈善目的而发行 token / NFT 的平台。

整个项目分为 3 个部分：

1.  Reviewer control ~ 新增/修改/删除 DAO reviewer 名单；
2.  项目申请 ~ 由 DAO reviewer group 投票决定是否通过；
3.  项目创建 ~ 经授权的项目创建者钱包可以创建一个 token / NFT 慈善项目。

## 技术架构

前端：

-   Vite
-   React + React Router
-   Wagmi
-   Typescript

后端：

-   Foundry
-   Solidity

## 核心功能

1.  Reviewer control

-   新增/修改/删除 DAO reviewer 名单；

2.  项目申请

-   申请/修改/删除新项目 ~ 需要填写项目名称，项目信息，联系人，联系方式，项目创建者钱包，筹款目标链名称，筹款目标 Token，筹款目标数额等内容；
-   新项目申请提交之后，由 DAO reviewer group 进行投票，决定是否通过；

3.  项目创建 ~ 经授权的项目创建者钱包可以创建一个 token / NFT 慈善项目。

-   新项目申请通过之后，项目创建者钱包可以创建一个新项目；
-   创建项目时，需要选择是 token 还是 NFT 项目，需要提供代币名称，代币符号，总供应量，uri（如果是 NFT 项目）和受益人钱包地址等信息；
-   筹款完成之后，有一个月的 Grace Period；
-   如果在筹款过程中，或 Grace Period 期间，有人对筹款项目提出异议，在问题被解决之前，项目创建者将无法提取筹集的资金。

## 项目团队

Ric Li C (https://github.com/linghuccc)

## 项目链接

| 链接条目 | 链接地址                                |
| -------- | --------------------------------------- |
| 介绍 PPT | <准备中>                                |
| 源码仓库 | https://github.com/linghuccc/charityDao |
| 演示视频 | <准备中>                                |
| 在线体验 | <准备中>                                |
