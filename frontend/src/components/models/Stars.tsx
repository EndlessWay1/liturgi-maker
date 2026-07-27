import { PointMaterial, Points } from "@react-three/drei";
import { useRef, type JSX } from "react";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

const Stars = (props: JSX.IntrinsicElements["group"]) => {
  const starRef = useRef<THREE.Points>(null);

  const sphere = random.inSphere(new Float32Array(5000), { radius: 500 });

  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points ref={starRef} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color='#f272c8'
          size={1}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default Stars;
