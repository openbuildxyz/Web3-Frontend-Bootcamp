import React, {  FC, forwardRef } from 'react'
import clsx from 'clsx'

export const Spinner = forwardRef<
  HTMLDivElement,
  {
  size?: number;
    className?: string
  }
>(({ className, size = 16 }, ref) => {

  return (
    <div className={className} ref={ref}>
      <div
        className={`loading loading-dots w-[${size}px] h-[${size}px]`}
      />
    </div>
  )
})

Spinner.displayName = 'Spinner'

export const AbsoluteCenterSpinner: FC<{
  children: React.ReactNode;
  className?: string;
}>= ({ children, className }) => {
  return (
    <div
      className={clsx(
        'inset-0 z-10 flex flex-col items-center justify-center gap-6',
        className,
      )}
    >
      <Spinner />
      {children}
    </div>
  )
}
