import { Nftsum, Nftem, Nftag } from "../../model";
import { useWriteContract } from "wagmi";
import { mket_abi, mket_adr } from "../../contracts/Mket";
import { abee_abi, abee_adr } from "../../contracts/Abee";

export function assemble(tems: Nftem[], tags: Nftag[]): Nftsum[] {
  const sums: Nftsum[] = []
  for (let i = 0; i < tems.length; i++) {
    sums.push({
      nftContract: tags[i].nftContract,
      nftID: tags[i].nftID,
      owner: tems[i].owner,
      nftURI: tems[i].nftURI,
      price: tems[i].price,
      tstamp: tems[i].tstamp,
      listing: tems[i].listing,
      onceupon: tems[i].onceupon
    })
  }
  return sums
}

function formatTimestamp(timestamp: bigint): string {
  const date = new Date(Number(timestamp) * 1000)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
}

export function Nft(sum: Nftsum) {
  const { isPending, writeContractAsync } = useWriteContract()

  const handleTrade = () => {
    writeContractAsync({
      address: abee_adr,
      abi: abee_abi,
      functionName: 'approve',
      args: [mket_adr, sum.price]
    }).then(
      () => {
        writeContractAsync({
          address: mket_adr,
          abi: mket_abi,
          functionName: 'trade',
          args: [sum.nftContract, sum.nftID]
        }).then(res => console.log("successful: ", res)).catch(err => console.log("failed: ", err))
      }
    ).catch(err => console.log("failed: ", err))
  }
  const truncate = (address: string) => address.slice(0, 5) + '..';

  return (
    <div className="flex flex-col items-start rounded-lg border border-gray-300 p-4 bg-white shadow-lg max-w-md">
      <div className="flex items-start space-x-4">
        <img
          src={sum.nftURI || "https://www.alfredocreates.com/wp-content/uploads/2018/06/Black-White-Super-Mario-Pixel-Art-Icon-Design.jpg"}
          alt="NFT Image"
          className="rounded-lg object-cover self-center"
          width={100}
          height={100}
        />
        <div className="grid grid-cols-2 text-sm p-2">
          <span className="font-mono text-gray-700">Owner</span>
          <div>
            <span
              className="mb-2 font-mono text-gray-900 truncate cursor-pointer"
              title={sum.owner}
            >
              {truncate(sum.owner)}
            </span>
            <button onClick={() => {
              navigator.clipboard.writeText(sum.owner).then(() => { console.log(sum.owner) })
            }} className="ml-1 text-blue-500 hover:underline">Copy</button>
          </div>

          <span className="font-mono text-gray-700">Contract </span>
          <div>
            <span
              className="mb-2 font-mono text-gray-900 truncate cursor-pointer"
              title={sum.nftContract}
            >
              {truncate(sum.nftContract)}
            </span>
            <button onClick={() => {
              navigator.clipboard.writeText(sum.nftContract).then(() => { console.log(sum.nftContract) })
            }} className="ml-1 text-blue-500 hover:underline">Copy</button>
          </div>

          <span className="font-mono text-gray-700">TokenID </span>
          <span className="text-gray-900">{Number(sum.nftID)}</span>

          <span className="font-mono text-gray-700">Price </span>
          <span className="text-gray-900">{Number(sum.price)}</span>

          <span className="font-mono text-gray-700">Since </span>
          <span className="text-gray-900">{formatTimestamp(sum.tstamp)}</span>

          <button
            type="button"
            className="col-span-2 mt-2 bg-black text-white font-mono px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2"
            onClick={handleTrade}
            disabled={isPending}
          >
            BUY
          </button>
        </div>
      </div>
    </div >
  );
} 
