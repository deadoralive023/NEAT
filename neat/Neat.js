const STRENGTHS = {WEIGHT_SHIFT: 0.3, WEIGHT_RANDOM: 1}
const PROBS = {MUTATE_CONNECTION: 0.4, MUTATE_NODE:  0.4, MUTATE_WEIGHT_SHIFT: 0.4, MUTATE_RANDOM_SHIFT: 0.4, MUTATE_TOGGLE_LINK: 0.4};
class Neat extends Evaluator {
    constructor(population){
        super(population);
        this.population = population;
        this.population
    }

    generate_new_population(){
        var new_genomes = evaluator.evaluate();
        this.population.genomes = new_genomes;
        this.generations++;
    }

    evaluateFitness(){
        return 2;
    }
}
