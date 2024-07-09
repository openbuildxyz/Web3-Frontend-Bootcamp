import styles from "./List.module.css";
import { useReadContract, useAccount, useWriteContract } from 'wagmi'
import { getNftFuncVars, NFT_ADDR, getExchangeFuncVars, EXCHANGE_ADDR, getTokenFuncVars } from '../abis/contract';
import { formatUnits } from 'viem'


const List = () => {
  const result = useReadContract(getExchangeFuncVars('getAllNFT'));
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

  return (
    <div className={styles.ListContainer}>
      {nfts.map((nft, index) => (
        <div key={index} className={styles.listItem}>
          <div className={styles.header}></div>
          <div className={styles.price}>{formatUnits(nft.price, 6)} OBT</div>
          {
            nft.isActive ? <div style={{ width: 'calc(100% - 20px)' }} className="ca-btn-grey" onClick={() => buyNft(nft)}>Buy</div> : ""
          }
          <div className={styles.infoContainer}>
            <div className={styles.info} title={nft.nftContract}>NFTContract：{nft.nftContract}</div>
            <div className={styles.info}>SellerAddress：{nft.seller}</div>
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