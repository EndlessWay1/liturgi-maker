import { twMerge } from 'tailwind-merge'

import type { ComponentProps } from 'react'

type Bars3IconProps = ComponentProps<'svg'>

export function Bars3Icon({
  className,
  strokeWidth = 1.5,
  stroke = 'currentColor',
  viewBox = '0 0 24 24',
  fill = 'none',
  ...props
}: Bars3IconProps) {
  return (
    <svg
      viewBox={viewBox}
      fill={fill}
      strokeWidth={strokeWidth}
      stroke={stroke}
      data-slot="icon"
      aria-hidden="true"
      className={twMerge(`size-6 ${className}`)}
      {...props}
    >
      <path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
