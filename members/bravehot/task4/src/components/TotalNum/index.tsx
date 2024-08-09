"use client";
import { useMemo } from "react";
import { isEmpty } from "lodash-es";
import { serialize, useReadContract } from "wagmi";

import { abi } from "@/abi/NFTMarket";

const TotalNum: React.FC = () => {
  const totalResult = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as any,
    functionName: "getListedCount",
  });

  const totalCount = useMemo(() => {
    const count = serialize(totalResult.data);
    if (isEmpty(count)) return 0;

    return JSON.parse(count).value;
  }, [totalResult]);

  return totalCount ? `(Total: ${totalCount}) ` : null;
};

export default TotalNum;
