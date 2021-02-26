class FitnessGenome{
    constructor(genome){
        this.genome = genome;
        this.adjusted_fitness_value = 0;
    }

    add_adjusted_fitness_value(adjusted_fitness_value){
        this.adjusted_fitness_value = adjusted_fitness_value;
    }
}
