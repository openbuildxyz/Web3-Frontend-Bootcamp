import * as React from "react";
import { Connector, useChainId, useConnect } from "wagmi";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();

  return (
    <div className="buttons flex">
      {connectors.map(
        (connector) =>
          connector.id === "io.metamask" && (
            <Button
              className="button mx-1"
              size="sm"
              key={connector.uid}
              onClick={() => connect({ connector, chainId })}
              type="button"
              variant="secondary">
              {connector.icon && (
                <Image
                  className="mr-1"
                  width={16}
                  height={16}
                  src={connector.icon || ""}
                  alt="connector icon"
                />
              )}
              {connector.name}
            </Button>
          )
      )}
    </div>
  );
}
