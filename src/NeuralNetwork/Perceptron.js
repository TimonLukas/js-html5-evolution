module.exports = class Perceptron {
  /**
   * Creates a new perceptron from given layers
   * @param {Layer} input
   * @param {Layer[]} hidden
   * @param {Layer} output
   * @param binary
   */
  constructor(input, hidden = [], output, binary = true) {
    this.input = input;
    this.hidden = hidden;
    this.output = output;
    this.binary = binary;

    hidden.map((layer) => { // eslint-disable-line
      layer.setInput(input);
      layer.setOutput(output);
    });
  }

  get layers() {
    return [this.input, ...this.hidden, this.output];
  }

  activate(value) {
    if (this.binary) {
      return this.output.neurons.reduce((acc, neuron) => acc + neuron.getOutput(value), 0) > 0;
    }

    return this.output.neurons.reduce((acc, neuron) => acc + neuron.getOutput(value), 0);
  }

  encode() {
    return this.layers.map(layer => layer.encode()).join('|');
  }
};
