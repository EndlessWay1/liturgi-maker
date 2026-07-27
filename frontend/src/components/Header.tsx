import { useGSAP } from "@gsap/react";
import { navLinks } from "../constants";
import type { NavType } from "../constants";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import useDarkMode from "../hooks/useDarkMode";
import { useState } from "react";

function Header() {
  const { isDark } = useDarkMode();

  const [show, setShow] = useState(false);

  useGSAP(
    () => {
      const linksSplit = SplitText.create(".links li", {
        type: "lines, words",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#navbar",
          start: "bottom top",
          toggleActions: "play none none reverse",
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

      tl.to("#navbar", {
        backgroundColor: isDark ? "#00000070" : "#ffffff70",
        ease: "power1.inOut",
        duration: 0.3,
      });

      tl.fromTo(
        "#navdrop",
        { backgroundColor: isDark ? "#000000090" : "#ffffff90" },
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
