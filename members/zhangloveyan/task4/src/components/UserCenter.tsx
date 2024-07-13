import Mint from "./Mint";
import { useAccount, useReadContract } from 'wagmi'
import abi from '../abi';
import { NFTMarket, ShouHuNFT } from '../constant'
import { NFTItem, NFTAllItem } from "./type";
import dayjs from 'dayjs'
import UserList from "./UserList";

function UserCenter() {
    const { address, isConnected } = useAccount();

    // 用户有多少Token
    const { data: userNFT } = useReadContract({
        abi: abi.ShouHuNFT,
        address: ShouHuNFT,
        functionName: 'tokensOfOwner',
        args: [address]
    }) as { data: number[]; }
    console.log("userNFT", userNFT);

    // token对应的 url
    const { data: picUrl } = useReadContract({
        abi: abi.ShouHuNFT,
        address: ShouHuNFT,
        functionName: 'getAllTokenURIs'
    }) as { data: string[]; }
    console.log("picUrl", picUrl);

    // 获取所有上架信息
    const { data: listNFT } = useReadContract({
        abi: abi.NFTMarket,
        address: NFTMarket,
        functionName: 'getAllList',
        args: [ShouHuNFT]
    }) as { data: NFTItem[]; }
    console.log("listNFT", listNFT);

    let temp = [] as NFTAllItem[];

    if (userNFT != undefined && userNFT.length !== 0) {

        for (let index = 0; index < userNFT.length; index++) {
            const url = picUrl[Number(userNFT[index]) - 1];
            const tokenId = Number(userNFT[index]);
            let NFTItem = undefined;
            for (let index = 0; index < listNFT.length; index++) {
                const element = listNFT[index];
                if (element.tokenId == tokenId) {
                    NFTItem = element;
                    break;
                }
            }

            console.log("url", url);
            console.log("NFTItem", NFTItem);
            if (NFTItem == undefined) {
                // 未上架
                temp.push({
                    tokenId: Number(userNFT[index]),
                    nftContract: "-",
                    seller: "-",
                    listTime: "-",
                    pic: url,
                    price: 0,
                    isActive: false,
                })
            } else {
                // 已上架
                temp.push({
                    tokenId: Number(userNFT[index]),
                    nftContract: NFTItem.nftContract,
                    seller: NFTItem.seller,
                    listTime: dayjs(Number(NFTItem.listTime) * 1000).format('YYYY-MM-DD HH:mm:ss'),
                    pic: url,
                    price: Number(NFTItem.price),
                    isActive: NFTItem.isActive,
                })
            }
        }
        console.log("temp", temp);
    }

    return (
        <div>
            <h2>个人中心</h2>
            <Mint />
            <div style={{ display: 'flex', gap: '10px' }}>
                {temp != undefined && temp.map((item: NFTAllItem, index: any) => (
                    <UserList key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default UserCenter;