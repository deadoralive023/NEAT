const NODE_SIZE = 55;
function drawGenome(genome){
    genome.nodeGenes.forEach((nodeGene, i) => {
        drawNodeGene(nodeGene);
    });
    genome.connectionGenes.forEach((connectionGene, i) => {
        drawConnectionGene(connectionGene);
    });

}

function drawNodeGene(nodeGene){
    ellipse(nodeGene.position.x,nodeGene.position.y , NODE_SIZE, NODE_SIZE);
}

function drawConnectionGene(connectionGene){
    var x1 = connectionGene.node_from.position.x;
    var y1 = connectionGene.node_from.position.y;
    var x2 = connectionGene.node_to.position.x;
    var y2 = connectionGene.node_to.position.y;
    if(connectionGene.node_from.position.y < connectionGene.node_to.position.y){
        var temp = x1;
        x1 = x2;
        x2 = temp;
        temp = y1;
        y1 = y2;
        y2 = temp;
    }
    drawArrow(
        createVector(x1, y1),
        createVector(x2, y2), 'black');
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(1);
  fill(myColor);
  line(base.x,base.y - (NODE_SIZE/2), vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
