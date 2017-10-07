const Asteroid = require('./Asteroid');
const EnergyPellet = require('./EnergyPellet');

const createMap = (objects) => {
  return objects.filter(object => (object instanceof Asteroid || object instanceof EnergyPellet));
};

const boundingBoxCheck = (x, y, object) => {
  const { boundingBox } = object;
  if (
    x > boundingBox.lowerLeft.x &&
    x < boundingBox.upperRight.x &&
    y > boundingBox.lowerLeft.y &&
    y < boundingBox.upperRight.y
  ) {
    return object;
  }

  return null;
};

const traceRay = (origin, bounds, angle, map) => {
  const theta = (angle / 360) * Math.PI;
  let { x, y } = origin;
  let steps = 0;
  let hit = null;

  const check = object => boundingBoxCheck(x, y, object);

  while (x > 0 && x < bounds.width && y > 0 && y < bounds.height) {
    x += Math.cos(theta);
    y += Math.sin(theta);

    const results = map.map(check).filter(object => object !== null);
    if (results.length > 0) {
      hit = results[0];
      break;
    }

    steps += 1;
  }

  if (hit !== null) {
    if (hit instanceof Asteroid) {
      return [1, steps];
    }

    return [2, steps];
  }

  return [0, steps];
};

module.exports = {
  createMap,
  traceRay,
};
