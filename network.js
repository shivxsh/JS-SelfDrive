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

        
    }
}