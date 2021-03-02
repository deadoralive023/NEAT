class NeuralNetwork extends Genome{
    constructor(population){
        super(population);
        this.adjusted_fitness_value = 0;
    }

    add_adjusted_fitness_value(adjusted_fitness_value){
        this.adjusted_fitness_value = adjusted_fitness_value;
    }

    feed_forward(input){
        if(input.length != NeuralNetwork.population.no_input_nodes) throw new Error('Size of input must be equal to the size of input nodes');

        for(var i = 0; i < NeuralNetwork.population.no_input_nodes; i++)
            this.node_genes[i].output =  input[i];


        debugger
        for(var i = NeuralNetwork.population.no_input_nodes; i <NeuralNetwork.population.no_input_nodes + NeuralNetwork.population.no_output_nodes; i++){
            var output = this.cal_output(i);
        }


        //
        // var hidde_nodes =[];
        // for(const [key, value] of Object.entries(this.connection_genes)){
        //     if(value.node_from.type == NODE_TYPES.INPUT){
        //         this.node_genes[value.node_to.id].output += value.weight * this.node_genes[value.node_from.id].output;
        //         hidde_nodes.push(value.node_to.id);
        //     }
        // }
        //
        // hidde_nodes.forEach((node, i) => {
        //     this.node_genes[node].activate();
        // });


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

    cal_output(id){
        var found = false;
        if(this.node_genes[id].type == NODE_TYPES.INPUT){
            return this.node_genes[id].output;
        }
        for(const [key, value] of Object.entries(this.connection_genes)){
            if(value.node_from.type == this.node_genes[id].type){
                found = true;
                this.node_genes[id] .output += this.cal_output(value.node_from.id) * value.weight;
            }
        }
        this.node_genes[id].activate();
        return this.node_genes[id].output;
    }
}
