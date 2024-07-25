import { LockClosedIcon } from "@heroicons/react/24/outline";

const BlankTokenList = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <LockClosedIcon className="swap-on h-5 w-5" />
      </div>
      <div>There is no NFT yet</div>
    </div>
  );
};

export default BlankTokenList;
