import {ConnectButton as RConnectButton, RainbowKitProvider} from "@rainbow-me/rainbowkit";

export function ConnectButton() {
    return (
        <RainbowKitProvider>
        <RConnectButton showBalance={false}/>
        </RainbowKitProvider>
    )
}