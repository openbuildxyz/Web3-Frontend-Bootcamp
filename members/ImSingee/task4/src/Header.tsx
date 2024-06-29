import {ConnectButton} from "./ConnectButton.tsx";
import {cn} from "./utils/cn.ts";
import {BRCBalance} from "./BRCBalance.tsx";

export type Props = {
    className?: string
}

export function Header({className}: Props) {
    return (
        <header className={cn("flex flex-row items-center justify-between gap-2 bg-gray-100", className)}>
            <div className="text-xl font-bold">Bryan's NFT Market</div>
            <BRCBalance className="flex-1 text-right"/>
            <ConnectButton/>
        </header>
    )
}