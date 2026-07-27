import { useGSAP } from "@gsap/react";
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
    </section>
  );
}
