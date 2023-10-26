import { camObject, pointVector } from "./types";

export const url: string = "model/jupiter.glb";

export const inactiveNameSelector: string = "inactive";

export const wireframeColor = 0xe5e5e5;
export const colorBlack = 0x000000;
export const baseLightIntense = 0xc6c6c6;
export const lightStrength = 1.5;
export const baseCamDistance = 25000;
export const animDuration = 1000;
export const animFrames = 20;
export const animFps = 120;

export const defaultCam: camObject = {
  position: {
    x: 2.4819976023870747,
    y: 0.31841182265555334,
    z: 1.1069338161290694,
  },
  rotation: {
    _x: -0.2889989838283902,
    _y: 0.2808091813843981,
    _z: 0.08221234672717474,
  },
  target: {
    x: 2.2,
    y: 0.0,
    z: 0.1
  }
};

export const finalCam: camObject = {
  position: {
    x: 197.95320186342784,
    y: 193.26907931129227,
    z: 190.40064634608183,
  },
  rotation: {
    _x: -0.792874331912519,
    _y: 0.6303420185691059,
    _z: 0.5391691950803549,
  },
};

export const CAMERA_POS: camObject[] = [
  {
    position: {
      x: 2.4819976023870747,
      y: 0.31841182265555334,
      z: 1.1069338161290694,
    },
    rotation: {
      _x: -0.2889989838283902,
      _y: 0.2808091813843981,
      _z: 0.08221234672717474,
    },
    target: {
      x: 2.2048649481058575,
      y: 0.04458184887866806,
      z: 0.1859484844327317,
    },
  },
  {
    position: {
      x: 2.6706749858175023,
      y: -0.04697726467888311,
      z: -0.848224036554112,
    },
    rotation: {
      _x: 0.11319530629143645,
      _y: -0.17497198744653378,
      _z: 0.01978711392952373,
    },
    target: {
      x: 2.84475556518226,
      y: 0.06425178572525536,
      z: -1.826653411890255,
    },
  },
  {
    position: {
      x: 3.765594937547601,
      y: 0.04317149694784108,
      z: -4.133794359875978,
    },
    rotation: {
      _x: -3.0950625065456903,
      _y: 1.4971444366805977,
      _z: 3.0951884719854355,
    },
    target: {
      x: 2.768306106718132,
      y: 0.039748315646996234,
      z: -4.06028788754364,
    },
  },
  {
    position: {
      x: 1.2137614165644315,
      y: -0.01640844754880777,
      z: -7.336717793770118,
    },
    rotation: {
      _x: -3.0738846549292003,
      _y: 0.26827866943840334,
      _z: 3.1236196130860123,
    },
    target: {
      x: 0.9486886072129939,
      y: -0.08164377982993173,
      z: -6.374698811203773,
    },
  },
];

export const MenuBorders = [
  1486.7547046835043, 846.7547046835043, 586.7547046835043, 326.7547046835043,
];

export const BorderContent = ["Shape 1", "Shape 2", "Shape 3", "Shape 4"];

export const camStep = 20;

export const camEdges: camObject[] = [];

export const useEdgeMinAngle = 1;
export const useEdgeMinDistance = 9;

export const LightData = [
  {
    x: 2,
    y: 2,
    z: 5,
  },
];

export const defaultPoint: pointVector = {
  x: 0,
  y: 0,
  z: 0,
};

export const SetAmbientLight = true;

export const scenesize = {
  x: window.innerWidth * 0.98,
  y: window.innerHeight * 0.98,
};
