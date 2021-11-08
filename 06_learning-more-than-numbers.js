/* WHICH RESTAURANT TO GO ON THE WAY OF THE WEEK */
const brain = require("brain.js");

const restaurants = {
  "Brilliant Yellow Corral": "Monday",
  "Penny’s": "Tuesday",
  "Right Coast Wings": "Wednesday",
  "The Delusion Last Railway Car": "Thursday",
  "Fun Day Inn": "Friday",
  JHOP: "Saturday",
  Owls: "Sunday",
};

// input: { Monday, Tuesday, Wednesday, etc. }
// output: { Restaurant1, Restaurant2 }

/*
the principle of construct the training data:
- foreach the object of key-values
- input will be the current object's value (week day) set to 1 (all other days will be 0)
- output will be current object's key (restaurant) set to 1 (all other restaurants will be 0)
*/
const trainingData = [];
for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  trainingData.push({
    input: { [dayOfWeek]: 1 },
    output: { [restaurantName]: 1 },
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);
console.log(stats); //{ error: 0.004997117045019979, iterations: 1517 }

console.log(net.run({ Monday: 1 }));
/* the result is likelihood of all restaurants (the highest will be the correct prediction for the given day)
{
  'Brilliant Yellow Corral': 0.8784028887748718,
  'Penny’s': 0.0002063193533103913,
  'Right Coast Wings': 0.10538745671510696,
  'The Delusion Last Railway Car': 0.0037113993894308805,
  'Fun Day Inn': 0.00005857969881617464,
  JHOP: 0.04816845804452896,
  Owls: 0.03983113542199135
}
*/

function restaurantForDay(dayOfWeek) {
  const result = net.run({ [dayOfWeek]: 1 });
  //the highest likelihood will be the correct prediction for the given day
  let highestLikelihood = 0;
  let predictRestaurantName = "";
  for (let restuarantName in result) {
    let likelihood = result[restuarantName];
    if (likelihood > highestLikelihood) {
      highestLikelihood = likelihood;
      predictRestaurantName = restuarantName;
    }
  }

  return predictRestaurantName;
}

console.log(restaurantForDay("Monday")); //Brilliant Yellow Corral
console.log(restaurantForDay("Tuesday")); //Penny’s
console.log(restaurantForDay("Wednesday")); //Right Coast Wings
console.log(restaurantForDay("Thursday")); //The Delusion Last Railway Car
console.log(restaurantForDay("Friday")); //Fun Day Inn
console.log(restaurantForDay("Saturday")); //JHOP
console.log(restaurantForDay("Sunday")); //Owls

//the function above give the same as:
const prediction = brain.likely({ Monday: 1 }, net);
console.log(prediction); //Brilliant Yellow Corral
