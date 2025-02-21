"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    // In a real application, you would implement the search functionality here
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-end space-x-2">
          <Input
            type="search"
            placeholder="Search NFTs..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

