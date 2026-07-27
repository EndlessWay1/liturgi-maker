import { useGSAP } from "@gsap/react";
import { navLinks } from "../constants";
import type { NavType } from "../constants";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import useDarkMode from "../hooks/useDarkMode";

function Header() {
  const { isDark } = useDarkMode();

  useGSAP(() => {
    const linksSplit = SplitText.create("#links li", { type: "words" });

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
      backgroundColor: isDark ? "#00000050" : "#ffffff50",
    });
  }, []);

  return (
    <header id='navbar'>
      <nav>
        <div>
          <img src='/logo_navbar.png' alt='logo' />
          <h2>Liturgi Maker</h2>
        </div>
        <ul id='links'>
          {navLinks.map(({ id, dst, name }: NavType) => (
            <li key={id}>
              <a href={dst}>{name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
