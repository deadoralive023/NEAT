class Genome{
    constructor(inputs, outputs){
        Genome.inputs = inputs;
        Genome.outputs = outputs;
        this.nodeGenes = [];
        this.connectionGenes = [];
        this.initialze();
    }

    initialze(){
        console.log(NodeGene.TYPES);
        for(var i = 0; i < Genome.inputs; i++)
            this.nodeGenes.push(new NodeGene(NodeGene.TYPES, this.nodeGenes.size()));
        for(var i = 0; i < Genome.outputs; i++)
            this.nodeGenes.push(new NodeGene(NodeGene.TYPES, this.nodeGenes.size()));
    }
}
