import { TokenMeta } from "./model";
import { Select, SelectItem, Avatar } from "@nextui-org/react";

import copy from '/copy.svg'

function TokenSelection({ tokens, contract, handleChange }: { tokens: Array<TokenMeta>, contract: string, handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
  return (
    <div className="flex flex-row">
      <Select
        items={tokens}
        label=""
        aria-label="Token Info"
        labelPlacement="outside-left"
        size="lg"
        fullWidth={false}
        variant="bordered"
        selectedKeys={[contract]}
        onChange={handleChange}
        listboxProps={{
          itemClasses: {
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        popoverProps={{
          classNames: {
            base: "before:bg-default-200",
            content: "p-0 border-small border-divider bg-background",
          },
        }}
        renderValue={(items) => {
          return items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <Avatar
                alt={item.data?.name}
                src={item.data?.img}
                className="w-8 h-8"
              />
              {item.data?.ticker}
            </div>
          ));
        }}
      >
        {(token) => (
          <SelectItem
            key={token.address}
            className="w-60"
            startContent={<Avatar isBordered radius="sm" className="w-6 h-6" src={token.img} />}
          >
            {token.name}
          </SelectItem>
        )}
      </Select>
      <button onClick={() => {
        navigator.clipboard.writeText(contract).then(() => console.log(contract))
      }}>
        <img src={copy} className="w-8 h-8 mx-8" />
      </button>
    </div>
  )
}

export default TokenSelection
