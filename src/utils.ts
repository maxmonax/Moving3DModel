export function CalculateRotationFrames(
    from: number,
    to: number,
    frames: number
  ): number[] {
    let nums: number[] = [];
    let start = from;
    nums.push(from);
  
    if (from >= 0 && to >= 0) {
      const framedelta = Math.abs(to - from) / frames;
      for (let k1 = 0; k1 < frames; k1++) {
        start += to >= from ? framedelta : -framedelta;
        nums.push(start);
      }
      return nums;
    }
    if (from < 0 && to < 0) {
      const framedelta = Math.abs(to - from) / frames;
      for (let k1 = 0; k1 < frames; k1++) {
        start -= to < from ? framedelta : -framedelta;
        nums.push(start);
      }
      return nums;
    }
  
    if (from >= 0 && to < 0) {
      const framedelta = (Math.abs(to) + from) / frames;
      if (Math.abs(to) > Math.PI / 2 && Math.abs(to) > Math.PI / 2) {
        const framedelta = (Math.PI - from + (Math.PI + to)) / frames;
  
        for (let k1 = 0; k1 < frames; k1++) {
          if (start < Math.PI && start > 0) {
            start += framedelta;
          }
          if (start >= Math.PI) {
            start = -Math.PI;
          }
          if (start < 0) {
            start += framedelta;
          }
  
          nums.push(start);
        }
      } else {
        for (let k1 = 0; k1 < frames; k1++) {
          start -= framedelta;
          nums.push(start);
        }
      }
    }
  
    if (from < 0 && to >= 0) {
      const framedelta = (Math.abs(from) + to) / frames;
      if (Math.abs(to) > Math.PI / 2 && Math.abs(to) > Math.PI / 2) {
        const framedelta = (Math.PI + from + (Math.PI - to)) / frames;
        for (let k1 = 0; k1 < frames; k1++) {
          if (start > -Math.PI && start < 0) {
            start -= framedelta;
          }
          if (start <= -Math.PI) {
            start = Math.PI;
          }
          if (start >= Math.PI && start > 0) {
            start -= framedelta;
          }
          nums.push(start);
        }
      } else {
        for (let k1 = 0; k1 < frames; k1++) {
          start += framedelta;
          nums.push(start);
        }
      }
    }
    return nums;
  }

/*
export function CameraStep (dir: number, val = config.camStep) {
    const cam = camera.position
    if (dir < 0) {
        if (cam.x >= config.finalCam.position.x) {
          const upgCam : camObject = {
            position: {
              x: cam.x - val,
              y: cam.y - val,
              z: cam.z - val
            },
            rotation: {
              _x: camera.rotation.x,
              _y: camera.rotation.y,
              _z: camera.rotation.z
            }
          }
          MoveCamera(upgCam, false)
        }
     } else {
      if (cam.x <= config.defaultCam.position.x) {
        const upgCam : camObject = {
          position: {
            x: cam.x + val,
            y: cam.y + val,
            z: cam.z + val
          },
          rotation: {
            _x: camera.rotation.x,
            _y: camera.rotation.y,
            _z: camera.rotation.z
          }
        }
        MoveCamera(upgCam, false)
     }
    }
  }
  */