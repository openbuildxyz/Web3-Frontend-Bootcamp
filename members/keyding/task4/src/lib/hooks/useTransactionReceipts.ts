import type { HashType } from '@/types'
import { type GetTransactionReceiptReturnType, getTransactionReceipt } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { useConfig } from 'wagmi'

export function useTransactionReceipts(hashes: HashType[]) {
	const [receipts, setReceipts] = useState<any>([])
	const config = useConfig()

	useEffect(() => {
		Promise.all(hashes.map(hash => getTransactionReceipt(config, { hash }))).then((receipts) => {
			setReceipts(receipts)
		}).catch(error => {
			console.log(error)
		})
	}, [hashes, config])

	return receipts as GetTransactionReceiptReturnType[]
}