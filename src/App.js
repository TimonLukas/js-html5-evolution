/* global requestAnimationFrame document window */

const Canvas = require('./Canvas');
const Asteroid = require('./Asteroid');
const EnergyPellet = require('./EnergyPellet');
const Ship = require('./Ship');

const Architect = require('./NeuralNetwork/Architect');

window.addEventListener('load', () => {
  const canvas = new Canvas(document.querySelector('#canvas'));

  window.addEventListener('resize', canvas.updateSize);
  canvas.updateSize();

  //[...Array(5)].map(() => canvas.objects.push(new Asteroid(canvas.width, canvas.height)));
  //[...Array(10)].map(() => canvas.objects.push(new EnergyPellet(canvas.width, canvas.height)));
  canvas.objects.push(new Ship(canvas.width, canvas.height));

  const render = () => {
    canvas.render();
    if (Math.random() < 0.015) {
      //canvas.objects.push(new EnergyPellet(canvas.width, canvas.height));
    }
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
});
