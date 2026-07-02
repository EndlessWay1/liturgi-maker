import { type ComponentProps } from 'react'
import { Link, useLocation } from 'react-router-dom'

type NavProps = ComponentProps<'nav'>

export function NavItem({ className }: NavProps) {
  const curLoc = useLocation()
  const ListNav = [
    { id: crypto.randomUUID(), dst: '/', name: 'Home' },
    { id: crypto.randomUUID(), dst: '/liturgi', name: 'Liturgi' },
    { id: crypto.randomUUID(), dst: '/surat', name: 'Surat Pdt' },
    // { dst: '/notula', name: 'Notula' },
    // { dst: '/jpk', name: 'JPK' },
    { id: crypto.randomUUID(), dst: '/About', name: 'About Us' },
  ]

  return (
    <nav className={`flex gap-2 navbar-end ${className}`}>
      {ListNav.map(({ id, dst, name }) => {
        return (
          <Link
            key={id}
            className={`${
              curLoc.pathname == dst
                ? 'bg-gray-950/70 text-white rounded-md py-1 px-2'
                : 'hover:bg-gray-700/75 rounded-md py-1 px-2 text-white'
            } focus:outline-2 focus:-outline-offset-1 focus:outline-gray-200 transition-colors`}
            to={dst}
          >
            {name}
          </Link>
        )
      })}
    </nav>
  )
}
