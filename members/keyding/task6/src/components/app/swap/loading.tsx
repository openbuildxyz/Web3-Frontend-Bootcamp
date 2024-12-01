import { LoaderIcon } from "lucide-react"

export function Loading() {
  return (
    <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 rounded-xl overflow-hidden z-10">
      <LoaderIcon className="animate-spin" />
    </div>
  )
}
