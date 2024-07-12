import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useReadContract,
  useWatchContractEvent,
  useWriteContract
} from "wagmi";
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar";
import {Divider} from "@nextui-org/divider";
import {nftMarketContractConfig} from "@/config/nftMarketContractConfig";
import {readContract} from "@wagmi/core";
import {config} from "@/config/config";
import {nftContractConfig} from "@/config/nftContractConfig";
import {useState} from "react";
import {set} from "idb-keyval";

export default function Account() {
  const {address} = useAccount();
  const {disconnect} = useDisconnect();
  const {data: ensName} = useEnsName();
  const {data: ensAvatar} = useEnsAvatar();

  const [owner, setOwner] = useState("");

  useWatchContractEvent({
    ...nftMarketContractConfig,
    eventName: "Purchase",
    onLogs(logs) {
      console.log(logs);
      const tokenId = logs[0].args.tokenId;
      const buyer = logs[0].args.buyer;
      setOwner(`${buyer} is owner with ${tokenId}`)
    }
  })

  return (
    <Card className="">
      <CardHeader className="flex gap-3">
        <Avatar src={ensAvatar || ""}/>
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      </CardHeader>
      <Divider/>
      <CardBody className="flex flex-col">
        <p>jay nft market</p>
        <p>{owner}</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Button className="bg-blue-400" onClick={() => disconnect()}>Disconnect</Button>
      </CardFooter>
    </Card>
  );
}
