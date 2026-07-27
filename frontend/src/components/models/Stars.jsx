import { PointMaterial, Points } from "@react-three/drei";
import { useRef } from "react";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const starRef = useRef();

  const sphere = random.inSphere(new Float32Array(5000), { radius: 500 });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
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
