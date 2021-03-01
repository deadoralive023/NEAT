const STRENGTHS = {WEIGHT_SHIFT: 3, WEIGHT_RANDOM: 2}
const PROBS = {MUTATE_CONNECTION: 0.1, MUTATE_NODE: 0.1, MUTATE_WEIGHT_SHIFT: 1, MUTATE_RANDOM_SHIFT: 0.8, MUTATE_TOGGLE_LINK: 0.25};
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

    evaluateFitness(network){
        var weightSum = 0.0;
        for(const [key, value] of Object.entries(network.connection_genes)){
            if(network.connection_genes[key].expressed){
                weightSum += Math.abs(network.connection_genes[key].weight);
            }
        }
        return (1000.0/(Math.abs(weightSum-100.0)));
    }
}
