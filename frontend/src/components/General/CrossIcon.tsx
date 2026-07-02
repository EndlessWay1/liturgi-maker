import { twMerge } from 'tailwind-merge'

import type { ComponentProps } from 'react'

type CrossIconProps = ComponentProps<'svg'>

export function CrossIcon({
  className,
  strokeWidth = 1.5,
  stroke = 'currentColor',
  viewBox = '0 0 24 24',
  fill = 'none',
  ...props
}: CrossIconProps) {
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
        d="M6 18 18 6M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
