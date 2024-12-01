import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TOKEN_LIST } from "@/lib/constants"
import { LoaderIcon } from "lucide-react"
import { debounce } from "radash"
import { useEffect, useRef, useState } from "react"

export interface SwapValue {
  amount: string
  symbol: string
}

interface SwapItemProps {
  loading?: boolean
  value?: SwapValue
  onChange?: (token: SwapValue) => void
}

export function SwapItem({
  loading,
  value: propValue,
  onChange,
}: SwapItemProps) {
  const [value, setValue] = useState<SwapValue>({
    amount: "",
    symbol: "",
  })
  const [icon, setIcon] = useState<string | undefined>()

  useEffect(() => {
    if (!propValue) return

    const { amount = "", symbol = "" } = propValue
    setValue({
      amount,
      symbol,
    })
  }, [propValue])

  useEffect(() => {
    const symbol = value.symbol
    if (symbol)
      setIcon(TOKEN_LIST.find((token) => token.symbol === symbol)?.icon)
  }, [value])

  const handleSymbolChange = (symbol: string) => {
    const amount = value.amount !== "undefined" ? value.amount : ""
    const newValue = { amount, symbol }
    setValue(newValue)
    onChange?.(newValue)
  }

  const debouncedAmountChangeHandler = useRef(
    debounce({ delay: 300 }, (value: SwapValue) => {
      onChange?.(value)
    }),
  ).current

  const handleAmountChange = (amount: string) => {
    const newValue = {
      amount,
      symbol: value.symbol || "",
    }
    setValue(newValue)
    debouncedAmountChangeHandler(newValue)
  }

  return (
    <div className="flex w-full items-center gap-4">
      <Avatar className="w-6 h-6">
        <AvatarImage src={`/icons/${icon}`} />
        <AvatarFallback />
      </Avatar>
      <div className="flex-1 relative">
        <Input
          disabled={loading}
          value={value.amount}
          className="w-full"
          id="sell"
          type="number"
          placeholder="0"
          onChange={(e) => handleAmountChange(e.target.value)}
        />
        {loading && (
          <LoaderIcon
            size={16}
            className="absolute right-2.5 top-2.5 animate-spin"
          />
        )}
      </div>
      <Select value={value.symbol} onValueChange={handleSymbolChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select token" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {TOKEN_LIST.map((token) => (
              <SelectItem key={token.symbol} value={token.symbol}>
                {token.symbol}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
