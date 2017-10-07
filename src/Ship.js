const settings = {
  background: '#ffffff',
  triangle: '#000000',
  width: 20,
  height: 10,
};

module.exports = class Ship {
  constructor(width, height, perceptrons) {
    this.angle = Math.random() * 360;
    this.x = (Math.random() * (width - settings.width)) + (settings.width / 2);
    this.y = (Math.random() * (height - settings.height)) + (settings.height / 2);
    this.delete = false;
    this.perceptrons = perceptrons;

    this.bounds = {
      width,
      height,
    };

    this.energy = 60 * 30;
    this.fitness = 0;
  }

  get boundingBox() {
    return {
      lowerLeft: {
        x: this.x - (settings.width / 2),
        y: this.y - (settings.height / 2),
      },
      upperRight: {
        x: this.x + (settings.width / 2),
        y: this.y + (settings.height / 2),
      },
    };
  }

  intersects(object) {
    return this.x > object.boundingBox.lowerLeft.x &&
      this.x < object.boundingBox.upperRight.x &&
      this.y > object.boundingBox.lowerLeft.y &&
      this.y < object.boundingBox.upperRight.y;
  }

  update(inputs) {
    this.angle += Math.max(Math.min(this.perceptrons.angle.activate(inputs), 2), -2);

    this.x += Math.cos((this.angle / 360) * Math.PI);
    this.y += Math.sin((this.angle / 360) * Math.PI);

    this.energy -= 1;

    if (this.x < 0 || this.x > this.bounds.width || this.y < 0 || this.y > this.bounds.height) {
      this.energy -= 40;
      this.angle += 180;
    }

    if (this.energy <= 0) {
      this.delete = true;
    }

    this.fitness += 1;
  }

  render(context) {
    const { width, height } = settings;

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle * (Math.PI / 180));

    context.fillStyle = settings.background; // eslint-disable-line
    context.fillRect(-width / 2, -height / 2, width, height);

    context.fillStyle = settings.triangle; // eslint-disable-line
    context.beginPath();
    context.moveTo(-width / 2, -height / 2);
    context.lineTo(width / 2, 0);
    context.lineTo(-width / 2, height / 2);
    context.fill();
    context.closePath();

    context.restore();

    context.font = '13px Arial';
    context.fillStyle = '#00ff00';
    context.fillText(this.energy, this.x, this.y);
  }
};
