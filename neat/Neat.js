const STRENGTHS = {WEIGHT_SHIFT: 0.3, WEIGHT_RANDOM: 1}
const PROBS = {MUTATE_CONNECTION: 0.4, MUTATE_NODE:  0.4, MUTATE_WEIGHT_SHIFT: 0.4, MUTATE_RANDOM_SHIFT: 0.4, MUTATE_TOGGLE_LINK: 0.4};
class Neat{
    constructor(population){
        debugger
        this.population = population;
        this.evaluator = new Evaluator(this.population);
    }

    generate_new_population(){
        var new_genomes = evaluator.evaluate();
        this.population.genomes = new_genomes;
    }
}
