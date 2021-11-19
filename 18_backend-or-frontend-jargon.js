/* DECIDE WHETHER THE SENTENCE IS A FRONTEND OR BACKEND JARGON */

// bring in the brain.js dependency
const brain = require("brain.js");

// import the data file
const data = require("./18_data.json");

// create the neural network
const network = new brain.recurrent.LSTM();

// convert data into an array of values with input and output pairs
const trainingData = [];
for (const item of data) {
  trainingData.push({
    input: item.text,
    output: item.category,
  });
}

// training the model and setting the number of iteration to make during the training
network.train(trainingData, {
  iterations: 2000,
});

// supply the input to classify
const output = network.run(
  "the api did not work maybe the authentication integration is not well done"
);

// printing the output on the console
console.log(`Category: ${output}`);
