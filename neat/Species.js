class Species{
    constructor(genome){
        this.comparator = genome;
        this.genomes = [];
        this.adjusted_score = 0;
    }

    add_genome(genome){
        this.genomes.push(genome.copy());
    }

    add_adjusted_score(adjusted_score){
        this.adjusted_score += adjusted_score;
    }
}
