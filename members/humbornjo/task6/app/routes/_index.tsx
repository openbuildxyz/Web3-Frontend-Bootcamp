import type { MetaFunction } from "@remix-run/node"
import Header from "~/components/Header/Header"
import Swap from "~/components/Swap/Swap"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}


export default function Index() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Swap />
    </div >
  )
}
