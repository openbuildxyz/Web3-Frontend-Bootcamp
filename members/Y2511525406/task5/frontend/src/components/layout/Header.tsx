/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-26 14:39:30
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-26 14:52:28
 * @Description:
 */
import Logo from "@/assets/images/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <img src={Logo.src} alt="" className="w-14" />
      <div>
        <ConnectButton></ConnectButton>
      </div>
    </div>
  );
}
