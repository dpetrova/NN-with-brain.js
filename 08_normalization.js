/* NORMALIZING DATA */

// rawData = [{ open: number, high: number, low: number, close: number }]
const rawData = require("./08_rawRata.json");
/*
const rawData = [
    {
        "date":"2018-11-02",
        "open":141.0716,
        "high":141.1014,
        "low":138.7762,
        "close":139.7898,
        "volume":7673303,
        "unadjustedVolume":7673303,
        "change":-0.139114,
        "changePercent":-0.099,
        "vwap":139.5278,
        "label":"Nov 2",
        "changeOverTime":0
    },
    ...
]

Data have numbers very different from interval 0 - 1
It is a common practice in RNN to normalize these data (scale down)
And then again denormalized (scale up) eventually

A common approach for normalizing the data is to substract the lowest value from all other values and then to divide by the (highest value  - lowest value), e.g:
open: (step.open - lowest) / (highest - lowest)
*/

// normalize
function scaleDown(step, lowest, highest) {
  return {
    open: (step.open - lowest) / (highest - lowest),
    high: (step.high - lowest) / (highest - lowest),
    low: (step.low - lowest) / (highest - lowest),
    close: (step.close - lowest) / (highest - lowest),
  };
}

// denormalize
function scaleUp(step, lowest, highest) {
  return {
    open: step.open * (highest - lowest) + lowest,
    high: step.high * (highest - lowest) + lowest,
    low: step.low * (highest - lowest) + lowest,
    close: step.close * (highest - lowest) + lowest,
  };
}

// function getMinOpen() {
//   return rawData.reduce((min, b) => Math.min(min, b.open), rawData[0].open);
// }
// function getMaxOpen() {
//   return rawData.reduce((max, b) => Math.max(max, b.open), rawData[0].open);
// }

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

console.log(scaleDown(rawData[0], lowest, highest)); //{ open: 0.3412888888888877, high: 0.34460000000000135, low: 0.08624444444444318, close: 0.1988666666666682 }

console.log(scaleUp(scaleDown(rawData[0], lowest, highest), lowest, highest)); //{ open: 141.0716, high: 141.1014, low: 138.7762, close: 139.7898 }
