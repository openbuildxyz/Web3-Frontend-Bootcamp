import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { formatAddress } from "@/lib/utils";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formattedAddress = formatAddress(address);

  return (
    <div className="row">
      <div className="flex items-center">
        {ensAvatar ? (
          <Image
            width={12}
            height={12}
            alt="ENS Avatar"
            className="avatar"
            src={ensAvatar}
          />
        ) : (
          <div className="avatar" />
        )}
        <div className="stack mr-2">
          {address && (
            <div className="text">
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </div>
          )}
        </div>
        <Button
          className="button h-6 px-1"
          size="sm"
          variant="destructive"
          onClick={() => disconnect()}
          type="button">
          <LogOut className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    </div>
  );
}
