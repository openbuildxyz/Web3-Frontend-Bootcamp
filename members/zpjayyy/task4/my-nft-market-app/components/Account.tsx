import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar";
import {Divider} from "@nextui-org/divider";

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName();
  const { data: ensAvatar } = useEnsAvatar();

  return (
    <Card className="bg-gray-200 w-1/3 m-4">
      <CardHeader className="flex gap-3">
        <Avatar src={ensAvatar || ""} />
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>jay nft market</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Button className="bg-blue-400" onClick={() => disconnect()}>Disconnect</Button>
      </CardFooter>
    </Card>
  );
}
