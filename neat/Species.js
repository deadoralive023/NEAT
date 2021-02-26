class Species{
    constructor(genome){
        this.comparator = genome;
        this.fitness_genomes = [];
        this.fitness_genomes.push(genome);
        this.adjusted_value = 0;
    }

    add_fitness_genome(genome){
        this.fitness_genomes.push(genome);
    }

    add_adjusted_value(adjusted_value){
        this.adjusted_value += adjusted_value;
    }
}

Species.FitnessGenome = class{
    constructor(genome){
        this.genome = genome;
        this.adjusted_fitness_value = 0;
    }

    add_adjusted_fitness_value(adjusted_fitness_value){
        this.adjusted_fitness_value = adjusted_fitness_value;
    }
}
