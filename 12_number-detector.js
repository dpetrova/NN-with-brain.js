/* NUMBER DETECTOR: LIKE READ NUMBERS FROM IMAGE */

const brain = require("brain.js");

// rawData = ' # ';

//character by character normalization function
function toNumber(character) {
  return character === "#" ? 1 : 0;
}

//normalize input data
function toArray(string) {
  if (string.length !== 7 * 7) throw new Error("string in wrong size");
  return string.split("").map(toNumber);
}

const zero = toArray(
  "#######" +
    "#     #" +
    "#     #" +
    "#     #" +
    "#     #" +
    "#     #" +
    "#######"
);
const one = toArray(
  "   #   " +
    "   #   " +
    "   #   " +
    "   #   " +
    "   #   " +
    "   #   " +
    "   #   "
);
const two = toArray(
  "#######" +
    "#     #" +
    "      #" +
    "     # " +
    "   #   " +
    " #     " +
    "#######"
);
const three = toArray(
  "#######" +
    "      #" +
    "      #" +
    " ######" +
    "      #" +
    "      #" +
    "#######"
);
const four = toArray(
  "#     #" +
    "#     #" +
    "#     #" +
    "#######" +
    "      #" +
    "      #" +
    "      #"
);
const five = toArray(
  "#######" +
    "#      " +
    "#      " +
    "#######" +
    "      #" +
    "      #" +
    "#######"
);
const six = toArray(
  "      #" +
    "    #  " +
    "  #    " +
    " ######" +
    "#     #" +
    "#     #" +
    "#######"
);
const seven = toArray(
  "#######" +
    "     # " +
    "    #  " +
    "   #   " +
    "  #    " +
    " #     " +
    "#      "
);
const eight = toArray(
  "#######" +
    "#     #" +
    "#     #" +
    "#######" +
    "#     #" +
    "#     #" +
    "#######"
);
const nine = toArray(
  "#######" +
    "#     #" +
    "#     #" +
    "###### " +
    "    #  " +
    "   #   " +
    " #     "
);

//console.log(nine);

const net = new brain.NeuralNetwork();
const trainingData = [
  { input: zero, output: { zero: 1 } },
  { input: one, output: { one: 1 } },
  { input: two, output: { two: 1 } },
  { input: three, output: { three: 1 } },
  { input: four, output: { four: 1 } },
  { input: five, output: { five: 1 } },
  { input: six, output: { six: 1 } },
  { input: seven, output: { seven: 1 } },
  { input: eight, output: { eight: 1 } },
  { input: nine, output: { nine: 1 } },
];

net.train(trainingData, { log: (stats) => console.log(stats) });

const result = net.run(
  toArray(
    "#######" +
      "#     #" +
      "#     #" +
      "#######" +
      "#     #" +
      "#     #" +
      "#######"
  )
);

console.log(result);
/*
{
  zero: 0.1269567310810089,
  one: 0.0049610137939453125,
  two: 0.007728748954832554,
  three: 0.07149811834096909,
  four: 0.049347031861543655,
  five: 0.1025153324007988,
  six: 0.04124889150261879,
  seven: 0.0037679942324757576,
  eight: 0.7316505312919617, //one that is most likely has the highest value
  nine: 0.03147612139582634
}
*/

const prediction = brain.likely(
  toArray(
    "#######" +
      "#     #" +
      "#     #" +
      "#######" +
      "#     #" +
      "#     #" +
      "#######"
  ),
  net
);

console.log(prediction); // eight

//if we remove some characters, it is still recognized as eight:
const prediction2 = brain.likely(
  toArray(
    "#######" +
      "#     #" +
      "#     #" +
      "###  ##" +
      "#     #" +
      "#     #" +
      "######"
  ),
  net
);

console.log(prediction2); // eight
