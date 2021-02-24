class Population{
    constructor(input_nodes, output_nodes, population_size){
        this.no_input_nodes = input_nodes;
        this.no_output_nodes = output_nodes;
        this.population_size = population_size;
        this.all_connections = [];
        this.all_nodes = [];
        this.initialze();
    }

    initialze(){
        this.genomes = [];
        for(var i = 0; i < this.population_size; i++)
            this.genomes.push(new Genome(this));
    }

    get_connection_gene(node_from, node_to){
        this.all_connections.forEach((connection, i) => {
            if(connection.contains(node_from, node_to)) return connection.copy();
        });
        var new_connection = new ConnectionGene(node_from.copy(), node_to.copy(), 1, true, this.all_connections.length);
        this.all_connections.push(new_connection);
        return new_connection.copy();

    }
}
