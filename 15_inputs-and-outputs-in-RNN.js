const brain = require("brain.js");

const trainingData = [{ input: "1", output: "2" }];

const net = new brain.recurrent.LSTM();

const inputMap = ["1", "NEW IDEA", "2"];
/* 
Each value in the input map corresponds to characters that we used in the training data
The input character '1' gets its own special neuron and own special map (lookup); the same as with the output character '2'
However input map is not complete, there is unseen character corresponds to the transition between the input and the output ('NEW IDEA')
Input map has 3 indexes (neurons)
During the activation:
{ input: '1', output: '2' }
[1,0,0] //input value is sent to the NN; first neuron is activated
[0,1,0] //transition to the 'NEW IDEA'; second neuron is activated
[0,0,1] //third neuron is activated

what training data look like, if we start with input of '2', and end with output of '1':
{ input: '2', output: '1' }
[0,0,1]
[0,1,0] 
[1,0,0]
*/
