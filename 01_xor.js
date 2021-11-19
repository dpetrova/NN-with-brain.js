/* XOR (EXCLUSIVE OR)*/

const brain = require("brain.js");

// input 0 0, output 0
// input 0 1, output 1
// input 1 0, output 1
// input 1 1, output 0

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
];

net.train(trainingData);

console.log("input 0 0 ->", net.run([0, 0])); // [ 0.05800250917673111 ]
console.log("input 0 1 ->", net.run([0, 1])); // [ 0.9358092546463013 ]
console.log("input 1 0 ->", net.run([1, 0])); // [ 0.932456910610199 ]
console.log("input 1 1 ->", net.run([0, 0])); // [ 0.05800250917673111 ]
