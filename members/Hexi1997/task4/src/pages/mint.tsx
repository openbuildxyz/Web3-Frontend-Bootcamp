import classNames from "classnames";
import { useMemo, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { useAsyncFn } from "react-use";
import { toast } from "react-toastify";
import { pinataConfigs, contractInfo } from "../utils/const";
import { waitForTransactionReceipt } from "wagmi/actions";
import { wagmiConfig } from "../main";

export function MintPage() {
  const { address } = useAccount();
  const [selectFile, setSelectFile] = useState<File>();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const { writeContractAsync } = useWriteContract();

  const isButtonEnable = useMemo(
    () => !!address && !!name && !!desc && !!selectFile,
    [address, desc, name, selectFile]
  );

  const [mintResult, doMint] = useAsyncFn(async () => {
    if (!isButtonEnable || !selectFile || !address || !desc) return;
    try {
      // pin image
      const formData = new FormData();
      formData.append("file", selectFile);
      const metadata = JSON.stringify({
        name: selectFile.name,
      });
      formData.append("pinataMetadata", metadata);
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${pinataConfigs.jwtToken}`,
          },
          body: formData,
        }
      );
      const imgUrl = `${pinataConfigs.gateway}${(await res.json()).IpfsHash}`;

      // pin metadata
      const data = JSON.stringify({
        pinataContent: {
          name,
          description: desc,
          image: imgUrl,
        },
        pinataMetadata: {
          name: "metadata.json",
        },
      });
      const nftMetaDataRes = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinataConfigs.jwtToken}`,
          },
          body: data,
        }
      );
      const nftMetadataLink = (await nftMetaDataRes.json()).IpfsHash;
      const tokenUri = `${pinataConfigs.gateway}${nftMetadataLink}`;

      // 调用合约执行mint
      const txHash = await writeContractAsync({
        address: contractInfo.Erc721Token.address,
        abi: contractInfo.Erc721Token.abi,
        functionName: "mintNFT",
        args: [address, tokenUri],
      });

      const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: txHash as `0x${string}`,
      });

      if (transactionReceipt.status === "success") {
        const tokenId = BigInt(transactionReceipt.logs[0].topics[3] || "");
        toast.success(`Minted! Token id is ${tokenId}`);
      } else {
        toast.error("Mint failed!");
      }
    } catch (e) {
      console.error(e);
      toast.error(JSON.stringify(e));
    }
  }, [isButtonEnable, selectFile, address, desc]);

  return (
    <div className="h-[calc(100vh_-_120px)] flex flex-col justify-center">
      <h1 className="text-center text-xl font-bold">Mint NFT</h1>
      <div className="mt-10 mx-auto w-fit flex flex-col gap-4 px-4">
        <div className="flex items-center gap-x-4 ">
          <div className="w-[120px] shrink-0">NFT Collection:</div>
          <a
            href={`https://sepolia.etherscan.io/token/${contractInfo.Erc721Token.address}`}
            target="_blank"
            className="underline text-primaryColor"
          >
            HexiNFT
          </a>
          <a
            href="https://testnets.opensea.io/collection/hexinft-2?tab=items"
            target="_blank"
            className="underline text-primaryColor"
          >
            OpenSea
          </a>
        </div>
        <div className="flex items-center gap-x-4 ">
          <div className="w-[120px] shrink-0">NFT Name:</div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="name"
            className="px-1 rounded outline-none border-[1px]"
          />
        </div>
        <div className="flex items-center gap-x-4 ">
          <div className="w-[120px] shrink-0">NFT Desc:</div>
          <input
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="desc"
            className="px-1 rounded outline-none border-[1px]"
          />
        </div>
        <div className="flex items-center gap-x-4 ">
          <div className="w-[120px] shrink-0">NFT Image:</div>
          <input
            type="file"
            accept="image/png, image/jpeg, image/svg, image/gif"
            onChange={(e) => {
              console.log(e);
              const files = e.target.files || [];
              if (files.length) {
                setSelectFile(files[0]);
              }
            }}
            multiple={false}
            className="px-1 rounded outline-none border-[1px] max-w-[200px]"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={!isButtonEnable}
            onClick={doMint}
            type="submit"
            className={classNames(
              "bg-primaryColor text-white rounded px-6 py-1 duration-200 hover:opacity-75 mt-4",
              !isButtonEnable && "!opacity-50 cursor-not-allowed",
              mintResult.loading && "!opacity-75"
            )}
          >
            {mintResult.loading ? "loading..." : "Mint"}
          </button>
        </div>
      </div>
    </div>
  );
}
