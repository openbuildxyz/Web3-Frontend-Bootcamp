'use client'
import { useState } from "react";

export function ListNFT() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex self-center self-end justify-center items-center">
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
        onClick={toggleModal}
      >
        LIST MY NFT
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl mb-4">NFT INFO</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  contract
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="0x1145141919514"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  token id
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  price
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  placeholder="10"
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

