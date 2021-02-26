const STRENGTHS = {WEIGHT_SHIFT: 0.3, WEIGHT_RANDOM: 1}
const PROBS = {MUTATE_CONNECTION: 0.004, MUTATE_NODE:  0.004, MUTATE_WEIGHT_SHIFT: 0.72, MUTATE_RANDOM_SHIFT: 0.08, MUTATE_TOGGLE_LINK: 0.4};
const RATIOS = {C1: 1, C2: 1, C3: 0.4};
class Neat extends Evaluator {
    constructor(population){
        super(population);
        this.generation = 0;
    }

    generate_new_population(){
        this.evaluate(this.generation);
        this.generation++;
    }

    evaluateFitness(){
        return Math.floor(Math.random() * 2);
    }
}
