import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Ground from "./components/Ground";
import Player from "./components/Player";
import FPV from "./components/FPV";
import Cubes from "./components/Cubes";
import { TextureSelector } from "./components/TextureSelector";
import Menu from "./components/Menu";

const App = () => {
  // const sunPosition = [100, 100, 20]

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Physics>
          <Player />
          <Ground />
          <FPV />
          <Cubes />
        </Physics>
      </Canvas>
      <TextureSelector />
      <Menu />
      <div className="absolute centered">+</div>
    </>
  );
};

export default App;
