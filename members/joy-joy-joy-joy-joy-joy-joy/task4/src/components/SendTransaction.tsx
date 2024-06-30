import { useEffect, useState } from 'react';
import {
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from 'wagmi';
import { abi } from '../abi';
import { config } from '../wagmi';
import { List } from './Listingsandbuy';

// 定义挂单信息的类型
interface Listing {
  seller: string;
  nftAddr: string;
  tokenId: string;
  price: string;
}

export function ListNFT() {
  const [approvalHash, setApprovalHash] = useState('');
  const [transactionHash, setTransactionHash] = useState(null);
  const [nftaddr, setNftAddr] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const [listings, setListings] = useState<Listing[]>(() => {
    // 在组件初始化时从localStorage加载数据，如果没有则返回一个空数组
    const savedListings = localStorage.getItem('listings');
    return savedListings ? JSON.parse(savedListings) : [];
  });
  const pollingInterval = 3000;

  const {
    error: approvalError,
    isPending: isApprovalPending,
    writeContractAsync: writeApprovalContract,
  } = useWriteContract();
  const {
    error: listError,
    isPending: isListPending,
    writeContractAsync: writeListContract,
  } = useWriteContract();

  const { isLoading: isApprovalConfirming, status: isApprovalConfirmed } =
    useWaitForTransactionReceipt({
      hash: approvalHash,
    });

  const { isLoading: isTransactionConfirming, status: isTransactionConfirmed } =
    useWaitForTransactionReceipt({
      hash: transactionHash,
    });

  useWatchContractEvent({
    address: '0xe43ff92d19a030C5181444897e7a825458d2b389',
    config,
    abi,
    eventName: 'List',
    onLogs(logs: any[]) {
      logs.forEach((log) => {
        const { args } = log; // 获取事件日志的args部分
        const { seller, nftAddr, tokenId, price } = args; // 解构args对象

        // 更新挂单列表状态
        setListings((prevListings) => [
          ...prevListings,
          {
            seller,
            nftAddr,
            tokenId: tokenId.toString(),
            price: price.toString(),
          },
        ]);
      });
    },
  });

  const handleApprovalSuccess = (data: { hash: string }) => {
    setApprovalHash(data.hash);
  };

  const handleListTransaction = async () => {
    try {
      const listTx = await writeListContract({
        address: '0xe43ff92d19a030C5181444897e7a825458d2b389',
        abi,
        functionName: 'list',
        args: [nftaddr, tokenId, price],
      });

      if (listTx) {
        setTransactionHash(listTx);
      } else {
        console.error('List transaction failed: No transaction returned');
      }
      if (isTransactionConfirmed === 'success') {
        console.log('List Transaction is confirmed!');
      }
    } catch (err) {
      console.error('List transaction error:', err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isApprovalConfirmed === 'success') {
        // 在status为success时执行后续逻辑
        console.log('Approve Transaction is confirmed!');
        handleListTransaction();
        clearInterval(intervalId); // 停止轮询
      }
    }, pollingInterval);

    // 清除定时器
    return () => clearInterval(intervalId);
  }, [isApprovalConfirmed, pollingInterval]); // 依赖isApprovalConfirmed和pollingInterval

  // 在挂单数据变化时保存到localStorage
  useEffect(() => {
    localStorage.setItem('listings', JSON.stringify(listings));
  }, [listings]);

  async function submit(e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) {
    e.preventDefault();
    try {
      console.log('Calling writeApprovalContract with:', {
        abi,
        address: nftaddr,
        functionName: 'approve',
        args: ['0xe43ff92d19a030c5181444897e7a825458d2b389', tokenId],
      });
      const approvalTx = await writeApprovalContract({
        abi,
        address: nftaddr,
        functionName: 'approve',
        args: ['0xe43ff92d19a030c5181444897e7a825458d2b389', tokenId],
        onSuccess: handleApprovalSuccess,
      });

      if (approvalTx) {
        setApprovalHash(approvalTx);
      }
    } catch (err) {
      console.error('Transaction failed', err);
    }
  }

  return (
    <div className="container">
      <div className="stack">
        <form className="set" onSubmit={submit}>
          <input
            name="nftaddr"
            placeholder="NFTADDR"
            required
            value={nftaddr}
            onChange={(e) => setNftAddr(e.target.value)}
          />
          <input
            name="tokenId"
            placeholder="TOKENID"
            required
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
          />
          <input
            name="price"
            placeholder="PRICE"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button disabled={isApprovalPending || isListPending} type="submit">
            {'List'}
          </button>
        </form>
        {isApprovalConfirming && (
          <div>Waiting for approval confirmation...</div>
        )}
        {isTransactionConfirming && (
          <div>Waiting for list transaction confirmation...</div>
        )}
        {isApprovalConfirmed == 'success' && (
          <div>Approve transaction confirmed.</div>
        )}
        {isTransactionConfirmed == 'success' && (
          <div>List transaction confirmed.</div>
        )}
        {(approvalError || listError) && (
          <div>Error: {(approvalError || listError).message}</div>
        )}
      </div>
      <List listings={listings} setListings={setListings} />
    </div>
  );
}
