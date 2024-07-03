import React from "react";
import Link from "next/link";
import BlankTokenList from "./BlankTokenList";

interface Token {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  sold?: boolean;
  listingId?: number;
}

export const TokenCard = ({ token, btnText, btnLink }: { token: Token; btnText: string; btnLink: string }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10 w-96 h-96">
        <img src={token.image} alt={token.name} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center h-30">
        <h2 className="card-title">{token.name}</h2>
        <p>{token.description}</p>
        <div className="card-actions flex items-center">
          {token.sold && <div className="badge badge-ghost">Sold</div>}
          <button className={`btn btn-primary ${token.sold ? "btn-disabled" : ""}`}>
            <Link href={btnLink}>{btnText}</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

const TokenList = ({ tokens, type = "buy" }: { tokens: Token[]; type: "buy" | "sell" }) => {
  if (tokens.length === 0) {
    return <BlankTokenList />;
  }

  const btnText = type === "buy" ? "Buy Now" : "Sell Now";
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {tokens.map((token, index) => {
        const btnLink = type === "buy" ? `/buy/${token.listingId}` : `/listnft/${token.tokenId}`;

        return <TokenCard token={token} key={index} btnText={btnText} btnLink={btnLink} />;
      })}
    </div>
  );
};

export default TokenList;
