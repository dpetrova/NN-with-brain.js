/* RECOMENDATION ENGINE */

const brain = require("brain.js");

// color preference
const trainingData = [
  { input: { blue: 1 }, output: [1] },
  { input: { red: 1 }, output: [1] },
  { input: { black: 1 }, output: [0] },
  { input: { green: 1 }, output: [0] },
  { input: { brown: 1 }, output: [0] },
];

const net = new brain.NeuralNetwork();

net.train(trainingData);

console.log("before preference change");
console.log(Array.from(net.run({ blue: 1 }))); // [ 0.9174144864082336 ]
console.log(Array.from(net.run({ brown: 1 }))); // [ 0.061583228409290314 ]

//change preferences
let brown = trainingData.find((x) => x.input.brown);
brown.output = [1];

net.train(trainingData);

console.log("after preference change");
console.log(Array.from(net.run({ blue: 1 }))); // [ 0.9899349808692932 ]
console.log(Array.from(net.run({ brown: 1 }))); // [ 0.9013745188713074 ]
