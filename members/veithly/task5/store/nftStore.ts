import { makeAutoObservable } from 'mobx';

export interface NFTStoreType {
  dataNeededToRefresh: boolean;
  refetchNFTs: () => void;
  fetchDataIfNeeded: () => void;
}

class NFTStore implements NFTStoreType {
  dataNeededToRefresh: boolean = false;

  constructor() {
      makeAutoObservable(this);
  }

  refetchNFTs = () => {
     this.dataNeededToRefresh = true;
  };

  fetchDataIfNeeded = () => {
     this.dataNeededToRefresh = false;
  };
}

const nftStore = new NFTStore();

export default nftStore;
