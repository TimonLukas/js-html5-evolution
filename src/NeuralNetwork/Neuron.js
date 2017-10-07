/* eslint no-param-reassign: 0 */

const { toBinaryString } = require('./../util');

module.exports = class Neuron {
  constructor(bias, factor, index = 0) {
    this.bias = bias;
    this.factor = factor;
    this.inputs = [];
    this.index = index;
  }

  getOutput(value) {
    if (this.inputs.length > 0) {
      return this.inputs.reduce((acc, neuron) => acc + neuron.getOutput(value), 0);
    }

    return this.bias + (this.factor * value[this.index]);
  }

  encode() {
    const encodeNumber = (number) => {
      if (number < 0) {
        return `1${toBinaryString(Math.abs(number))}`;
      }

      return `0${toBinaryString(number)}`;
    };

    return `${encodeNumber(this.bias)};${encodeNumber(this.factor)}`;
  }
};
