import styles from "./List.module.css";
import { useReadContract, useAccount, useWriteContract } from 'wagmi'
import { getNftFuncVars, NFT_ADDR, getExchangeFuncVars, EXCHANGE_ADDR, getTokenFuncVars } from '../abis/contract';
import { formatUnits } from 'viem'


const List = () => {
  const result = useReadContract(getExchangeFuncVars('getAllNFT'));
  console.log(result);
  const nfts = (result.data || []) as any[];

  const account = useAccount();
  const { writeContractAsync } = useWriteContract()

  const buyNft = async (nft: any) => {
    const loadingDiv = document.getElementById("loading") as HTMLElement;
    if (nft.isActive == false) {
      return alert(`NFT ${nft.nftContract}#${Number(nft.tokenId)} is not active, you cannot buy it.`)
    }
    if (!account) {
      return alert('Please connect wallet first.')
    }

    if (nft.seller === account.address) {
      return alert(`NFT ${nft.nftContract}#${Number(nft.tokenId)} is your published NFT, you cannot buy it.`)
    }

    try {
      loadingDiv.style.display = "flex";
      const approveRes = await writeContractAsync(getTokenFuncVars('approve', [EXCHANGE_ADDR, nft.price]));
      console.log('approve success', approveRes);
      const res = await writeContractAsync(getExchangeFuncVars('buyNFT', [nft.nftContract, formatUnits(nft.tokenId, 0)]));
      console.log('buyNFT success', res);
      alert('Buy NFT success, please wait for the transaction to be confirmed.');
    } catch (err: any) {
      console.log('buy failed', err.message)
      alert(err.message);
    } finally {
      loadingDiv.style.display = "none";
    }
  }

  const unListNft = async (nft: any) => {
    if(nft.seller!== account.address){
      return alert(`NFT ${nft.nftContract}#${Number(nft.tokenId)} is not your published NFT, you cannot unlist it.`)
    }
    if(nft.isActive == false){
      return alert(`NFT ${nft.nftContract}#${Number(nft.tokenId)} is already unlisted.`)
    }
    const loadingDiv = document.getElementById("loading") as HTMLElement;
    try {
      loadingDiv.style.display = "flex";
      const res = await writeContractAsync(getExchangeFuncVars('UnlistingNFT', [nft.nftContract, formatUnits(nft.tokenId, 0)]));
      console.log('buyNFT success', res);
      alert('Unlist NFT success, please wait for the transaction to be confirmed.');
    } catch (error:any) {
      alert(error.message);
    } finally {
      loadingDiv.style.display = "none";
    }
  }

  const isOwner = (nft: any) => {
    return nft.seller === account.address
  }

  const renderBtn = (nft:any) =>{
    if (isOwner(nft) && nft.isActive == true) {
      return (
        <div style={{ width: 'calc(100% - 20px)' }} className="ca-btn-red" onClick={() => unListNft(nft)}>UnList</div>
      )
    }else if (nft.isActive == true) {
      return (
        <div style={{ width: 'calc(100% - 20px)' }} className="ca-btn-grey" onClick={() => buyNft(nft)}>Buy</div>
      )
    }else{
      return "";
    }
  }

  const formatDate = (timeStamp: string) => {
    const date = new Date(Number(timeStamp) * 1000);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以需要+1
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  }
  return (
    <div className={styles.ListContainer}>
      {nfts.map((nft, index) => (
        <div key={index} className={styles.listItem}>
          <img className={styles.header} src={nft.tokenUrl} alt={nft.nftContract} />
          <div className={styles.price}>{formatUnits(nft.price, 6)} OBT</div>
          { renderBtn(nft) }
          <div className={styles.infoContainer}>
            <div className={styles.info} title={nft.nftContract}>NFTContract：{nft.nftContract}</div>
            <div className={styles.info}>SellerAddress：{nft.seller}</div>
            <div className={styles.info}>CreateTime: {formatDate(nft.createTime)}</div>
            <div className={styles.info}>TokenId：{formatUnits(nft.tokenId, 0)}</div>
            <div className={styles.info}>Status：<span className={nft.isActive == true ? styles['info-active'] : styles['info-inactive']}>{nft.isActive == true ? "Untraded" : "Traded"}</span></div>
          </div>
        </div>
      ))}
      {
        nfts.length === 0 && <div className={styles.empty}>No NFT</div>
      }
    </div>
  )
};

export default List;