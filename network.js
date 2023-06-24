class NeuralNetwork{
    constructor(neuronCounts){ //count of neurons
        this.levels = [];
        for(let i=0; i<neuronCounts.length; i++){
            this.levels.push(new level(
                neuronCounts[i], //input neurons
                neuronCounts[i+1] //output neurons
            ));
        }
    }

    static feedForward(givenInputs, network){
    //Calling levels to produce its output
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
    //Loop through the remaining levels to update the output with feedForward result from level i
        for(let i=1; i<network.levels.length; i++){
            outputs = Level.feedForward(
                outputs,network.levels[i]);
        }
        return outputs;
    }
}

class Level{
    constructor(inputCount, outputCount){
        //Just what u learnt in ML last sem. Input, output and bias
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for(let i=0; i<inputCount; i++){
            this.weights[i] = new Array(outputCount);
        }

        //Randomize the weights and biases initially.
        Level.#randomize(this);
    }

    static #randomize(level){
        for(let i=0; i<level.inputs.length; i++){
            for(let j=0; j<level.outputs.length; j++){
                level.weights[i][j] = Math.random()*2 - 1;
            }
        }

        for(let i=0; i<level.biases.length; i++){
            level.biases[i] = Math.random() * 2 -1;
        }
    }

    static feedForward(givenInputs, level){
        for(let i=0; i<level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }

        for(let i=0; i<level.outputs.length; i++){
            let sum = 0; //sum between value of inputs and weights
            for(let j=0; j<level.inputs.length; j++){
                sum += level.inputs[j] * level.weights[j][i]; //Normal NN finding of value of a node. weight * input
            }

            if(sum > level.biases[i]){
                level.outputs[i] = 1;  //output neuron is On
            }
            else{
                level.outputs[i] = 0; //output neuron is off
            }
        }

        return level.outputs;
    }
}

