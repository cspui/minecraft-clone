import { nanoid } from "nanoid";
import create from "zustand";

export interface ICube {
  key: string;
  pos: [x: number, y: number, z: number];
  texture: string;
}

export interface IStore {
  texture: string;
  cubes: ICube[];

  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;

  setTexture: (texture: string) => void;

  saveWorld: () => void;
  resetWorld: () => void;
}

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key)!);
const setLocalStorage = (key: string, value: any) =>
  window.localStorage.setItem(key, JSON.stringify(value));


// https://r105.threejsfundamentals.org/threejs/lessons/threejs-optimize-lots-of-objects.html
// https://discoverthreejs.com/tips-and-tricks/
// https://discourse.threejs.org/t/performance-optimisation-of-a-scene-with-hundred-of-thousands-of-cubes/31534
// generate from center 
const DEFAULT_CUBES = new Array(20).fill(0).reduce((array, _, index) => {
  return [
    ...array,
    {
      key: nanoid(),
      pos: [index, -1, 0],
      texture: "grass",
    },
    ...Array(20)
      .fill(0)
      .reduce((array, _, i) => {
        return [
          ...array,
          {
            key: nanoid(),
            pos: [index, -1, i],
            texture: "grass",
          },
        ];
      }, []),
  ];
}, []);


export const useStore = create<IStore>((set, get) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || DEFAULT_CUBES,

  addCube: (x: number, y: number, z: number) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (x: number, y: number, z: number) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },

  setTexture: (texture: string) => {
    set(() => ({
      texture,
    }));
  },

  saveWorld: () => {
    setLocalStorage("cubes", get().cubes);
  },
  resetWorld: () =>
    set(() => ({
      cubes: DEFAULT_CUBES,
    })),
}));
