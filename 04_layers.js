/* XOR */

/*
I->H->H->H->O
I->H->H->H->O
(the network above consist of input layer with 2 neurons, 3 hidden layers each with 2 neurons, and outpul layer with 2 neurons)

I - input layer neuron
H - hidden layers neuron
O - output layer neuron

The configuration of number of hidden layers and neurons depends on the inputs and the problem that has to be resolved
The hidden layers run the activation functions and transforms the input to a value that the output layer can use

Each arrow between nodes represents a bit of math, described as:
activate((inputWeights * inputs) + biases)
*/

const brain = require("brain.js");

//The Neural networks can be widely configured to solve many different problems
//all it takes is experiment, time and entusiasm

const net = new brain.NeuralNetwork({
  activation: "sigmoid", // activation function (sigmoid (default) / relu / leaky-relu / tanh)
  hiddenLayers: [3, 4], // specify the number of hidden layers in the network and the size of each layer
  iterations: 20000, // number of runs before the neural net stops training
  learningRate: 0.6, // a global multiplier for the backpropagation changes (useful when training using streams)
});

//here are configured 1 hidden layer with 1 neuron:
const net1 = new brain.NeuralNetwork({ hiddenLayers: [1] });
//here are configured 1 hidden layer with 3 neurons:
const net2 = new brain.NeuralNetwork({ hiddenLayers: [3] });
//here are configured 2 hidden layers - the first with 3 nodes and the second with 4 nodes:
const net3 = new brain.NeuralNetwork({ hiddenLayers: [3, 4] });

const trainingData = [
  //here are configured input layer with 2 neurons and output layer with 1 neuron:
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

//here is illustrated the majority of the storage of layers:
//rule: the more hidden layers we have, the longer it takes for the network to train
net1.train(trainingData, {
  log: (error) => console.log(error), //error:0.1693, iterations: 20000
});

net2.train(trainingData, {
  log: (error) => console.log(error), //error:0.0050, iterations: 4950
});

net3.train(trainingData, {
  log: (error) => console.log(error), //error:0.0050, iterations: 15250
});

/* bonus
https://github.com/BrainJS/brain.js#options
https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L233
*/
