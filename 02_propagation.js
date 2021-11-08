/* XOR */

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

/*
Forward Propagation is the way to move from the Input layer (left) to the Output layer (right) in the neural network.
The process of moving from the right to left i.e backward from the Output to the Input layer is called the Backward Propagation

for example throw a ball to the goal
1 step: forward propagation -> predict (how far we can throw the ball)
2.1 step: back propagation -> measure (we can measure how far from the actual goal is the prediction)
2.2 step: back propagation -> learn
repeat...
*/

//in train (training stage) we will do forward and backward propagation
net.train(trainingData, {
  log: (error) => console.log(error),
  logPeroid: 100,
});

//we can see that during the training stage errors starting to drop to ridiculous low number
// { error: 0.2587381577953929, iterations: 10 }
// ...
// { error: 0.2567167277899305, iterations: 1000 }
// ...
// { error: 0.25271290072617525, iterations: 2000 }
// ...
// { error: 0.14114560865701226, iterations: 3000 }
// ...
// { error: 0.007650055809010486, iterations: 4000 }
// ...
// { error: 0.005006734707740327, iterations: 4350 }

//run (running stage)
console.log("input 0 0 ->", net.run([0, 0])); //0.0521
console.log("input 0 1 ->", net.run([0, 1])); //0.9336
console.log("input 1 0 ->", net.run([1, 0])); //0.9334
console.log("input 1 1 ->", net.run([0, 0])); //0.0521
