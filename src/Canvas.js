/* global requestAnimationFrame */

const settings = {
  border: {
    color: '#ffffff',
    size: 5,
  },
};

module.exports = class Canvas {
  constructor(element) {
    this.canvas = element;
    this.context = element.getContext('2d');
    this.objects = [];
    this.ships = [];
  }

  updateSize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = settings.border.color;
    this.context.fillRect(0, 0, settings.border.size, this.canvas.height);
    this.context.fillRect(0, 0, this.canvas.width, settings.border.size);
    this.context.fillRect(this.canvas.width, 0, -settings.border.size, this.canvas.height);
    this.context.fillRect(0, this.canvas.height, this.canvas.width, -settings.border.size);

    this.objects = this.objects.map((object) => {
      object.render(this.context);
      if (!object.delete) {
        return object;
      }
      return null;
    }).filter(object => object !== null);

    this.ships = this.ships.map((object) => {
      object.render(this.context);
      if (!object.delete) {
        return object;
      }
      return null;
    }).filter(object => object !== null);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
};
