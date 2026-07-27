import { OrbitControls, Html } from "@react-three/drei";
import { Suspense } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import ToyCat from "./ToyCat";
import Earth from "./Earth";
import Sun from "./Sun";
import Stars from "./Stars";

function PlanetCanvas(props: CanvasProps) {
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
            <h1 className='text-colors text-3xl'>Loading ...</h1>
          </Html>
        }
      >
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.1} />
      </Suspense>
      <Sun position={[60, 1000, 100]} />
      {/* <Box /> */}

      <ToyCat rotation={[Math.PI / 2, 0, 0]} position={[1.5, 0, 0]} />
      <Stars />
      <Earth position={[3, 100, -100]} />
    </Canvas>
  );
}

// useGLTF.preload("./chicken/scene.gltf");

export default PlanetCanvas;
