const NODES_POSITIONS = {IX:200, IY:800, HX:0, HY:400, OX:200, OY:100};
class Genome{
    constructor(population){
        Genome.population = population;
        this.connection_genes = {};
        this.initialze();
    }

    initialze(){
        this.node_genes = {};
        for(var i = 1; i < Genome.population.no_input_nodes + 1; i++){
            var new_node = Genome.population.get_node_gene(NODE_TYPES.INPUT, {x:NODES_POSITIONS.IX * i, y:NODES_POSITIONS.IY})
            this.node_genes[new_node.id] = new_node;
        }
        for(var i = 1; i < Genome.population.no_output_nodes + 1; i++){
            var new_node = Genome.population.get_node_gene(NODE_TYPES.OUTPUT, {x:NODES_POSITIONS.OX * i, y:NODES_POSITIONS.OY});
            this.node_genes[new_node.id] = new_node
        }
    }

    mutate(){

    }

    mutate_connection(){
        for(var i = 0; i < 50; i++){
            var node1 = Genome.randomElement(this.node_genes);
            var node2 = Genome.randomElement(this.node_genes);
            if((node1.type != NODE_TYPES.HIDDEN && (node1.type - node2.type) != 0) && !(this.connection_genes_contains(node1, node2))){
                var isReversed = false;
                if((node1.type == NODE_TYPES.HIDDEN && node2.type == NODE_TYPES.INPUT) ||
                    (node1.type == NODE_TYPES.OUTPUT && node2.type == NODE_TYPES.HIDDEN) ||
                    (node1.type == NODE_TYPES.OUTPUT && node2.type == NODE_TYPES.INPUT) )
                        isReversed = true;
                var mutated_connection = Genome.population.get_connection_gene(isReversed?node2:node1, isReversed?node1:node2);
                debugger
                return this.connection_genes[mutated_connection.innovation_no] = mutated_connection;
            }
        }
    }

    mutate_node(){
        var connectionGene = Genome.randomElement(this.connection_genes)
        connectionGene.expressed = false;
        var mutated_node = Genome.population.get_node_gene(NODE_TYPES.HIDDEN, {x:NODES_POSITIONS.HX += 200, y:NODES_POSITIONS.HY});
        this.node_genes[mutated_node.id] = mutated_node;
        var new_connection1 = Genome.population.get_connection_gene(connectionGene.node_from, mutated_node);
        var new_connection2 = Genome.population.get_connection_gene(mutated_node, connectionGene.node_to);
        new_connection1.weight = 1;
        new_connection2.weight = connectionGene.weight;
        this.connection_genes[new_connection1.innovation_no] = new_connection1;
        this.connection_genes[new_connection2.innovation_no] = new_connection2;

    }

    mutate_random_weight(){
        Genome.randomElement(his.connection_genes).weight = getRandomNumberFloat(2);
    }

    mutate_weighted_weight(){

    }

    static crossover(genom1, genome2){

    }

    add_node_gene(node_gene){
        this.node_genes[node_gene.id] = node_gene.copy();
    }

    add_connection_gene(connection_gene){
        this.connection_genes[connection_gene.innovation_no] = connection_gene;
    }

    connection_genes_contains(node_from, node_to){
        for (const [key, value] of Object.entries(this.connection_genes))
            if(value.contains(node_from, node_to)) return true;
        return false;
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
}
