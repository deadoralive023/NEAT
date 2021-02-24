class Genome{
    constructor(population){
        Genome.population = population;
        this.connectionGenes = [];
        this.initialze();
    }

    initialze(){
        this.nodeGenes = [];
        for(var i = 1; i < Genome.population.no_input_nodes + 1; i++)
            this.nodeGenes.push(new NodeGene(NODE_TYPES.INPUT, this.nodeGenes.length, {x:i*200, y:500}));
        for(var i = 1; i < Genome.population.no_output_nodes + 1; i++)
            this.nodeGenes.push(new NodeGene(NODE_TYPES.OUTPUT, this.nodeGenes.length, {x:i*200, y:50}));
    }

    mutate(){

    }

    mutate_connection(){
        for(var i = 0; i < 50; i++){
            var node1 = this.nodeGenes[Genome.getRandomNumber(0, this.nodeGenes.length - 1)];
            var node2 = this.nodeGenes[Genome.getRandomNumber(0, this.nodeGenes.length - 1)];
            if((node1.type != NODE_TYPES.HIDDEN && (node1.type - node2.type) != 0) && !(this.connection_genes_contains(node1, node2))){
                var isReversed = false;
                if((node1.type == NODE_TYPES.HIDDEN && node2.type == NODE_TYPES.INPUT) ||
                    (node1.type == NODE_TYPES.OUTPUT && node2.type == NODE_TYPES.HIDDEN) ||
                    (node1.type == NODE_TYPES.OUTPUT && node2.type == NODE_TYPES.HIDDEN) )
                        isReversed = true;
                return this.connectionGenes.push(Genome.population.get_connection_gene(isReversed?node2:node1, isReversed?node1:node2));
            }
        }
    }

    mmutate_node(){

    }

    mutate_random_weight(){

    }

    mutate_weighted_weight(){

    }

    connection_genes_contains(node_from, node_to){
        for(var i = 0; i < this.connectionGenes.length; i++)
            if(this.connectionGenes[i].contains(node_from, node_to)) return true;
        return false;
    }

    static getRandomNumber(min, max){
        return  Math.floor(Math.random() * (max - min + 1)) + min
    }
}
