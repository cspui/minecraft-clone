import { useBox } from "@react-three/cannon";
import { Ref, useState } from "react";
import { Mesh } from "three";
import { useStore } from "../hooks/useStore";
import * as textures from "../images/textures";

interface IProps {
  position: [x: number, y: number, z: number];
  texture: string;
}

const Cube = ({ position, texture }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  // @ts-ignore
  const activeTexture = textures[texture + "Texture"];

  return (
    <mesh
      ref={ref as Ref<Mesh>}
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHover(false);
      }}
      onClick={(e) => {
        e.stopPropagation();

        if (e.faceIndex !== undefined && ref.current) {
          const clickedFace = Math.floor(e.faceIndex / 2);
          const { x, y, z } = ref.current.position;

          if (e.altKey) {
            removeCube(x, y, z);
            return;
          }

          switch (clickedFace) {
            case 0:
              addCube(x + 1, y, z);
              return;
            case 1:
              addCube(x - 1, y, z);
              return;
            case 2:
              addCube(x, y + 1, z);
              return;
            case 3:
              addCube(x, y - 1, z);
              return;
            case 4:
              addCube(x, y, z + 1);
              return;
            case 5:
              addCube(x, y, z - 1);
              return;
          }
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHover ? "grey" : "white"}
        attach="material"
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        map={activeTexture}
      />
    </mesh>
  );
};

export default Cube;
