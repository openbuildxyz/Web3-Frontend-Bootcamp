import { useReadContract, useWriteContract } from "wagmi";
import { useState, ChangeEvent, FormEvent } from "react";
import { Nftem, Nftag, Nftsum } from "../../model";
import { Nft, assemble } from "./Nft";
import { mket_abi, mket_adr } from "../../contracts/Mket";
import { bpop_abi, bpop_adr } from "../../contracts/Bpop";

function Gallery() {
  const result = useReadContract({
    address: mket_adr,
    abi: mket_abi,
    functionName: 'fetchAll',
    args: [],
  });

  let info: Nftem[] = [], index: Nftag[] = [], gallery: Nftsum[] = []
  if (Array.isArray(result.data) && result.data.length !== 0) {
    [info, index] = result.data as [Nftem[], Nftag[]]
    gallery = assemble(info, index)
  }
  console.log(gallery)
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-6 justify-center my-5">
        <List />
        <Delist />
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {gallery.filter(item => item.listing === true).map((item, idx) => <Nft {...item} key={idx} />)}
      </div>
    </div>
  )
}

export default Gallery


function List() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nftContract: "", nftID: "", nftURI: "", price: "" });
  const { isPending, writeContractAsync } = useWriteContract()

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(name, value)
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    writeContractAsync({
      address: bpop_adr,
      abi: bpop_abi,
      functionName: 'setApprovalForAll',
      args: [mket_adr, true]
    }).then(
      () => {
        writeContractAsync({
          address: mket_adr,
          abi: mket_abi,
          functionName: 'list',
          args: [formData.nftContract, formData.nftURI, BigInt(formData.nftID), BigInt(formData.price)]
        }).then(res => console.log("successful: ", res)).catch(err => console.log("failed: ", err))
      }
    ).catch(err => console.log("failed: ", err))
    toggleModal();
  };

  return (
    <div className="flex self-center self-end justify-center items-center">
      <button
        className="bg-black font-mono text-white w-36 px-4 py-2 rounded-full hover:bg-gray-700"
        onClick={toggleModal}
      >
        {isPending ? "pending" : "LIST"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl mb-4">NFT INFO</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contract
                </label>
                <input
                  type="text"
                  name="nftContract"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NFT URI
                </label>
                <input
                  type="text"
                  name="nftURI"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NFT ID
                </label>
                <input
                  type="text"
                  name="nftID"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function Delist() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nftContract: "", nftID: "" });
  const { isPending, writeContract } = useWriteContract()

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(name, value)
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    writeContract({
      address: mket_adr,
      abi: mket_abi,
      functionName: 'delist',
      args: [formData.nftContract, BigInt(formData.nftID)],
    })
    toggleModal();
  };

  return (
    <div className="flex self-center self-end justify-center items-center">
      <button
        className="bg-black font-mono text-white w-36 px-4 py-2 rounded-full hover:bg-gray-700"
        onClick={toggleModal} disabled={isPending}
      >
        {isPending ? "pending" : "DELIST"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl mb-4">NFT INFO</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contract
                </label>
                <input
                  type="text"
                  name="nftContract"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NFT ID
                </label>
                <input
                  type="text"
                  name="nftID"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}    </div>
  )
}


