import { useState } from 'react'
import { NavItem } from './NavItem'
import { Bars3Icon } from '../General/Bars3Icon'
import { CrossIcon } from '../General/CrossIcon'

function Header() {
  const [dragDown, setDragDown] = useState(false)

  const toggleClicked = () => {
    setDragDown(dragDown ? false : true)
    console.log(dragDown)
  }

  return (
    <>
      <header className="relative px-3 pt-4 pb-3 bg-dark-slate-grey/50 sm:px-8">
        <div className="flex justify-between">
          <div className="flex items-center sm:hidden w-auto">
            <button
              type="button"
              onClick={toggleClicked}
              aria-expanded={dragDown}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white/20 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="in-aria-expanded:hidden" />
              <CrossIcon className="not-in-aria-expanded:hidden" />
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 justify-between sm:items-strech sm:flex-row">
            <div className="flex flex-row gap-2">
              <div className="flex shrink-0 items-center gap-1">
                <img
                  src="../../logo_navbar.png"
                  alt="Liturgi Maker"
                  className="h-8 w-auto"
                />
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-200">
                  Liturgi Maker
                </h1>
              </div>
            </div>

            <NavItem className="max-sm:hidden" />
          </div>
        </div>
      </header>
      {dragDown && (
        <div className="absolute z-30 space-y-1 mx-2 mt-18 pl-2 pr-3 pt-2 pb-3 bg-granite/40 rounded-lg sm:hidden">
          <div role="dialog">
            <NavItem className="flex flex-col gap-0.5" />
          </div>
        </div>
      )}
    </>
  )
}
export default Header
