"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function NFTLoading() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {Array(4)
        .fill(null)
        .map((_, index) => index)
        .map((id) => {
          return (
            <div
              key={id}
              className="bg-gradient-to-b rounded-3xl flex flex-col items-center p-4 gap-2"
            >
              <Skeleton className="h-[140px] w-[80%] rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          )
        })}
    </div>
  )
}
