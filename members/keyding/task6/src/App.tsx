import { CopyRight } from "@/components/app/copyright"
import { Header } from "@/components/app/header"
import { Swap } from "@/components/app/swap"

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 max-w-screen-lg mx-auto pt-32">
        <Swap />
      </div>
      <CopyRight />
    </div>
  )
}

export default App
