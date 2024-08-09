import Image from "next/image";
import Balance from "./Balance";
import Theme from "./Theme";

import { akshar } from "@/context/font";

const Header: React.FC = () => {
  return (
    <div className="w-full py-4 flex flex-end items-center shadow">
      <div className="flex items-end mr-auto">
        <Image
          className="mr-4"
          src="/images/logo.png"
          width={80}
          height={20}
          alt="logo"
          style={{
            width: "80",
            height: "auto",
          }}
        />
        <p className={`text-3xl ${akshar.className}`}>Kabutack NFT Market</p>
      </div>

      <div className="flex gap-2 items-center">
        <Balance />
        <w3m-button />
        <Theme />
      </div>
    </div>
  );
};

export default Header;
