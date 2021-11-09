/* COUNTER */

/*
e.g 4
length:
oooooooo#ooo#oo#ooo#oo#####oooooo#oooooo#oooooooo

width * height = lenght
ooooooo
o#ooo#o
o#ooo#o
o#####o
ooooo#o
ooooo#o
ooooooo

time step:
ooooooo     ooooooo     ooooooo     ooooooo     ooooooo
ooo#ooo     o#####o     o#####o     o#ooo#o     o#####o
ooo#ooo     ooooo#o     ooooo#o     o#ooo#o     o#ooooo
ooo#ooo --- o#####o --- oo####o --- o#####o  =  o#####o
ooo#ooo     o#ooooo     ooooo#o     ooooo#o     ooooo#o
ooo#ooo     o#####o     o#####o     ooooo#o     o#####o
ooooooo     ooooooo     ooooooo     ooooooo     ooooooo
depth = time

context is sort of observer, it looks at each of these steps and can guess what comes next
oo##o#####o
#o##oo#oooo
####o#o##oo
##ooo###ooo context
#oo#o#oo#o#
#o#o####ooo
#o#o####ooo

the ability to taken these multiple frames is called Recurrent Neural Network
*/

const brain = require("brain.js");
// count to 5
// 1-5, 5-1

const trainingData = [
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
];

const net = new brain.recurrent.LSTMTimeStep(); //LSTM -> long short-term memory

//net.train(trainingData, { log: (status) => console.log(status) });
net.train(trainingData);

console.log(net.run([1, 2, 3, 4])); //4.994463920593262
console.log(net.run([5, 4, 3, 2])); //1.0027695894241333
