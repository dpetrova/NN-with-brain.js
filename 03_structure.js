/* inputs & outputs */
//Neural nets are quite simple: they are function that recieve inputs as argument and produce ouputs
(inputs) => outputs;

/* random values */
/*
How networks initiates: they start with a bunch of random values
Initially you didn't know very much, over time though you begin to know more and more
Everething that efects the output is just random at first, over time we can shape these random data
Each neuron is literally Math.random()
*/
Math.random();

/* activation */
/*
In artificial neural networks, the activation function of a node defines the output of that node given an input or set of inputs.
A standard integrated circuit can be seen as a digital network of activation functions that can be "ON" (1) or "OFF" (0), depending on input.
This is similar to the linear perceptron in neural networks.
However, only nonlinear activation functions allow such networks to compute nontrivial problems using only a small number of nodes, and such activation functions are called nonlinearities
*/

//very popular and effective activation function used nowdays is called "relu":
//activation functions are measured in back propagation
function relu(value) {
  return value < 0 ? 0 : value;
}

/* bonus material 
https://en.wikipedia.org/wiki/Activation_function
https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L227
https://github.com/BrainJS/brain.js/blob/9595fe1d0069939ba271b25c1e7db785edd11936/src/neural-network.js#L527
*/
