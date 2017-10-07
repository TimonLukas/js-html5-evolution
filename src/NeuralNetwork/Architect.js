const {
  toBinaryString,
  fromBinaryString,
} = require('./../util');

const {
  Neuron,
  Layer,
  Perceptron,
} = require('./index');

const createPerceptronFromGeneStrand = (strand, binary = true) => {
  const strands = strand.split('|');

  const createLayerFromStrands = (geneStrands) => {
    const genes = geneStrands.split(';');

    const neurons = [];
    for (let i = 0; i < genes.length; i += 2) {
      const biasStrand = genes[i];
      const factorStrand = genes[i + 1];

      const decode = (string) => {
        if (string.substring(0, 1) === '1') {
          return `-${string.substring(1)}`;
        }

        return string;
      };

      const bias = fromBinaryString(decode(biasStrand));
      const factor = fromBinaryString(decode(factorStrand));

      const neuron = new Neuron(bias, factor);
      neurons.push(neuron);
    }

    return new Layer(neurons);
  };

  const input = strands[0];
  const hidden = strands.slice(1, strands.length - 1);
  const output = strands[strands.length - 1];

  return new Perceptron(
    createLayerFromStrands(input),
    hidden.map(layer => createLayerFromStrands(layer)),
    createLayerFromStrands(output),
    binary,
  );
};

const createRandomPerceptron = (binary, inputs) => {
  const generateRandomNumber = () => Math.floor((Math.random() * 128) - 64);

  const createRandomNeuron = (index) => {
    const bias = generateRandomNumber();
    const factor = generateRandomNumber();

    return new Neuron(bias, factor, index);
  };

  const createRandomLayer = (numberOfInputNeurons = Math.ceil(Math.random() * 16)) =>
    new Layer([...Array(numberOfInputNeurons)].map((value, index) => createRandomNeuron(index)));

  return new Perceptron(
    createRandomLayer(inputs),
    [...Array(Math.ceil(Math.random() * 4))].map(createRandomLayer),
    createRandomLayer(),
    binary,
  );
};

module.exports = {
  createPerceptronFromGeneStrand,
  createRandomPerceptron,
};
