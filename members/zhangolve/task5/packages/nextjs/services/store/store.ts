import { create } from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

interface GlobalState {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
  };
  setNativeCurrencyPrice: (newValue: number) => void;
  setIsNativeCurrencyFetching: (newValue: boolean) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  NFTMarketContractData: any | null;
  ERC20ContractData: any | null;
  ERC721ContractData: any | null;
  setNFTMarketContractData: (data: any) => void;
  setERC20ContractData: (data: any) => void;
  setERC721ContractData: (data: any) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
  },
  setNativeCurrencyPrice: (newValue: number): void =>
    set((state) => ({ nativeCurrency: { ...state.nativeCurrency, price: newValue } })),
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set((state) => ({ nativeCurrency: { ...state.nativeCurrency, isFetching: newValue } })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
  NFTMarketContractData: null,
  ERC20ContractData: null,
  ERC721ContractData: null,
  setNFTMarketContractData: (data: any) => set(() => ({ NFTMarketContractData: data })),
  setERC20ContractData: (data: any) => set(() => ({ ERC20ContractData: data })),
  setERC721ContractData: (data: any) => set(() => ({ ERC721ContractData: data })),
}));
