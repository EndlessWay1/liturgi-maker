import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type MainProps = ComponentProps<'main'>

export default function Main({ className, ...props }: MainProps) {
  return <main className={twMerge(`flex-1 ${className}`)} {...props}></main>
}
