"use client"

export function CopyRight() {
  return (
    <div className="flex items-center justify-center text-xs text-muted-foreground py-8 italic">
      Copyright © 2024{" "}
      <a
        className="ml-1 hover:text-popover-foreground underline"
        href="https://github.com/keyding"
        target="_blank"
        rel="noreferrer"
      >
        Caven Ding
      </a>
    </div>
  )
}
