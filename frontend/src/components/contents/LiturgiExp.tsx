import { useGSAP } from "@gsap/react";
import { guide } from "../../constants";
import gsap from "gsap";
import { useRef } from "react";

function LiturgiExp() {
  const guideRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#liturgi-exp",
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
        // markers: true,
      },
    });

    tl.to("#guide", {
      y: -300,
      scale: 0.6,
      ease: "back.inOut",
      duration:1,
    });

    guide.forEach(({ id }) => {
      tl.to(`.box${id}`, {
        opacity: 1,
        y: 0,
        duration:0.3
      });
    });
  }, []);
  return (
    <section id='liturgi-exp' ref={guideRef}>
      <h2 id='guide'>Guide</h2>
      <img src="light_rays.png" alt="light-rays"/>

      <div className='absolute inset-0 translate-x-2/4 w-[50vw] '>
        {guide.map(({ id, text, subhead, example, styles }) => (
          <div key={id} className={`box box${id} ${styles}`}>
            <h3>{subhead}</h3>
            <div className='ml-2'>
              <p>{text}</p>
              {example !== undefined ? (
                <span>
                  Example: <br />
                  {example}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default LiturgiExp;
