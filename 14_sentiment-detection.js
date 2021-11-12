/* DETECT SENTIMENT FROM TEXT */

const brain = require("brain.js");

const trainingData = [
  { input: "I am super happy!", output: "happy" },
  { input: "What a pill!", output: "sarcastic" },
  { input: "I am super unhappy!", output: "sad" },
  { input: "Are we there yet?", output: "excited" },
];

const net = new brain.recurrent.LSTM();
net.train(trainingData, {
  iterations: 100,
  errorThresh: 0.011,
  //log: (stats) => console.log(stats),
});

console.log(net.run("I am unhappy!")); //sad
