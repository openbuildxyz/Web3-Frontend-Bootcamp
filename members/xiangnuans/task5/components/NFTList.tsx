"use client";

import { Card, CardBody } from "@nextui-org/react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import MarkContract from "@/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { MarketAddress } from "@/scripts/config";
import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import { useDisclosure } from "@nextui-org/modal";
import { useIsMounted } from "@/hooks/useReadContract";
import { useReadContract } from "wagmi";

export default function NFTList() {
  const mouted = useIsMounted();
  const [listings, setListings] = useState<any>([]);
  const [delisted, setDelisted] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string>("onSell");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const delistedResult: any = useReadContract({
    abi: MarkContract.abi,
    address: MarketAddress,
    functionName: "getAllDelisted",
    query: {
      refetchInterval: 3000,
    },
  });
  console.log("fetching delisted NFTs:", delistedResult, delistedResult?.data);

  const listingsResult: any = useReadContract({
    abi: MarkContract.abi,
    address: MarketAddress,
    functionName: "getAllListings",
    query: {
      refetchInterval: 3000,
    },
  });

  console.log("fetching listings:", listingsResult, listingsResult.data);

  useEffect(() => {
    if (listingsResult?.error) {
      // console.error("Error fetching listings:", listingsResult?.error);
      return;
    }
    if (listingsResult?.data) {
      setListings(listingsResult?.data ?? []);
    }
  }, [listingsResult?.data]);

  useEffect(() => {
    if (delistedResult?.error) {
      // console.error("Error fetching delisted NFTs:", delistedResult?.error);
      return;
    }
    if (delistedResult?.data) {
      setDelisted(delistedResult?.data ?? []);
    }
  }, [delistedResult?.data]);

  const EmptyComponent = ({ children }: any) => {
    return (
      <div className=" flex items-center justify-center h-96">{children}</div>
    );
  };

  const tabs = [
    {
      id: "onSell",
      label: "On Sell",
      content: (
        <>
          <div className="flex justify-end">
            <Button
              key={"2"}
              className="bg-[#0E76FD] text-white py-2 px-4 rounded h-10 cursor-pointer mr-4 mb-5"
              onPress={onOpen}
            >
              List NFT
            </Button>
          </div>
          {listings.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listings?.map((listing: any, index: number) => (
                <NFTCard
                  key={index}
                  index={index}
                  listing={listing}
                  type="onSell"
                />
              ))}
            </div>
          ) : (
            <EmptyComponent>No listings available</EmptyComponent>
          )}
        </>
      ),
    },
    {
      id: "delisted",
      label: "Delisted",
      content: (
        <>
          {delisted.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {delisted?.map((listing: any, index: number) => (
                <NFTCard
                  key={index}
                  index={index}
                  listing={listing}
                  type={"delisted"}
                />
              ))}
            </div>
          ) : (
            <EmptyComponent>No delisted NFTs available</EmptyComponent>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {mouted ? (
        <div className="container mx-auto max-w-screen-2xl pt-10 px-6">
          {isOpen && <NFTModal isOpen={isOpen} onClose={onClose} />}
          <Tabs
            selectedKey={activeTab}
            items={tabs}
            onSelectionChange={(value) => setActiveTab(value as string)}
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <Card>
                  <CardBody>{item.content}</CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </div>
      ) : null}
    </>
  );
}
