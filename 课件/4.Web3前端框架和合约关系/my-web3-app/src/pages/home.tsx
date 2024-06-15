import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ABI } from "./abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const contractAddress = "0xFAB77D25DcfA32257bE59be3875dC86A0F2F743a";
const contractABI = ABI;

const Home = () => {
  const e = useAccount();
  console.log(e)
  const { data: hash, isPending, writeContract } = useWriteContract();

  const result = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    account: e.address,
  });

  console.log(result.data);

  const onClick = () => {
    writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "requestTokens",
      args: [6000],
    });
  };
  return (
    <div>
      <ConnectButton></ConnectButton>
      <div className=" mt-[20px] px-[40px]">
        <button onClick={onClick}>Click me</button>
        <div>isPending:{isPending ? "true" : "false"}</div>
        <div className=" text-red-500">custom token:{result?.data?.toString()}</div>
      </div>
    </div>
  );
};
export default Home;
