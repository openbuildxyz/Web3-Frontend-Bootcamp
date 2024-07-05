import React, {useMemo} from "react";
import Link from "next/link";
import BlankTokenList from "./BlankTokenList";
import DelistModal from '~~/components/nft/DelistModal';  
import { formatUnits } from "viem";


interface Token {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  sold?: boolean;
  listingId?: number;
}

export const TokenCard = ({ token, btnText, btnLink, CustomBtn }: { token: Token; btnText: string; btnLink: string }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10 w-96 h-96">
        <img src={token.image} alt={token.name} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center h-30">
        <h2 className="card-title">{token.name}</h2>
        <p>{token.description}</p>
        <p>tokenId: {parseInt(token.tokenId)}</p>
        {token.price && 
        <p>Price: {formatUnits(token.price,18)}</p>
        }
        <div className="card-actions flex items-center">
          {token.sold && <div className="badge badge-ghost">Sold</div>} 
          {CustomBtn && <CustomBtn/>}
          { !CustomBtn && 
          <button className={`btn btn-primary ${token.sold ? "btn-disabled" : ""}`}>
            <Link href={btnLink}>{btnText}</Link>
          </button>
          }
        </div>
      </div>
    </div>
  );
};

const TokenList = ({ tokens, type = "buy", onDelist }: { tokens: Token[]; type: "buy" | "sell"|"delist" }) => {
  if (tokens.length === 0) {
    return <BlankTokenList />;
  }
  const typeToBtnText = {
    buy: "Buy Now",
    sell: "Sell Now",
    delist: "Delist",
  }
  const btnText = useMemo(()=>{
    return typeToBtnText[type];
}, [type])
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {tokens.map((token,index) => {
        const btnLink = type === "buy" ? `/buy/${token.listingId}` : (type==="sell" ? `/listnft/${token.tokenId}`:'');
        const DetailBtn = ()=>(<DelistModal onDelist={onDelist} token={token} />)
        const CustomBtn = type === "delist" && DetailBtn;
        return <TokenCard token={token} key={index} btnText={btnText} btnLink={btnLink} CustomBtn={CustomBtn}/>;
      })}
    </div>
  );
};

export default TokenList;
