const NODES_POSITIONS = {IX:200, IY:800, HX:0, HY:400, OX:200, OY:100};
class Genome{
    constructor(population){
        Genome.population = population;
        this.connection_genes = {};
        this.fitness = 0;
        this.initialze();
    }

    initialze(){
        this.node_genes = {};
        for(var i = 0; i < Genome.population.no_input_nodes; i++){
            var new_node = Genome.population.get_node_gene(NODE_TYPES.INPUT, i)
            this.node_genes[new_node.id] = new_node;
        }
        for(var i = Genome.population.no_input_nodes; i < Genome.population.no_input_nodes + Genome.population.no_output_nodes; i++){
            var new_node = Genome.population.get_node_gene(NODE_TYPES.OUTPUT, i);
            this.node_genes[new_node.id] = new_node
        }
        var new_connection = Genome.population.get_connection_gene(
            this.node_genes[0], this.node_genes[Genome.population.no_input_nodes]);
        this.connection_genes[new_connection.innovation_no] = new_connection;
    }

    mutate(){
        if(PROBS.MUTATE_CONNECTION > Math.random()) this.mutate_connection();
        if(PROBS.MUTATE_NODE > Math.random()) this.mutate_node();
        if(PROBS.MUTATE_WEIGHT_SHIFT > Math.random()) this.mutate_weight_shift();
        if(PROBS.MUTATE_RANDOM_SHIFT > Math.random()) this.mutate_weight_random();
        if(PROBS.MUTATE_TOGGLE_LINK > Math.random()) this.mutate_toggle_link();
    }

    mutate_connection(){
        for(var i = 0; i < 50; i++){
            var node1 = NeuralNetwork.randomElement(this.node_genes);
            var node2 = NeuralNetwork.randomElement(this.node_genes);
            if((node1.type - node2.type != 0) && !(this.connection_genes_contains(node1, node2))){
                var isReversed = false;
                if((node1.type == NODE_TYPES.HIDDEN && node2.type == NODE_TYPES.INPUT) ||
                    (node1.type == NODE_TYPES.OUTPUT && node2.type == NODE_TYPES.HIDDEN) ||
                    (node1.type == NODE_TYPES.OUTPUT && node2.type == NODE_TYPES.INPUT) )
                        isReversed = true;
                var mutated_connection = NeuralNetwork.population.get_connection_gene(isReversed?node2:node1, isReversed?node1:node2);
                return this.connection_genes[mutated_connection.innovation_no] = mutated_connection;
            }
        }
    }

    mutate_node(){
        if(NeuralNetwork.obj_size(this.connection_genes) > 0){
            var connectionGene = NeuralNetwork.randomElement(this.connection_genes)
            connectionGene.expressed = false;
            var mutated_node = NeuralNetwork.population.get_node_gene(NODE_TYPES.HIDDEN);
            this.node_genes[mutated_node.id] = mutated_node;
            var new_connection1 = NeuralNetwork.population.get_connection_gene(connectionGene.node_from, mutated_node);
            var new_connection2 = NeuralNetwork.population.get_connection_gene(mutated_node, connectionGene.node_to);
            new_connection1.weight = 1;
            new_connection2.weight = connectionGene.weight;
            this.connection_genes[new_connection1.innovation_no] = new_connection1;
            this.connection_genes[new_connection2.innovation_no] = new_connection2;
        }

    }

    mutate_weight_random(){
        if(NeuralNetwork.obj_size(this.connection_genes.length) > 0){
            NeuralNetwork.randomElement(this.connection_genes).weight = getRandomNumberFloat(2) * STRENGTHS.WEIGHT_RANDOM;
        }
    }

    mutate_weight_shift(){
        if(NeuralNetwork.obj_size(this.connection_genes.length) > 0){
            NeuralNetwork.randomElement(this.connection_genes).weight += getRandomNumberFloat(2) * STRENGTHS.WEIGHT_SHIFT;
        }
    }

    mutate_toggle_link(){
        if(NeuralNetwork.obj_size(this.connection_genes.length) > 0){
            var network = NeuralNetwork.randomElement(this.connection_genes);
            network.expressed = !network.expressed;
        }
    }

    static crossover(network1, network2){
        if(network1.adjusted_fitness_value < network2.adjusted_fitness_value){
            var temp = network1;
            network1 = network2;
            network2 = network1;
        }
        var child = new NeuralNetwork(NeuralNetwork.population);
        for (var [key, value] of Object.entries(network1.node_genes))
            child.add_node_gene(value);
        for (var [key, value] of Object.entries(network1.connection_genes)){
            if(key in network2.connection_genes){
                child.add_connection_gene(Math.random() < 0.5 ? value : network2.connection_genes[key]);
            }
            else{
                child.add_connection_gene(value);
            }
        }
        return child;
    }

    add_node_gene(node_gene){
        this.node_genes[node_gene.id] = node_gene.copy();
    }

    add_connection_gene(connection_gene){
        this.connection_genes[connection_gene.innovation_no] = connection_gene.copy();
    }

    connection_genes_contains(node_from, node_to){
        for (const [key, value] of Object.entries(this.connection_genes))
            if(value.contains(node_from, node_to)) return true;
        return false;
    }

    max_innovation_no(){
        return Math.max.apply(null,Object.keys(this.connection_genes));
    }

    static randomElement(obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    }

    static getRandomNumberInt(min, max){
        return  Math.floor(Math.random() * (max - min + 1)) + min
    }
    static getRandomNumberFloat(range){
        return Math.random() < 0.5 ? Math.random() * -range : Math.random() * range;
    }

    static obj_size(obj) {
      var size = 0;
      for (var key in obj)
        if (obj.hasOwnProperty(key)) size++;
      return size;
    }


}
