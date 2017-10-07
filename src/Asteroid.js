/* global document */

const sprite = document.querySelectorAll('.asteroid');

const settings = {
  border: {
    color: '#ff0000',
    size: 3,
  },
  rotateSpeed: {
    min: 0.1,
    max: 0.5,
  },
};

module.exports = class Asteroid {
  constructor(width, height) {
    this.sprite = sprite[Math.floor(Math.random() * sprite.length)];
    this.angle = Math.random() * 360;
    const bound = settings.rotateSpeed.max - settings.rotateSpeed.min;
    this.rotateSpeed = (Math.random() * bound) + settings.rotateSpeed.min;
    this.x = (Math.random() * (width - (this.sprite.width))) + (this.sprite.width / 2);
    this.y = (Math.random() * (height - (this.sprite.height))) + (this.sprite.height / 2);
    this.delete = false;

    this.boundingBox = {
      lowerLeft: {
        x: this.x - (this.sprite.width / 2),
        y: this.y - (this.sprite.height / 2),
      },
      upperRight: {
        x: this.x + (this.sprite.width / 2),
        y: this.y + (this.sprite.height / 2),
      },
    };
  }

  render(context) {
    const { width, height } = this.sprite;

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle * (Math.PI / 180));
    context.drawImage(this.sprite, -width / 2, -height / 2);
    context.restore();

    context.fillStyle = settings.border.color; // eslint-disable-line
    context.fillRect(
      this.boundingBox.lowerLeft.x,
      this.boundingBox.lowerLeft.y,
      width,
      settings.border.size,
    );

    context.fillRect(
      this.boundingBox.lowerLeft.x,
      this.boundingBox.lowerLeft.y,
      settings.border.size,
      height,
    );

    context.fillRect(
      this.boundingBox.upperRight.x,
      this.boundingBox.upperRight.y,
      -width,
      -settings.border.size,
    );

    context.fillRect(
      this.boundingBox.upperRight.x,
      this.boundingBox.upperRight.y,
      -settings.border.size,
      -height,
    );

    this.angle += this.rotateSpeed % 360;
  }
};
