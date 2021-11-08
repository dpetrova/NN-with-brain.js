/* PREDICT BRIGHTNESS BASED ON RGB COLOR */

const brain = require("brain.js");

// input: { red, green, blue }
// ouput: { light, neutral, dark }

//we do not have to define all properties (we can but not needed); when it's missing, it means it is 0
const colors = [
  { /*red: 0,*/ green: 0.2, blue: 0.4 },
  { green: 0.4, blue: 0.6 },
  { red: 0.2, green: 0.8, blue: 0.8 },
  { green: 1, blue: 1 },
  { red: 0.8, green: 1, blue: 1 },
  { red: 1, green: 1, blue: 1 },
  { red: 1, green: 0.8, blue: 0.8 },
  { red: 1, green: 0.6, blue: 0.6 },
  { red: 1, green: 0.4, blue: 0.4 },
  { red: 1, green: 0.31, blue: 0.31 },
  { red: 0.8 },
  { red: 0.6, green: 0.2, blue: 0.2 },
];

//we do not have to define all properties (we can but not needed); when it's missing, it means it is 0
const brightnesses = [
  { /*light: 0, neutral: 0,*/ dark: 0.8 },
  { neutral: 0.8 },
  { light: 0.7 },
  { light: 0.8 },
  { light: 0.9 },
  { light: 1 },
  { light: 0.8 },
  { neutral: 0.7, light: 0.5 },
  { dark: 0.5, neutral: 0.5 },
  { dark: 0.6, neutral: 0.3 },
  { dark: 0.85 },
  { dark: 0.9 },
];

//turn these two arrays of objects into training data
/*
const trainingData = [
  { input: { green: 0.2, blue: 0.4 }, output: { dark: 0.8 } },
  { input: { green: 0.4, blue: 0.6 }, output: { neutral: 0.8 } },
  ...
]
*/
const trainingData = [];
for (let i = 0; i < colors.length; i++) {
  trainingData.push({
    input: colors[i],
    output: brightnesses[i],
  });
}

//define the neural net
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

//train the neural net
const stats = net.train(trainingData);
console.log(stats); //{ error: 0.004997163899974114, iterations: 1174 }

//see what will be the neural net output for a given input:
const sample = { red: 0.9 };
console.log(net.run(sample)); //{ dark: 0.9344120621681213, neutral: 0.029446842148900032, light: 0.0007854973082430661 }

//see what will be the neural net prediction for a given input:
const prediction = brain.likely(sample, net);
console.log(prediction); //dark

/* what can we do to invert the problem: asking neural net for color based on brightness */
// input: { light, neutral, dark }
// output: { red, green, blue }
const invertedTrainingData = [];
for (let i = 0; i < colors.length; i++) {
  invertedTrainingData.push({
    input: brightnesses[i],
    output: colors[i],
  });
}

const invertedNet = new brain.NeuralNetwork({ hiddenLayers: [3] });

const invertedStats = invertedNet.train(invertedTrainingData);
console.log(invertedStats); //{ error: 0.022529379633566934, iterations: 20000 }

const sample2 = { light: 0.9 };
console.log(invertedNet.run(sample2)); //{ green: 0.9706332087516785, blue: 0.9538623094558716, red: 0.8408012390136719 }
console.log(brain.likely(sample2, invertedNet)); //green
