import React from 'react'
import { BASE_URL } from "../config";

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    message: string
    transactionHash?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, transactionHash }) => {

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{message}</p>
            {transactionHash && (
            <p className="mb-4">
                
                <a 
                    href={`${BASE_URL}tx/${transactionHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    View transaction
                </a>
            </p>
            )}
            <div className="flex justify-end">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Confirm
            </button>
            </div>
        </div>
        </div>
    )
}

export default Modal