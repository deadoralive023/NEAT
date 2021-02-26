class Population{
    constructor(input_nodes, output_nodes, population_size){
        this.no_input_nodes = input_nodes;
        this.no_output_nodes = output_nodes;
        this.population_size = population_size;
        this.all_connections_genes = {};
        this.all_connections_genes_size = 0;
        this.all_nodes_genes = [];
        this.all_nodes_genes_size = 0;
        this.initialze();
    }

    initialze(){
        this.genomes = [];
        for(var i = 0; i < this.population_size; i++)
            this.genomes.push(new Genome(this));
    }


    get_connection_gene(node_from, node_to){
        for (var [key, value] of Object.entries(this.all_connections_genes))
            if(value.contains(node_from, node_to)) return value.copy();
        var new_connection = new ConnectionGene(node_from.copy(), node_to.copy(), Genome.getRandomNumberFloat(1), true, this.all_connections_genes_size++);
        this.all_connections_genes[new_connection.innovation_no] = new_connection;
        return new_connection.copy();
    }

    get_node_gene(type, position){
        var new_node =  new NodeGene(type, this.all_nodes_genes_size++, position);
        this.all_nodes_genes[new_node.id] = new_node;
        return new_node.copy();
    }

    reset(){
        this.all_connections_genes = {};
        this.all_connections_genes_size = 0;
        this.all_nodes_genes = [];
        this.all_nodes_genes_size = 0;
    }
}
