var population;
var bird;
var game;
function setup() {
    var canvas = createCanvas(1500, 1000);
    canvas.parent("canvas-div");
    game = new FlappyBird();
    // var population = new Population(3, 1, 50);
    // var neat = new Neat(population);
    // for(var i = 0; i < 100; i++){
    //     neat.generate_new_population();
    // }

    // population.genomes[0].add_node_gene(new NodeGene(NODE_TYPES.HIDDEN, 4, {x:300, y:400}));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[0], population.genomes[0].node_genes[3], 1, true, 1));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[1], population.genomes[0].node_genes[3], 1, true, 2));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[2], population.genomes[0].node_genes[3], 1, true, 3));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[1], population.genomes[0].node_genes[4], 1, true, 4));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[4], population.genomes[0].node_genes[3], 1, true, 5));
    // population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[0], population.genomes[0].node_genes[4], 1, true, 8));
    // //population.genomes[0].add_connection_gene(new ConnectionGene(population.genomes[0].node_genes[2], population.genomes[0].node_genes[4], 1, true, 11));
    //
    // population.genomes[1].add_node_gene(new NodeGene(NODE_TYPES.HIDDEN, 4, {x:300, y:400}));
    // population.genomes[1].add_node_gene(new NodeGene(NODE_TYPES.HIDDEN, 5, {x:300, y:400}));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[0], population.genomes[1].node_genes[3], 1, true, 1));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[1], population.genomes[1].node_genes[3], 1, true, 2));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[2], population.genomes[1].node_genes[3], 1, true, 3));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[1], population.genomes[1].node_genes[4], 1, true, 4));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[4], population.genomes[1].node_genes[3], 1, true, 5));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[4], population.genomes[1].node_genes[5], 1, true, 6));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[5], population.genomes[1].node_genes[3], 1, true, 7));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[2], population.genomes[1].node_genes[4], 1, true, 9));
    // population.genomes[1].add_connection_gene(new ConnectionGene(population.genomes[1].node_genes[0], population.genomes[1].node_genes[5], 1, true, 10));

    //Evaluator.distance(population.genomes[1], population.genomes[0], 1, 1, 1);
    debugger
}

function draw() {
    background(220);
    game.show();
    //drawGenome(population.genomes[0]);
}

function keyPressed(){
    if(key == ' '){
        game.bird.up();
    }
}
