import { Html, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import ToyCat from "./ToyCat";
import Earth from "./Earth";
import Sun from "./Sun";
import Stars from "./Stars";
import { useMediaQuery } from "react-responsive";

function PlanetCanvas(props: CanvasProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const catConfig = {
    // snap: true,
    speed: 1,
    zoom: 1,
    config: { mass: 1, tension: 0, friction: 1 },
  };

  return (
    <Canvas
      {...props}
      shadows
      frameloop='always'
      camera={{
        fov: 25,
        far: 10000,
        near: 0.1,
        position: [0, -10, 0],
      }}
    >
      {/* <Environment preset='city' /> */}
      <Suspense
        fallback={
          <Html>
            <h1 className='text-white text-xl sm:text-3xl w-[20vw]! not-sm:w-[40vw]!'>
              Loading ...
            </h1>
          </Html>
        }
      >
        {/* <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.1} /> */}
        <Sun position={[60, 1000, 100]} />
        <PresentationControls {...catConfig}>
          <ToyCat
            rotation={[Math.PI / 2, 0, 0]}
            position={isMobile ? [0.5, 0, 0] : [1.5, 0, 0]}
          />
        </PresentationControls>
        <Earth position={[3, 100, -100]} />
      </Suspense>
      <Stars />
    </Canvas>
  );
}

// useGLTF.preload("./chicken/scene.gltf");

export default PlanetCanvas;
