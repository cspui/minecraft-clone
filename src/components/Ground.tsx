import { usePlane } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import { groundTexture } from "../images/textures";

const Ground = () => {
  // const [ref] = usePlane(() => ({
  //   rotation: [-Math.PI / 2, 0, 0],
  //   position: [0, -0.499, 0],
  // }));

  const [addCube] = useStore((state) => [state.addCube]);

  // groundTexture.repeat.set(100, 100);

  return (
    <mesh
      // ref={ref as any}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((val) => Math.round(val));
        addCube(x, y, z);
      }}
    >
      {/* <planeGeometry attach="geometry" args={[100, 100]} /> */}
      {/* <meshStandardMaterial attach="material" map={groundTexture} /> */}
    </mesh>
  );
};

export default Ground;
