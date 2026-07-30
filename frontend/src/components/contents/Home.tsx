import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import PlanetCanvas from "../models/PlanetCanvas";
import gsap from "gsap";

export function Home() {
  useGSAP(() => {
    gsap.fromTo(
      "#hero div h2",
      { opacity: 0, yPercent: 25 },
      { opacity: 1, yPercent: 0, duration: 0.3, ease: "expo.in" },
    );
    gsap.fromTo(
      "#hero div span",
      { opacity: 0, yPercent: 25 },
      { opacity: 1, yPercent: 0, duration: 0.6, ease: "expo.in" },
    );

    const bounce = gsap.to(".down-arrow", {
      yPercent: 30,
      scale: 0.8,
      yoyo: true,
      repeat: -1,
      ease: "circ.inOut",
      duration: 1,
    });

    ScrollTrigger.create({
      trigger: "#canvas",
      end: "20% top",
      toggleActions: "play none none reverse",
      onEnterBack: () => bounce.play(),
      onLeave: () => bounce.pause(),
    });

    gsap.to("#scrolldown", {
      opacity: 0,
      duration: 1,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: "#canvas",
        start: "20% top",
        end: "bottom 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
  return (
    <section id='home'>
      <PlanetCanvas id='canvas' />
      <div id='hero'>
        <div>
          <h2>Liturgi Maker</h2>
          <span>made by nickson</span>
        </div>
      </div>
      <div id='scrolldown'>
        <h2>Scroll Down</h2>
        <div className='down-arrow'>
          <svg
            fill='#ffffff'
            version='1.1'
            id='Capa_1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 30.727 30.727'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {" "}
              <g>
                {" "}
                <path d='M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z'></path>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
