import React, { useState, useEffect, useContext } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InteractionManager } from "three.interactive";
import gsap from "gsap";
import {
  camObject,
  pointVector,
} from "./types";
import * as config from "./config";
import Menu from "menu";
import { RightMenu } from "menu/rightMenu";
import { LinearMenu } from "menu/linearMenu";

let isCamMoving = false;

/* setTimeout(() => {
  isCamMoving = false;
}, 1000); */

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const defaultMaterials = new Map<string, THREE.Material>();

const camera = new THREE.PerspectiveCamera(
  45,
  config.scenesize.x / config.scenesize.y,
  1,
  config.baseCamDistance
);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
});

scene.add(camera);

const ld = config.LightData;

if (config.SetAmbientLight) {
  const light = new THREE.AmbientLight(
    config.baseLightIntense,
    config.lightStrength
  );
  scene.add(light);
}

ld.forEach((li) => {
  const light = new THREE.DirectionalLight(
    config.baseLightIntense,
    config.lightStrength
  );
  light.position.set(li.x, li.y, li.z);
  scene.add(light);
});

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  interactionManager.update();
}

animate();

renderer.setSize(config.scenesize.x, config.scenesize.y);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableZoom = false; 
controls.enableRotate = false; 
controls.enablePan = false;

controls.listenToKeyEvents(window);
controls.update();

let framesNum = config.animFps;

let lastFrameTime = 0;
let frameCount = 0;

function updateFPS(currentTime: number) {
  frameCount++;
  if (currentTime >= lastFrameTime + 1000) {
    let fps = frameCount;
    framesNum = fps;
    frameCount = 0;
    lastFrameTime = currentTime;
  }
  requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);


/* controls.addEventListener('change', function () {
  // This function will be called when the controls change (e.g., when the user interacts with them)
  // You can put your custom code here to react to the changes
  console.log(camera.position);
  console.log(camera.rotation);
  console.log(camera.focus);
}); */

export async function MoveCamera(
  cam: camObject,
  animated = true,
  point = config.defaultPoint,
  useEdge = false
) {
  controls.target.set(point.x, point.y, point.z);

  if (animated) {
    if (isCamMoving) {
      return;
    }
    isCamMoving = true;
    let currentRotation = {
      _x: camera.rotation.x,
      _y: camera.rotation.y,
      _z: camera.rotation.z,
    };
    currentRotation = {
      _x: camera.rotation.x,
      _y: camera.rotation.y,
      _z: camera.rotation.z,
    };

    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const target = new THREE.Vector3();
    target.copy(camera.position).add(cameraDirection);

    let activeTarget = target

    gsap.to(camera.position, {
      x: cam.position.x,
      y: cam.position.y,
      z: cam.position.z,
      duration: config.animDuration / 1000,
      ease: "power1.out",
      /* onUpdate: () => {
        camera.lookAt(point.x, point.y, point.z);
      },
      onComplete: () => {
        // camera.rotation.set(cam.rotation._x, cam.rotation._y, cam.rotation._z);
        console.log(camera.rotation);
        console.log(camera.rotation);
      }, */
    });

    gsap.to(activeTarget, {
      x: point.x,
      y: point.y,
      z: point.z,
      duration: config.animDuration / 1000,
      ease: "power1.out",
      onUpdate: () => {
        camera.lookAt(point.x, point.y, point.z);
      },
    })

    /* gsap.to(camera.rotation, {
      x: cam.rotation._x,
      y: cam.rotation._y,
      z: cam.rotation._z,
      duration: config.animDuration / 1000,
      onComplete: () => {
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        const target = new THREE.Vector3();
        target.copy(camera.position).add(cameraDirection);
        console.log("target : ");
        console.log(target);
      }
    });*/

  } else {
    camera.position.set(cam.position.x, cam.position.y, cam.position.z); // 0,y,0 - для вида сверху
    camera.rotation.set(cam.rotation._x, cam.rotation._y, cam.rotation._z);
  }
  setTimeout(() => {
    // controls.target.set(point.x, point.y, point.z); //Точка, вокруг которой идёт вращение мышкой
    isCamMoving = false;
  }, config.animDuration * 1 + 11);

  // controls.update()
}

export function ShowElements() {
  scene.children.forEach((subScene) => {
    if (subScene.type === "Group") {
      subScene.traverse((child: any) => {
        if (child.children.length === 0) {
          child.visible = true;
        }
      });
    }
  });
}


const Model3D = () => {
  const [clickable, setClickable] = useState(false);
  const [isFirstLoad, noteFirstLoad] = useState(true);
  const [menuHidden, HideMenu] = useState(true);
  const [menuHeading, SetHeading] = useState("");
  const [rightText, RTSetup] = useState(config.BorderContent[0]);

  const ModelSetup = (gltf: any) => {
    const model = gltf.scene;
    const container = document.querySelector(".render--zone");
    const clicker = document.querySelector(".planetClicker")
    let counter = 0;

    model.traverse((child: any) => {
      if (child.children.length === 0) {
        if (isFirstLoad) {
          defaultMaterials.set(child.name, child.material);
        }

        if (child.name !== "Sphere001") {
          // child.visible = false;

          /* let material = new THREE.l({
            color: 0x00ff00,
            size: 0.2,
          }); */

          /* let points = new THREE.Mesh(child.geometry, child.material);
          points.translateZ(counter * 50)
          points.translateY(counter * 50)
          points.translateX(counter * 50)
          points.name = child.name + "_mesh" */

          // scene.add(points);
          interactionManager.add(child);
          child.addEventListener("click", (event: any) => {
            if (menuHidden) {
              HideMenu(false);
            } else {
              HideMenu(true);
            }
            SetHeading(event.target ? event.target.name : "Default")
          })
        }

        if (child.name.indexOf(config.inactiveNameSelector) === -1) {
          interactionManager.add(child);

          child.addEventListener("click", (event: any) => {
            if (child.name === "Sphere001") {
              if (menuHidden) {
                HideMenu(false);
              } else {
                HideMenu(true);
              }
            }
          });

          child.addEventListener("mouseover", (event: any) => {
            document.body.style.cursor = "pointer";
          });

          child.addEventListener("mouseout", (event: any) => {
            document.body.style.cursor = "default";
            /* if (child.material.emissive) {
                child.material.emissive.setHex(0x000000);  
              } */
          });
        }
      }
      counter++
    });

    if (clicker) {
      clicker.addEventListener('click', (event) => {
        const index = Number(clicker.innerHTML)
        if (index >= 0 && index < config.CamVars.length) {
          MoveCamera(config.CamVars[index], true, config.objectPoints[index])
        }
      })
    }

    if (isFirstLoad) {
      noteFirstLoad(false);
    }

    scene.add(model);

    // interactionManager.update();

    if (container) {
      container.appendChild(renderer.domElement);
    } else {
      console.log("Not found container!");
    }

    return true;
  };

  useEffect(() => {
    loader.load(config.url, ModelSetup);
    MoveCamera(config.defaultCam, false);
  }, []);

  return (
    <>
      <div className="render--zone" />
      {/* <Menu hidden={menuHidden ? true : false} heading={menuHeading} /> */}
      {/* <RightMenu text={rightText} /> */}
      {/* <LinearMenu /> */}
    </>
  );
};

export default Model3D;
