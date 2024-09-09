"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"

interface TabsProps {
  value: number
  onChange?: (tab: number) => void
}

const TABS = [
  {
    label: "Market",
    value: 1,
  },
  {
    label: "My NFT",
    value: 2,
  },
]

export function TabSwitch({ value, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(1)

  useEffect(() => {
    setActiveTab(value)
  }, [value])

  return (
    <Tabs
      value={activeTab.toString()}
      className="w-[200px]"
      onValueChange={(value) => onChange?.(Number(value))}
    >
      <TabsList>
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value.toString()}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
