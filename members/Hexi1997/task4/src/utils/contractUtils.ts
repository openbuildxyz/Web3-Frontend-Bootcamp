import { Contract, ethers } from "ethers";
import { contractInfo, rainbowKitConfig } from "./const";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "../main";
import { pinataConfigs } from "./pinataUtils";

const provider = new ethers.WebSocketProvider(rainbowKitConfig.websocketUrl);

export interface NFTItem {
  name: string;
  description: string;
  image: string;
  id: number;
}

export interface ListItem {
  tokenId: number;
  price: number;
}
class NFTContractUtils {
  private _contract: Contract | null = null;
  private _ins: NFTContractUtils | null = null;
  constructor() {
    if (this._ins) {
      return;
    }
    this._ins = this;
    this._contract = new Contract(
      contractInfo.Erc721Token.address,
      contractInfo.Erc721Token.abi,
      provider
    );
  }

  get contract() {
    return this._contract!;
  }

  async getAllTokenIds() {
    if (!this._contract) return [];
    const logs = await this._contract.queryFilter("Transfer", 0, "latest");
    return [
      ...new Set(
        logs
          .filter((item) => !!item?.topics[3])
          .map((log) => Number(log.topics[3]))
      ),
    ];
  }

  async getTokenMetadata(tokenId: number) {
    return new Promise<NFTItem>((resolve, reject) => {
      readContract(wagmiConfig, {
        address: contractInfo.Erc721Token.address,
        abi: contractInfo.Erc721Token.abi,
        functionName: "tokenURI",
        args: [BigInt(tokenId)],
      })
        .then(fetch)
        .then((v) => {
          return v.json();
        })
        .then((data: NFTItem) => {
          if (!data.image.startsWith("http")) {
            data.image = `${pinataConfigs.gateway}${data.image}`;
          }
          data.id = tokenId;
          resolve(data as NFTItem);
        })
        .catch(reject);
    });
  }

  async getAllNFTs() {
    if (!this._contract) return [];
    const allTokenIds = await this.getAllTokenIds();
    const allPromises = allTokenIds.map(this.getTokenMetadata);
    return await Promise.all(allPromises);
  }

  async getAddressTokenIds(address: string) {
    const allTokenIds = await this.getAllTokenIds();
    const ownerList = await Promise.all(
      allTokenIds.map((id) => {
        return new Promise<string>((resolve, reject) => {
          readContract(wagmiConfig, {
            address: contractInfo.Erc721Token.address,
            abi: contractInfo.Erc721Token.abi,
            functionName: "ownerOf",
            args: [BigInt(id)],
          })
            .then(resolve)
            .catch(reject);
        });
      })
    );
    const myTokenIds = allTokenIds.filter(
      (_, index) => ownerList[index] === address
    );
    return myTokenIds;
  }

  async getAddressNFTs(address: string) {
    if (!this._contract) return [];
    const addressTokenIds = await this.getAddressTokenIds(address);
    const addressPromises = addressTokenIds.map(this.getTokenMetadata);
    return await Promise.all(addressPromises);
  }
}

class FTContractUtils {
  private _contract: Contract | null = null;
  private _ins: FTContractUtils | null = null;

  constructor() {
    if (this._ins) {
      return;
    }
    this._ins = this;
    this._contract = new Contract(
      contractInfo.Erc20Token.address,
      contractInfo.Erc20Token.abi,
      provider
    );
  }

  get contract() {
    return this._contract!;
  }

  async getAddressBalance(address: string) {
    const data = await readContract(wagmiConfig, {
      address: contractInfo.Erc20Token.address,
      abi: contractInfo.Erc20Token.abi,
      functionName: "balanceOf",
      args: [address as `0x${string}`],
    });
    return ethers.formatEther(data);
  }
}

export const nftContractUtils = new NFTContractUtils();
export const ftContractUtils = new FTContractUtils();
