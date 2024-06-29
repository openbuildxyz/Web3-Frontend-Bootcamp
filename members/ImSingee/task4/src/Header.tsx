import {ConnectButton} from "./ConnectButton.tsx";
import {cn} from "./utils/cn.ts";

export type Props = {
    className?: string
}

export function Header({className}: Props) {
    return (
        <header className={cn("flex flex-row items-center justify-between bg-gray-100", className)}>
            <div className="text-xl font-bold">Bryan's NFT Market</div>
            <ConnectButton/>
        </header>
    )
}