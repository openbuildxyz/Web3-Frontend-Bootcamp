"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TokenIDSelectProps {
  data: number[]
  onChange?: (tokenId: number) => void
}

export function TokenIDSelect({ data, onChange }: TokenIDSelectProps) {
  return (
    <Select onValueChange={(value) => onChange?.(Number(value))}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a token id" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {!data.length && (
            <SelectLabel className="text-foreground/50">
              Please Mint NFT!
            </SelectLabel>
          )}

          {data.map((id) => (
            <SelectItem key={id} value={id.toString()}>
              # {id}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
