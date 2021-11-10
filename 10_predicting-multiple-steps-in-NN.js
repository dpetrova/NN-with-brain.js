/* PREDICT NEXT STEPS IN STOCK PRICE PREDICTOR */
const brain = require("brain.js");

const rawData = require("./08_rawRata.json");

const fields = ["open", "high", "low", "close"];

//get lowest value
function getLowest() {
  let globalMin = Number.POSITIVE_INFINITY;
  //iterate through the array of objects
  for (const item of rawData) {
    //iterate through the object's properties
    for (const key in item) {
      if (!fields.includes(key)) continue;
      let value = item[key];
      if (value < globalMin) {
        globalMin = value;
      }
    }
  }

  return Math.floor(globalMin);
}

//get highest value
function getHighest() {
  let globalMax = Number.NEGATIVE_INFINITY;
  //iterate through the array of objects
  for (const item of rawData) {
    //iterate through the object's properties
    for (const key in item) {
      if (!fields.includes(key)) continue;
      let value = item[key];
      if (value > globalMax) {
        globalMax = value;
      }
    }
  }

  return Math.floor(globalMax);
}

const lowest = getLowest(); //138
const highest = getHighest(); //147

// normalize
function scaleDown(step) {
  return {
    open: (step.open - lowest) / (highest - lowest),
    high: (step.high - lowest) / (highest - lowest),
    low: (step.low - lowest) / (highest - lowest),
    close: (step.close - lowest) / (highest - lowest),
  };
}

// denormalize
function scaleUp(step) {
  return {
    open: step.open * (highest - lowest) + lowest,
    high: step.high * (highest - lowest) + lowest,
    low: step.low * (highest - lowest) + lowest,
    close: step.close * (highest - lowest) + lowest,
  };
}

//normalize data
const scaledData = rawData.map(scaleDown);

//an important concept is: feeding NN with smaller chunks of a long pattern:
//rather than feeding one long array, its better to slice it into chunks and feedeing NN with smaller patterns
//so our training data will be array of arrays (chunks of 5)
const trainingData = [
  scaledData.slice(0, 5),
  scaledData.slice(5, 10),
  scaledData.slice(10, 15),
  scaledData.slice(15, 20),
];

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 4, //we have 4 properties (open, high, low, close)
  hiddenLayers: [8, 8],
  outputSize: 4,
});

/*
training options:
net.train(data, {
  // Defaults values --> expected validation
  iterations: 20000, // the maximum times to iterate the training data --> number greater than 0
  errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
  log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
  logPeriod: 10, // iterations between logging out --> number greater than 0
  learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
  momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
  callback: null, // a periodic call back that can be triggered while training --> null or function
  callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
  timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
});

The network will stop training whenever one of the two criteria is met: 
- the training error has gone below the threshold (default 0.005), 
- or the max number of iterations (default 20000) has been reached

By default training will not let you know how it's doing until the end, but set log to true to get periodic updates on the current training error of the network. 
The training error should decrease every time. The updates will be printed to console. 
If you set log to a function, this function will be called with the updates instead of printing to the console. 
However, if you want to use the values of the updates in your own output, the callback can be set to a function to do so instead.

The learning rate is a parameter that influences how quickly the network trains. It's a number from 0 to 1. 
If the learning rate is close to 0, it will take longer to train. 
If the learning rate is closer to 1, it will train faster, but training results may be constrained to a local minimum and perform badly on new data (Overfitting).
The default learning rate is 0.3.

The momentum is similar to learning rate, expecting a value from 0 to 1 as well, but it is multiplied against the next level's change value. 
The default value is 0.1
*/

//learn stock market data
net.train(trainingData, {
  learningRate: 0.005, //how quickly the network trains
  errorThresh: 0.02, //acceptable error percentage
});

//predict on existing step
//console.log(scaleUp(net.run(trainingData[0]))); //{ open: 143.5744, high: 144.856, low: 143.0861, close: 144.6380 }

//predict next 3 steps
console.log(
  net.forecast([trainingData[0][0], trainingData[0][1]], 3).map(scaleUp)
);
/*
[
  { open: 140.58799374103546, high: 141.95568510890007, low: 140.18212750554085, close: 141.61950239539146 },
  { open: 142.1588093340397, high: 143.90231895446777, low: 142.05823427438736, close: 143.9054587483406 },
  { open: 143.4227276444435, high: 144.8370988368988, low: 143.09201556444168, close: 144.36322116851807 }
]
*/
