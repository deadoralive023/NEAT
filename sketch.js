var population;
function setup() {
    var canvas = createCanvas(1500, 1000);
    canvas.parent("canvas-div");
    population = new Population(3, 1, 10);
}

function draw() {
    background(220);
    drawGenome(population.genomes[0]);
}
