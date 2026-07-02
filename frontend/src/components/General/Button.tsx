import type { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

type Variant = 'primary' | 'secondary' | 'ghost-destructive'

type ButtonProps = {
  // gives option style class
  variant?: Variant
  // gives all of button property of button
} & ComponentProps<'button'>

function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(`${getVariantStyle(variant)}
    transition-colors 
    rounded px-2 py-1
    disabled:cursor-not-allowed
    disabled:opacity-30
    ${className}
    `)}
    />
  )
}

function getVariantStyle(variant: Variant) {
  switch (variant) {
    case 'primary':
      return 'bg-sky-reflection/20 hover:bg-sky-reflection/70'
    case 'secondary':
      return 'bg-lavender-grey/20 hover:bg-lavender-grey/70 text-white'
    case 'ghost-destructive':
      return 'hover:bg-red-800 text-red-800 hover:text-red-200'
    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`)
  }
}

export default Button
