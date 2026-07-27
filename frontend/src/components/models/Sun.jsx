
function Sun(props) {
  return (
    <group {...props} dispose={null} >
      <mesh>
        <sphereGeometry args={[25, 32, 32]} />
        <meshBasicMaterial color={"#fff4e0"} />
      </mesh>
      <hemisphereLight
        intensity={10}
        color={"#ffffff"} // sky color
        groundColor={"#444444"} // ground/bounce color
      />
      <directionalLight intensity={2} color={"#fff4e0"} />
    </group>
  );
}
export default Sun;
