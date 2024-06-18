import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

interface IAppLayoutProps {
  children: ReactNode;
}
export function AppLayout(props: IAppLayoutProps) {
  const { children } = props;
  return (
    <>
      <header className="flex justify-end">
        <ConnectButton />
      </header>
      <main>{children}</main>
    </>
  );
}
