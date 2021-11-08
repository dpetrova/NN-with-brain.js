# What is a Neural Network

Neural Networks are incredibly useful computing structures that allow computers to process complex inputs and learn how to classify them.
The functionality of a neural network comes from its structure, which is based off the patterns found in the brain.

I->H->H->H->O
I->H->H->H->O
I->H->H->H->O

I - input layer neuron
H - hidden layers neuron
O - output layer neuron

The network is divided into Layers (input/hidden/output).
When a neural network is in use, it activates the layers from left to right, leading from input to output.

# Neurons

Each layer consist of neurons.
Each neuron’s job is to measure a specific variable, and the higher the layer the neuron is in, the more information that variable has.
This value is a number that fits in a specific range (like between 0 and 1), which is called the neuron’s activation.
Neurons also have a second value called a bias, which changes the default value of the neuron away from 0.5.

# Connections between neurons

Each neuron in a layer has a connection to every neuron in the next layer.
Each of these connections has a weight, which is a value that represents how the two neurons relate to each other.
A highly positive weight means that the first neuron makes the second more likely to activate, where a high negative weight means the first prevents the second from activating.
A weight of 0 means the first neuron has absolutely no effect on the second.

# Activation

When input data is fed into a neural network, it creates a set of activation values in the first layer.
Every connection in this layer then ‘fires off’ in sequence.
When a connection fires, it multiplies the activation of the left neuron by the weight of the connection, then adds that to a running total for the right neuron along with the bias.
At the end of this process, every neuron in the left layer has contributed to every neuron in the right layer.
Because the resulting number can be anywhere on the number line, and activations must be between 0 and 1, we need to use a function to convert the result into the appropriate range.
There are many functions that work for this purpose, such as sigmoid, relu...
Once an activation value has been generated for every neuron in the layer, the process repeats until the output layer is reached.

# Learning

There a lot of unknowns in the neural network, every neuron in the network has a bias, and every connection between neurons has a weight.
All these values can be tweaked and modified to produce neural networks that will have different behaviors.
Of course, most of these possible combinations will give us entirely useless answers.
How do we narrow down from the infinite possible combination to one of the few usable sets?

First, we need to define some way to tell how well any given configuration of the neural network is doing.
This is done by creating a cost function, which is usually the sum of the squares of the difference between the expected and actual answers.
When the cost function is high, the network is doing poorly.
But when the cost function is near 0, the network is doing very well.
Just knowing how well a network deals with a single sample isn’t very useful, so this is where large data sets come in.
The effectiveness of a set of weights and biases is determined by running hundreds if not thousands of samples through the neural net.

If we were to plot our cost function for every possible value of the parameters, then we would have a plot with some maxima and minima.
Because this is the cost function, the lowest points on the plot represent the most accurate sets of parameters.
We can therefore find the local minima of the function by using steepest descent.
Steepest decent involves finding the highest slope of the nearby section of plot, and then moving away from that rise.
This involves a lot of calculus and is incredibly slow.

# Learning Faster with Backpropagation

Backpropagation offers a much faster way to approximate steepest descent.
The key idea behind is essentially: feed a sample into the neural network, find where the answer deviates from the expected value, find the smallest tweaks you can do to get the expected answer.
This process works due to the wide branching structure of neural networks.
Because neurons are fed through so many different paths, and each path has different weight associated with it, it’s possible to find values that are order of magnitude more influential on the values you care about than others.
Following this process leads to a list of changes to make to existing weight and bias values.
Applying just these changes will lead to overtraining your data set, so you need to get a good average before making any changes.
You should shuffle your data set so that you get a random assortment of samples, generating lists of changes for each one.
After averaging a few hundred of these lists together, then you can enact changes to the network.
While each individual nudge resulting from this won’t be in the steepest descent, the average will eventually drag the cost function to a local minimum.

# Brain.js

Brain is a javascript library made for easy and high-level neural networking.
Brain handles almost all of the set up for you, allowing you to worry only about high level decisions:

- Scaling Function: sets the function for determining the activation value of neurons (sigmoid / relu / leaky-relu / tanh)
- Hidden Layers: number of additional layers between the Input and Output layers, and their size. There is almost no reason to use more than two layers for any project. Increasing the number of layers massively increases computation time.
- Iterations: number of times the network is run through the training data before it stops.
- Learning Rate: a global scalar for how much values can be tweaked (a multiplier for the backpropagation changes). Too low, and it will take a very long time to converge to the answer. Too high, and you may miss a local minimum.

The above parameters are passed into the NeuralNetwork class as an object.
The network can then be trained using the .train() method.
This requires prepared training data.
Sample data should be structured as an array of objects with input and output values.
The input and output values should be an array of numbers, these correspond to the activation values of the neurons in the first and last layers of the network, respectively.

And now the network has done its level best to train itself under your chosen settings and samples.
You can now use the .run() command to examine the output for a given sample.
And voila, your network will be able to make approximations based off of any given input.

# Recurrent Neural Networks

Humans don’t start their thinking from scratch every second.
As you read this essay, you understand each word based on your understanding of previous words.
You don’t throw everything away and start thinking from scratch again. Your thoughts have persistence.
Traditional neural networks can’t do this.
Recurrent neural networks address this issue, as are capable of learning order dependence in sequence prediction problems.
Recurrent neural networks are networks with loops in them, allowing information to persist.
LSTM networks are well-suited to classifying, processing and making predictions based on time series data.

# Long short-term memory (LSTM)

Long short-term memory (LSTM) are special kind of recurrent neural networks (RNN), capable of learning long-term dependencies.
Unlike standard feedforward neural networks, LSTM has feedback connections.
It can process not only single data points (such as images), but also entire sequences of data (such as speech or video).
For example, LSTM is applicable to tasks such as unsegmented, connected handwriting recognition, speech recognition and anomaly detection in network traffic or IDSs (intrusion detection systems).
