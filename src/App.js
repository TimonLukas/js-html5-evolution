/* global requestAnimationFrame document window */

const Canvas = require('./Canvas');
const Asteroid = require('./Asteroid');
const EnergyPellet = require('./EnergyPellet');
const Ship = require('./Ship');

const Architect = require('./NeuralNetwork/Architect');
const rayTrace = require('./RayTracer');
const { mutate } = require('./util');

window.addEventListener('load', () => {
  const canvas = new Canvas(document.querySelector('#canvas'));

  window.addEventListener('resize', canvas.updateSize);
  canvas.updateSize();

  [...Array(5)].map(() => canvas.objects.push(new Asteroid(canvas.width, canvas.height)));
  [...Array(10)].map(() => canvas.objects.push(new EnergyPellet(canvas.width, canvas.height)));

  canvas.ships = [...Array(25)].map(() => { // eslint-disable-line
    return new Ship(canvas.width, canvas.height, {
      angle: Architect.createRandomPerceptron(false, 8),
      moving: Architect.createRandomPerceptron(true, 8),
    });
  });

  let map = rayTrace.createMap(canvas.objects);

  const traceRay = (change, ship) => rayTrace.traceRay({
    x: ship.x,
    y: ship.y,
  }, {
    width: canvas.width,
    height: canvas.height,
  }, ship.angle + change, map);

  let previousBestShip = null;

  let generation = 0;

  const render = () => {
    canvas.ships.forEach((ship) => {
      ship.update([
        ...traceRay(0, ship),
        ...traceRay(90, ship),
        ...traceRay(180, ship),
        ...traceRay(270, ship),
      ]);
    });

    map.forEach((object) => {
      canvas.ships.forEach((ship) => {
        if (ship.intersects(object)) {
          if (object instanceof Asteroid) {
            ship.energy -= 200;
            ship.angle += 180;
          }
          if (object instanceof EnergyPellet) {
            ship.energy += 500;
            object.delete = true;
          }
        }
      });
    });

    if (canvas.ships.length > 0) {
      previousBestShip = canvas.ships[0];
    } else {
      const oldPerceptron = previousBestShip.perceptrons.angle.encode();

      console.log(`Generation ${generation} stats`);
      console.log(`Best fitness: ${previousBestShip.fitness}`);
      console.log(`Best gene strand: ${oldPerceptron}`);

      const newPerceptronGenes = [...Array(20)].map(() => mutate(oldPerceptron));
      const newRandomPerceptrons = [...Array(5)].map(() => Architect.createRandomPerceptron(false, 8));

      const newPerceptrons = [...newRandomPerceptrons, ...newPerceptronGenes.map(genes => Architect.createPerceptronFromGeneStrand(genes, false))];
      canvas.ships = newPerceptrons.map(perceptron => new Ship(canvas.width, canvas.height, { angle: perceptron }));
      generation += 1;
    }

    canvas.render();
    if (Math.random() < 0.015) {
      canvas.objects.push(new EnergyPellet(canvas.width, canvas.height));
    }
    map = rayTrace.createMap(canvas.objects);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
});
