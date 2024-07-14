import { NavBar } from "@/components/navbar"
import { Actions } from "@/components/actions"
import { Listings } from "@/components/listings"

export default function Home() {
  return (
    <main>
      <NavBar />
      <Actions />
      <Listings />
    </main>
  )
}
