"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

type Props = {
  title: string
  data: string
}
export const CardInfo = ({ title, data }: Props) => {
  const [copied, setCopied] = useState(false)
  const isAddress = data.length === 42

  const onCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    })
  }
  return (
    <div className="flex items-center justify-between">
      <div className="max-w-20 text-neutral-500">{title}</div>
      <div className="flex items-center">
        <div className="max-w-48 text-neutral-500 truncate">{data}</div>
        {isAddress && (
          <Button
            onClick={() => onCopy(data)}
            variant="ghost"
            className="h-6 w-6 p-0"
          >
            <span className="sr-only">Copy</span>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
