import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function HTitle({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      className={twMerge(
        `font-felipa text-4xl sm:text-6xl font-semibold ${className}`,
      )}
      {...props}
    ></h1>
  )
}
