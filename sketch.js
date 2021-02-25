var population;

function setup() {
    var canvas = createCanvas(1500, 1000);
    canvas.parent("canvas-div");
    population = new Population(3, 1, 1);
    // population.genomes[0].add_node_gene(new NodeGene(NODE_TYPES.HIDDEN, 4, {x:300, y:400}));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[0], population.genomes[0].node_genes[3], 1, true, 1));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[2], population.genomes[0].node_genes[3], 1, true, 2));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[0], population.genomes[0].node_genes[4], 1, true, 3));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[1], population.genomes[0].node_genes[4], 1, true, 4));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[4], population.genomes[0].node_genes[3], 1, true, 5));
    // console.log(population);
}

function draw() {
    background(220);
    drawGenome(population.genomes[0]);
}
