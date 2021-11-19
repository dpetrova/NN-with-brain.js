/* REINFORCEMENT LEARNING */
//it is a really exiting tier of machine learning

const brain = require("brain.js");

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

//XOR with uncomplete data
const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  // { input: [1, 0], output: [1] },
  // { input: [1, 1], output: [0] }
];

//initially train NN with uncompleted data
net.train(trainingData);

console.log("before reinforcement");
console.log(Array.from(net.run([0, 0]))); // [ 0.06938987970352173 ]
console.log(Array.from(net.run([1, 0]))); // [ 0.07381798326969147 ]

//adjust training data with new items
trainingData.push({ input: [1, 0], output: [1] });
//train again
net.train(trainingData);

console.log("after reinforcement");
console.log(Array.from(net.run([0, 0]))); // [ 0.08820965886116028 ]
console.log(Array.from(net.run([1, 0]))); // [ 0.9210355281829834 ]
