"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NFT_TOKEN_URI } from "@/lib/constants"
import Image from "next/image"

interface TokenURISelectProps {
  value: string
  onChange: (value: string) => void
}

export function TokenURISelect({ value, onChange }: TokenURISelectProps) {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a token URI" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {NFT_TOKEN_URI.map((uri) => {
            return (
              <SelectItem key={uri} value={uri} className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <Image
                    src={`/icons/${uri}.svg`}
                    alt={uri}
                    width={20}
                    height={20}
                  />
                  {uri.charAt(0).toUpperCase() + uri.slice(1)}
                </div>
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
