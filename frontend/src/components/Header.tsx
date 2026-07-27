import { useGSAP } from "@gsap/react";
import { navLinks } from "../constants";
import type { NavType } from "../constants";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useDarkMode } from "../context/DarkModeContext";
import { useState } from "react";
import clsx from "clsx";

function Header() {
  const { isDark, setIsDark } = useDarkMode();

  const [show, setShow] = useState(false);

  useGSAP(
    () => {
      const linksSplit = SplitText.create(".links li", {
        type: "lines, words",
      });

      ScrollTrigger.refresh();
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#navbar",
          start: "bottom top",
          end: "bottom bottom",
          // toggleActions: "play none none reverse",
          // markers: true,
        },
      });

      gsap.fromTo(
        linksSplit.words,
        { opacity: 0, yPercent: 50 },
        {
          yPercent: 0,
          opacity: 0.8,
          stagger: 0.05,
          ease: "power1.inOut",
        },
      );

      tl.from("#navbar", {
        backgroundColor: isDark ? "#000000" : "#ffffff",
      })
        .to("#navbar", {
          backgroundColor: isDark ? "#00000070" : "#ffffff70",
          ease: "power1.inOut",
          duration: 0.3,
        })
        .to(
          "#navdrop",
          {
            backgroundColor: isDark ? "#00000050" : "#ffffff50",
            ease: "power1.inOut",
            duration: 0.3,
          },
          "<",
        );
    },
    { dependencies: [isDark] },
  );

  return (
    <header id='navbar'>
      <nav>
        <div>
          <img src='/logo_navbar.png' alt='logo' />
          <h2>Liturgi Maker</h2>
        </div>
        <ul className='links'>
          {navLinks.map(({ id, dst, name }: NavType) => (
            <li key={id}>
              <a href={dst}>{name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div id='darkmode'>
        <button
          id='theme-toggle'
          type='button'
          onClick={() => setIsDark(!isDark)}
          className='text-gray-900 dark:text-gray-200 '
        >
          <svg
            id='theme-toggle-dark-icon'
            className={clsx("w-5 h-5", isDark && "hidden")}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
          </svg>
          <svg
            id='theme-toggle-light-icon'
            className={clsx("w-5 h-5", !isDark && "hidden")}
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
              fill-rule='evenodd'
              clip-rule='evenodd'
            ></path>
          </svg>
        </button>
      </div>

      <div id='dropdown'>
        <button onClick={() => setShow(!show)}>
          <img src={`/3bar-${isDark ? "white" : "black"}.png`} alt='3bar' />
        </button>

        <div hidden={show} id='navdrop'>
          <div>
            <ul>
              {navLinks.map(({ id, dst, name }: NavType) => (
                <li key={id}>
                  <a href={dst}>{name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
