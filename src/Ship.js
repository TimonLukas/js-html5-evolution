const settings = {
  background: '#ffffff',
  triangle: '#000000',
  width: 20,
  height: 10,
};

module.exports = class Ship {
  constructor(width, height) {
    this.angle = Math.random() * 360;
    this.x = (Math.random() * (width - settings.width)) + (settings.width / 2);
    this.y = (Math.random() * (height - settings.height)) + (settings.height / 2);
    this.delete = false;
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
  }
};
