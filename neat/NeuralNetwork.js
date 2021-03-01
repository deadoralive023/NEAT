class NeuralNetwork extends Genome{
    constructor(population){
        super(population);
        this.adjusted_fitness_value = 0;
    }

    add_adjusted_fitness_value(adjusted_fitness_value){
        this.adjusted_fitness_value = adjusted_fitness_value;
    }

    feed_forward(input){
        if(input.length != NeuralNetwork.population.input_nodes) throw new Error('Size of input must be equal to the size of input nodes');

        for(var i = 0; i < NeuralNetwork.population.input_nodes; i++)
            this.connection_genes[i].node_to.output =  input[i];


        for(const [key, value] of Object.entries(this.connection_genes)){
            if(value.node_from.type == NODE_TYPES.INPUT){
                value.node_to.output += value.weight * node_from.output;
            }
        }
        //
        // for(const [key, value] of Object.entries(this.connection_genes)){
        //     if(hidde_nodes.contains(value.node_from)){
        //          value.weight
        //     }
        // }
        //
        // for(var i = 0; i < hidde_nodes.length; i++){
        //     this.connection_genes[hidde_nodes[i]].node_to.output +=  input[i] * this.connection_genes[i].weight;
        //     hidde_nodes.push(this.connection_genes[i].node_to);
        // }
    }
}
