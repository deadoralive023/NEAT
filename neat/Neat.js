const STRENGTHS = {WEIGHT_SHIFT: 0.3, WEIGHT_RANDOM: 1}
const PROBS = {MUTATE_CONNECTION: 0.4, MUTATE_NODE:  0.4, MUTATE_WEIGHT_SHIFT: 0.4, MUTATE_RANDOM_SHIFT: 0.4, MUTATE_TOGGLE_LINK: 0.4};
const RATIOS = {C1: 1, C2: 1, C3: 1};
class Neat extends Evaluator {
    constructor(population){
        super(population);
        this.population = population;
        this.generation = 0;
    }

    generate_new_population(){
        var new_genomes = this.evaluate(this.generation);
        this.population.genomes = new_genomes;
        this.generation++;
    }

    evaluateFitness(){
        return Math.floor(Math.random() * 20);
    }
}
