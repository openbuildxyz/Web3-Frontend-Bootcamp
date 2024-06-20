import type {IDockNavbar} from "@/types"

// 应用信息
export const GlobalAppMetadata = Object.freeze({
    title: "小莫唐尼",
    subtitle: "Web3 训练营新手玩家",
    description: "您好，您正在发现的是一个正在入门学习 Web3 的新手玩家",
})

// 个人信息
export const WebsiteAuthor = Object.freeze({
    nickname: "小莫唐尼",
    bio: "您好，您正在发现的是一个正在入门学习 Web3 的新手玩家。",
    avatar: "https://blog.925i.cn/upload/avatar.jpg",
    githubId: "XiaoMo-Donald",
    githubLink: "https://github.com/XiaoMo-Donald",
    openbuildWeb3Bootcamp: "https://github.com/openbuildxyz/Web3-Frontend-Bootcamp",
    bootcampTaskLink: "https://github.com/uhalo-web3-dev/Web3-Frontend-Bootcamp-Task",
})

// dock 导航数据
export const DockNavbarList: Readonly<Array<IDockNavbar>> = [
    {
        key: "Todolist",
        title: "Task1",
        desc: "react todolist",
        path: "/todolist",
        icon: ""
    }, {
        key: "Home",
        title: "Home",
        desc: "website home",
        path: "/home",
        icon: ""
    }, {
        key: "Blockchain",
        title: "Task2",
        desc: "blockchain basic",
        path: "/blockchain-basic",
        icon: ""
    },
]

// 本地存储的key值
export const LOCAL_DATA_KEYS = {
    todos: "LOCAL_TODO_LIST"
}
