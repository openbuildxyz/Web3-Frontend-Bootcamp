import { useEffect } from 'react';
import {useDeployedContractInfo} from './useDeployedContractInfo';
import { useGlobalState } from "~~/services/store/store";


export const useContractData = () => {
  const { data: NFTMarketContractData } = useDeployedContractInfo("NFTMarket");
  const { data: ERC20ContractData } = useDeployedContractInfo("ERC20Token");
  const { data: ERC721ContractData } = useDeployedContractInfo("ERC721Token");

  const setNFTMarketContractData = useGlobalState((state) => state.setNFTMarketContractData);
  const setERC20ContractData = useGlobalState((state) => state.setERC20ContractData);
  const setERC721ContractData = useGlobalState((state) => state.setERC721ContractData);
  const deployedNFTMarketContractData = useGlobalState(state => state.NFTMarketContractData);
  const deployedNFTContractData = useGlobalState(state => state.ERC721ContractData);
  const deployedERC20ContractData = useGlobalState(state => state.ERC20ContractData);
  useEffect(() => {
    if (NFTMarketContractData) setNFTMarketContractData(NFTMarketContractData);
  }, [NFTMarketContractData, setNFTMarketContractData]);

  useEffect(() => {
    if (ERC20ContractData) setERC20ContractData(ERC20ContractData);
  }, [ERC20ContractData, setERC20ContractData]);

  useEffect(() => {
    if (ERC721ContractData) setERC721ContractData(ERC721ContractData);
  }, [ERC721ContractData, setERC721ContractData]);
  return { NFTMarketContractData: deployedNFTMarketContractData, ERC20ContractData: deployedERC20ContractData, ERC721ContractData:deployedNFTContractData };
};
